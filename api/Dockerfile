FROM node:18-alpine AS base

WORKDIR /app

RUN npm install -g pnpm --no-optional --no-audit --no-fund

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.build.json ./
COPY nest-cli.json ./

RUN pnpm install --frozen-lockfile --no-optional --no-audit

COPY . .

RUN pnpm run build

FROM node:18-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "start:prod"]
