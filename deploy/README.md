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

    Put nginx/TLS in front of port `9000`; that public URL is the
    `*_DEPLOY_HOOK_URL` secret.

6. Point the site's reverse proxy at `APP_PORT` and set `client_max_body_size`
   for uploads.

## Rollback

Every build is also tagged with the commit SHA. To roll back, set `IMAGE_TAG` to
a known SHA in the server `.env` and run `./deploy.sh`.
