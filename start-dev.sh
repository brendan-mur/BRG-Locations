#!/bin/bash

# Create file: /home/brendan/brg-locations/start-dev.sh

echo "🚀 Starting BRG Locations Development Environment..."

# Function to handle cleanup when script is interrupted
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT SIGTERM

# Start Laravel backend
echo "📡 Starting Laravel API server..."
cd /home/brendan/brg-locations/brg-api
php artisan serve --host=127.0.0.1 --port=8000 &
BACKEND_PID=$!
echo "✅ Backend running at http://localhost:8000 (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 2

# Start React frontend
echo "🌐 Starting React development server..."
cd /home/brendan/brg-locations/brg-frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running at http://localhost:5173 (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Development environment is ready!"
echo "📱 Frontend: http://localhost:5173"
echo "🔗 API: http://localhost:8000"
echo "📋 Admin: http://localhost:5173/admin"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID