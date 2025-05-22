FROM node:22.16.0-slim AS builder

# Install pnpm globally
RUN npm install -g pnpm@10.8.0

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i

COPY . .

ENV DATABASE_URL=/app/data.db
RUN pnpm run db:push --force

# Run the build
RUN pnpm run build

# Prune development dependencies
RUN pnpm prune --production

# --- Final Stage ---
FROM node:22.16.0-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/data.db data.db
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
