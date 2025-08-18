FROM node:18-alpine

WORKDIR /app

COPY package-railway.json ./package.json

RUN npm install -g pnpm && \
    pnpm install --prod

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
