# Builder Stage
FROM node:24.14.0-slim@sha256:d8e448a56fc63242f70026718378bd4b00f8c82e78d20eefb199224a4d8e33d8 AS builder

RUN npm install -g pnpm@10.28.1

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN mkdir /database
ENV DATABASE_URL="/database/website-data.sqlite"
RUN pnpm run db:push --force

RUN pnpm run build

RUN pnpm prune --production

# Runner Stage
FROM node:24.14.0-slim@sha256:d8e448a56fc63242f70026718378bd4b00f8c82e78d20eefb199224a4d8e33d8
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
