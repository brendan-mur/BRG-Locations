#!/bin/bash

# Create file: /home/brendan/brg-locations/start-frontend.sh

echo "🌐 Starting React development server..."
cd /home/brendan/brg-locations/brg-frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Start development server
echo "🚀 Starting server on http://localhost:5173"
npm run dev