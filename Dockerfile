# Builder Stage
FROM node:24.13.1-slim@sha256:a81a03dd965b4052269a57fac857004022b522a4bf06e7a739e25e18bce45af2 AS builder

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
FROM node:24.13.1-slim@sha256:a81a03dd965b4052269a57fac857004022b522a4bf06e7a739e25e18bce45af2
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
