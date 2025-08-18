#!/bin/bash

echo "Preparing application for Railway deployment..."

echo "Cleaning previous builds..."
rm -rf dist

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building application..."
pnpm run build

echo "Verifying build..."
if [ -d "dist" ] && [ -f "dist/main.js" ]; then
    echo "Build successful! dist/main.js exists."
    echo "Ready for Railway deployment."
else
    echo "Build failed! dist/main.js not found."
    exit 1
fi
