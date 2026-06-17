# Builder Stage
FROM node:26.3.0-slim@sha256:95a34da32a840bd9b3b09a5b773591c16923e350174b1c50e1200c75bf15eaa9 AS builder

RUN npm install -g pnpm@10.28.1

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i

COPY . .

# Bundle to JS so these still run after dev deps are pruned; native modules stay external.
RUN pnpm exec esbuild scripts/migrate.ts seed/seed-production.ts \
    --bundle --platform=node --format=esm --outdir=. --out-extension:.js=.mjs \
    --external:argon2 --external:better-sqlite3

RUN pnpm run build && \
    pnpm prune --production

# Runner Stage
FROM node:26.3.0-slim@sha256:95a34da32a840bd9b3b09a5b773591c16923e350174b1c50e1200c75bf15eaa9
WORKDIR /app

# No DB is baked into the image; the migrator builds the schema on the /data volume at startup.
ENV DATABASE_URL="/data/website-data.sqlite"

COPY --from=builder /app/build .
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/drizzle drizzle/
COPY --from=builder /app/migrate.mjs .
COPY --from=builder /app/seed-production.mjs .
COPY package.json .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000
ENV NODE_ENV="production"
# Body size is capped at the reverse proxy (nginx client_max_body_size), not here.
ENV BODY_SIZE_LIMIT="Infinity"

ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD [ "node", "." ]
