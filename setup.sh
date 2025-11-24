#!/bin/bash

echo ""
echo "================================"
echo " Dhanush HS Portfolio Setup"
echo "================================"
echo ""

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please make sure you have Node.js installed"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "Starting development server..."
echo "The website will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
