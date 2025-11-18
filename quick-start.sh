#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

echo "🚀 Quick Starting BRG Locations..."

# Start services
docker-compose --env-file .env up -d

# Wait a moment for database
sleep 5

# Show status
docker-compose ps

echo ""
echo "🌐 Frontend: http://localhost:${FRONTEND_PORT}"
echo "🔗 API: http://localhost:${API_PORT}"
echo "📋 Admin: http://localhost:${FRONTEND_PORT}/admin"
echo ""
echo "📧 Admin Login: ${ADMIN_EMAIL} / [Check .env]"