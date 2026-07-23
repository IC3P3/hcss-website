# Deployment

## Per-server setup

1. Install Docker + Compose and the
   [`webhook`](https://github.com/adnanh/webhook) binary.
2. Create `/srv/hcss/` and copy `docker-compose.yml`, `deploy.sh`, `hooks.yaml`
   into it (`chmod +x deploy.sh`).
3. Copy `env.server.example` to `/srv/hcss/.env` and fill it in (`IMAGE_TAG=dev`
   on the dev box, `prod` on prod).
4. `docker login git.eiflerstrom.de` so the box can pull the private image.
5. Run the listener with the token in its environment, e.g. a systemd unit:

    ```ini
    [Service]
    Environment=DEPLOY_TOKEN=<same value as *_DEPLOY_TOKEN in Forgejo>
    ExecStart=/usr/bin/webhook -hooks /srv/hcss/hooks.yaml -template -port 9000 -verbose
    Restart=always
    ```

    Put nginx/TLS in front of port `9000`. That public URL is the
    `*_DEPLOY_HOOK_URL` secret.

6. Point the site's reverse proxy at `APP_PORT` and set `client_max_body_size`
   for uploads.

## Optional analytics (Umami)

The compose file contains an `umami` + `umami-db` pair behind the `analytics`
profile. Without the profile nothing extra runs. To enable it:

1. Set `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` (random string) and optionally
   `UMAMI_PORT` / `UMAMI_DB_DIR` in the server `.env`.
2. Start the stack with the profile:

    ```bash
    docker compose --profile analytics up -d
    ```

3. Log into the Umami dashboard on `UMAMI_PORT` (default credentials
   `admin` / `umami` — change them immediately), add the website, and put a
   reverse proxy with TLS in front (e.g. `stats.example.de`).
4. Set `PUBLIC_UMAMI_SRC` (e.g. `https://stats.example.de/script.js`) and
   `PUBLIC_UMAMI_WEBSITE_ID` in the `.env`, then restart the app container.
   Leaving these empty keeps the site free of any tracking script.

## Rollback

Every build is also tagged with the commit SHA. To roll back, set `IMAGE_TAG` to
a known SHA in the server `.env` and run `./deploy.sh`.
