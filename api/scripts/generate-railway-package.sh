#!/bin/bash

echo "Generating minimal package.json for Railway..."

cat > package-railway.json << EOF
{
  "name": "proarq-api-railway",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start:prod": "node dist/main.js"
  },
  "dependencies": {
    "@nestjs/cache-manager": "^3.0.1",
    "@nestjs/common": "10.4.15",
    "@nestjs/config": "3.3.0",
    "@nestjs/core": "10.4.15",
    "@nestjs/jwt": "10.2.0",
    "@nestjs/mapped-types": "2.0.6",
    "@nestjs/passport": "10.0.3",
    "@nestjs/platform-express": "10.4.15",
    "@nestjs/typeorm": "10.0.2",
    "@react-email/components": "0.0.31",
    "@react-email/render": "1.0.4",
    "bcrypt": "5.1.1",
    "cache-manager": "^7.1.1",
    "cache-manager-redis-store": "^3.0.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.1",
    "cookie-parser": "1.4.7",
    "dotenv": "16.4.7",
    "global": "4.4.0",
    "nestjs-resend": "1.0.3",
    "passport": "0.7.0",
    "passport-jwt": "4.0.1",
    "pdfmake": "0.2.10",
    "pg": "8.13.1",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "reflect-metadata": "0.2.2",
    "resend": "^6.0.1",
    "rxjs": "7.8.1",
    "sqlite3": "^5.1.7",
    "typeorm": "0.3.20"
  }
}
EOF

echo "package-railway.json generated successfully!"
echo "This file contains only production dependencies for Railway deployment."
