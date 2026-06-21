# Builder Stage
FROM node:24.16.0-slim@sha256:2c87ef9bd3c6a3bd4b472b4bec2ce9d16354b0c574f736c476489d09f560a203 AS builder

RUN npm install -g pnpm@11.6.0

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm i

COPY . .

# Bundle to JS so these still run after dev deps are pruned; native modules stay external.
RUN pnpm exec esbuild scripts/migrate.ts scripts/seed-production.ts \
    --bundle --platform=node --format=esm --outdir=. --out-extension:.js=.mjs \
    --external:argon2 --external:better-sqlite3

# Throwaway value
ENV DATABASE_URL="/tmp/build.sqlite"
RUN pnpm run build && \
    pnpm prune --production

# Runner Stage
FROM node:24.16.0-slim@sha256:2c87ef9bd3c6a3bd4b472b4bec2ce9d16354b0c574f736c476489d09f560a203
WORKDIR /app

# DB and uploads both live on the persistent volume mounted at /data; the
# migrator builds the schema there at startup (no DB baked into the image).
ENV DATABASE_URL="/data/website-data.sqlite"
ENV UPLOAD_PATH="/data/upload"

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
