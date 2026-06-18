# HCSS Website

A modern, low-maintenance website for the Helmstedter Chor- und Singschule e.V.
(HCSS) designed to replace the old site with a solution that simplifies media
and event management.

## Overview

This project serves as the official website for HCSS e.V. It was developed to
reduce maintenance overhead, particularly when adding new media content or
events. The website features a clean, responsive design with an intuitive admin
interface for content management.

## Features

- Responsive design that works across desktop and mobile devices
- Simple content management system for easily updating website sections
- Event announcement management
- Media gallery for photos
- Admin panel for content management
- Authentication system

## Getting Started

### Prerequisites

- [Node.js 24](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://git.eiflerstrom.de/IC3P3/hcss-website.git
    cd hcss-website
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up environment variables — copy `.env.example` to `.env` and adjust the
   values (see [Configuration](#configuration)):

    ```bash
    cp .env.example .env
    ```

4. Initialize the database and seed development data:

    ```bash
    pnpm db:migrate
    pnpm db:seed
    ```

### Development

Start the development server:

```bash
pnpm run dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

Build the project for production:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## Configuration

All settings are provided through environment variables — copy `.env.example`
to `.env` for local development, or pass them at runtime in Docker.

| Variable          | Required | Default (Docker image)      | Description                                                             |
| ----------------- | -------- | --------------------------- | ----------------------------------------------------------------------- |
| `ADMIN_PASSWORD`  | yes      | —                           | Admin password used by the seed. The container aborts on boot if unset. |
| `HOST_URL`        | yes      | —                           | Public base URL, used for `sitemap.xml`/`robots.txt`.                   |
| `ADMIN_USERNAME`  | no       | `admin`                     | Admin username used by the seed.                                        |
| `DATABASE_URL`    | no       | `/data/website-data.sqlite` | SQLite path. Keep it on the `/data` volume.                             |
| `UPLOAD_PATH`     | no       | `/data/upload`              | Upload directory. Keep it on the `/data` volume.                        |
| `BODY_SIZE_LIMIT` | no       | `Infinity`                  | Node request body cap; left disabled so the reverse proxy is the limit. |

> `ADMIN_PASSWORD` must stay set on every start — the seed validates it before
> checking whether the admin already exists.

## Deployment with Docker

The included `Dockerfile` produces a self-contained image. On startup the
container applies database migrations and runs an idempotent production seed
(creating the admin user and base page content if missing), then starts the
server on port `3000`.

### Build

```bash
docker build -t hcss-website .
```

### Run

The database **and** uploaded media are stored under `/data`, so mount a
persistent volume there. The admin password is injected at runtime:

```bash
docker run -d \
  --name hcss-website \
  -p 3000:3000 \
  -v hcss-data:/data \
  -e ADMIN_PASSWORD='your-strong-password' \
  -e HOST_URL='https://your-domain.example' \
  hcss-website
```

See [Configuration](#configuration) for all available variables.

### Reverse proxy

Since `BODY_SIZE_LIMIT` is disabled in the container, the upload size cap lives
at the reverse proxy. For nginx, set a limit that allows your media uploads, e.g.:

```nginx
client_max_body_size 10M;
```

## Database Management

This project uses Drizzle ORM with SQLite. Database schema changes are managed
using Drizzle Kit.

Apply schema changes to the database:

```bash
pnpm run db:generate
pnpm run db:migrate
```

Explore and manage your database with Drizzle Studio:

```bash
pnpm db:studio
```

## Content Management

The admin panel can be accessed at `/admin` (login required). From here, you can:

- Create and manage events
- Upload and organize media
- Update site content by changing images in different sections
- Link media items to events

## Testing

The project includes both unit and end-to-end testing:

Run unit tests:

```bash
pnpm run test:unit
```

Run end-to-end tests:

```bash
pnpm run test:e2e
```

Run all tests:

```bash
pnpm run test
```

## Code Quality

Maintain code quality with the following commands:

Format code:

```bash
pnpm run format
```

Lint code:

```bash
pnpm run lint

# For checking some more rules
pnpm run lint:strict
```

Svelte diagnostics:

```bash
pnpm check

# OR to run it constantly
pnpm check:watch
```
