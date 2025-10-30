#!/bin/bash

# Create file: /home/brendan/brg-locations/start-backend.sh

echo "📡 Starting Laravel API server..."
cd /home/brendan/brg-locations/brg-api

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found in brg-api directory"
    echo "Please copy .env.example to .env and configure your database settings"
    exit 1
fi

# Install dependencies if vendor folder doesn't exist
if [ ! -d "vendor" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install
fi

# Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate
fi

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate

# Start server
echo "🚀 Starting server on http://localhost:8000"
php artisan serve --host=127.0.0.1 --port=8000