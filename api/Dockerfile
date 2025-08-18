FROM node:18-alpine AS base

WORKDIR /app

RUN apk add --no-cache python3 make g++ && \
    npm install -g pnpm --no-optional --no-audit --no-fund

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.build.json ./
COPY nest-cli.json ./

RUN pnpm install --frozen-lockfile --no-optional --no-audit --prefer-offline

COPY . .

RUN pnpm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g pnpm --no-optional --no-audit --no-fund && \
    pnpm install --frozen-lockfile --prod --no-optional --no-audit --prefer-offline

COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "start:prod"]
