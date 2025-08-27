FROM node:22.18.0-slim AS builder

# Install pnpm globally
RUN npm install -g pnpm@10.8.0

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i

COPY . .

RUN mkdir /database
ENV DATABASE_URL="/database/website-data.sqlite"

RUN pnpm run db:push --force

# Run the build
RUN pnpm run build

# Prune development dependencies
RUN pnpm prune --production

# --- Final Stage ---
FROM node:22.18.0-slim
WORKDIR /app

RUN mkdir /database
RUN mkdir /default
ENV DATABASE_URL="/database/website-data.sqlite"

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /database/website-data.sqlite /default/website-data.sqlite
COPY package.json .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000
ENV NODE_ENV="production"

ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD [ "node", "build" ]
