#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 BRG Locations Docker Setup${NC}"
echo "=================================="

# Load environment variables
load_env() {
    if [ -f .env ]; then
        echo -e "${GREEN}✅ Loading environment variables from .env${NC}"
        export $(grep -v '^#' .env | xargs)
    else
        echo -e "${RED}❌ .env file not found!${NC}"
        echo -e "${YELLOW}💡 Please create .env with required variables${NC}"
        echo "Required variables: MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, ADMIN_EMAIL, ADMIN_PASSWORD"
        exit 1
    fi
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Docker is running${NC}"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose is not installed.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Docker Compose is available${NC}"
}

# Function to build services
build_services() {
    echo -e "\n${BLUE}🔨 Building Docker services...${NC}"
    docker-compose --env-file .env build --no-cache
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build completed successfully${NC}"
    else
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
}

# Function to start services
start_services() {
    echo -e "\n${BLUE}🚀 Starting Docker services...${NC}"
    docker-compose --env-file .env up -d
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Services started successfully${NC}"
    else
        echo -e "${RED}❌ Failed to start services${NC}"
        exit 1
    fi
}

# Function to wait for database to be ready
wait_for_database() {
    echo -e "\n${YELLOW}⏳ Waiting for database to be ready...${NC}"
    
    # Wait up to 60 seconds for database
    for i in {1..60}; do
        if docker-compose exec -T db mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD} &> /dev/null; then
            echo -e "${GREEN}✅ Database is ready${NC}"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    
    echo -e "\n${RED}❌ Database failed to start within 60 seconds${NC}"
    echo -e "${YELLOW}💡 Try running: docker-compose logs db${NC}"
    exit 1
}

# Function to run Laravel migrations
run_migrations() {
    echo -e "\n${BLUE}🗄️ Running database migrations...${NC}"
    docker-compose exec -T api php artisan migrate --force
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Migrations completed${NC}"
    else
        echo -e "${RED}❌ Migrations failed${NC}"
        echo -e "${YELLOW}💡 Check logs: docker-compose logs api${NC}"
        exit 1
    fi
}

# Function to seed admin user
seed_admin_user() {
    echo -e "\n${BLUE}👤 Creating admin user...${NC}"
    docker-compose exec -T api php artisan db:seed --class=AdminUserSeeder --force
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Admin user created${NC}"
        echo -e "${YELLOW}📧 Email: ${ADMIN_EMAIL}${NC}"
        echo -e "${YELLOW}🔑 Password: [Set in .env]${NC}"
    else
        echo -e "${YELLOW}⚠️ Admin user may already exist or seeder failed${NC}"
        echo -e "${YELLOW}💡 You can create manually using: docker-compose exec api php artisan tinker${NC}"
    fi
}

# In the seed_admin_user() function, add:
seed_location_data() {
    echo -e "\n${BLUE}🏪 Seeding location data...${NC}"
    docker-compose exec -T api php artisan db:seed --class=LocationSeeder --force
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Location data seeded (66 stores)${NC}"
    else
        echo -e "${YELLOW}⚠️ Location seeding may have failed${NC}"
    fi
}

# Function to clear Laravel caches
clear_caches() {
    echo -e "\n${BLUE}🧹 Clearing Laravel caches...${NC}"
    docker-compose exec -T api php artisan config:clear
    docker-compose exec -T api php artisan cache:clear
    docker-compose exec -T api php artisan route:clear
    echo -e "${GREEN}✅ Caches cleared${NC}"
}

# Function to show service status
show_status() {
    echo -e "\n${BLUE}📊 Service Status:${NC}"
    docker-compose ps
}

# Function to show application URLs
show_urls() {
    echo -e "\n${GREEN}🎉 Application is ready!${NC}"
    echo "=============================="
    echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:${FRONTEND_PORT}"
    echo -e "${BLUE}🔗 API:${NC} http://localhost:${API_PORT}"
    echo -e "${BLUE}📋 Admin Panel:${NC} http://localhost:${FRONTEND_PORT}/admin"
    echo -e "${BLUE}🗄️ Database:${NC} localhost:${DB_PORT} (user: ${MYSQL_USER})"
    echo ""
    echo -e "${YELLOW}📧 Admin Login:${NC}"
    echo -e "   Email: ${ADMIN_EMAIL}"
    echo -e "   Password: [Check .env file]"
    echo ""
    echo -e "${BLUE}💡 Useful Commands:${NC}"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart: docker-compose restart"
    echo "   Shell access: docker-compose exec api bash"
}

# Function to handle cleanup on script interruption
cleanup() {
    echo -e "\n${YELLOW}🛑 Script interrupted. Cleaning up...${NC}"
    docker-compose down
    exit 1
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    # Change to the correct directory
    cd "$(dirname "$0")"
    
    echo -e "${BLUE}📁 Working directory: $(pwd)${NC}"
    
    # Load environment variables first
    load_env
    
    # Check prerequisites
    check_docker
    check_docker_compose
    
    # Ask user for confirmation
    echo -e "\n${YELLOW}This script will:${NC}"
    echo "1. Build Docker images"
    echo "2. Start all services (database, API, frontend)"
    echo "3. Run database migrations"
    echo "4. Create admin user"
    echo "5. Clear caches"
    echo ""
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Operation cancelled.${NC}"
        exit 0
    fi
    
    # Execute setup steps
    build_services
    start_services
    wait_for_database
    run_migrations
    seed_admin_user
    clear_caches
    show_status
    show_urls
    
    echo -e "\n${GREEN}✨ Setup completed successfully!${NC}"
}

# Run main function
main "$@"