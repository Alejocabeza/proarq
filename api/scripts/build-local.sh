#!/bin/bash

echo "Building application locally..."

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building application..."
pnpm run build

echo "Build completed successfully!"
