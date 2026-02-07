# HCSS Website

A modern, low-maintenance website for the Helmstedter Chor- und Singschule e.V.
(HCSS) designed to replace the old site with a solution that simplifies media
and event management.

## Overview

This project serves as the official website for HCSS e.V. It was developed to
reduce maintenance overhead, particularly when adding new media content or
events. The website features a clean, responsive design with an intuitive admin
interface for content management.

## Technology Stack

This project utilizes modern web technologies to ensure performance, reliability,
and ease of maintenance:

- **Frontend**:
    - [SvelteKit](https://kit.svelte.dev/) - Application framework
    - [Svelte 5](https://svelte.dev/) - Component framework
    - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
    - [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS framework

- **Backend**:
    - [SvelteKit](https://kit.svelte.dev/) - Server-side rendering and API endpoints
    - [Drizzle ORM](https://orm.drizzle.team/) - SQL toolkit and ORM
    - [SQLite](https://www.sqlite.org/) (via better-sqlite3) - Database solution

## Features

- Responsive design that works across desktop and mobile devices
- Content management system for easily updating website sections
- Event announcement management
- Media gallery for photos
- Admin panel for content management
- Authentication system

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.10 is recommended)
- [pnpm](https://pnpm.io/) (recommended package manager)
- [Nix](https://nixos.org/) (optional, for reproducable a dev environment)
- [Podman](https://podman.io/) (optional, works with Docker aswell)

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

3. Set up environment variables:
    - Create a `.env` file with the following variables:

        ```txt
        DATABASE_URL=./data.db
        ```

4. Initialize the database:

    ```bash
    pnpm db:push
    ```

### Development

Start the development server:

```bash
pnpm dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

Build the project for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

### Building an image for Production

Build with Podman:

```bash
podman build .
```

Copy the hash of the image and run the image:

```bash
podman run -p 3000:3000 -e DATABASE_URL=/app/data.db <IMAGE HASH>
```

## Database Management

This project uses Drizzle ORM with SQLite. Database schema changes are managed
using Drizzle Kit.

Apply schema changes to the database:

```bash
pnpm db:push
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

## Data Models

The application uses the following main data models:

- **Events**: Performances and activities with dates, times, and locations
- **Media**: Images with subtitles that can be linked to events
- **Content**: Website content sections that can reference media items
- **Users & Sessions**: Authentication system for admin access

## Testing

The project includes both unit and end-to-end testing:

Run unit tests:

```bash
pnpm test:unit
```

Run end-to-end tests:

```bash
pnpm test:e2e
```

Run all tests:

```bash
pnpm test
```

## Code Quality

Maintain code quality with the following commands:

Format code:

```bash
pnpm format
```

Lint code:

```bash
pnpm lint
```

Svelte diagnostics:

```bash
pnpm check

# OR to run it constantly

pnpm check:watch
```

## Deployment

### Server Requirements

- Node.js (v18 or newer, recommended is v22)
- Alternatively to Node.js is docker or podman recommended
- Minimum 1GB RAM
- 10GB disk space (adjust based on media storage needs)

### Traditional Deployment Steps

1. Build the project:

    ```bash
    pnpm build
    ```

2. Start the server in production mode:

    ```bash
    NODE_ENV=production node build
    ```

3. For production deployment, consider using a process manager like PM2:

    ```bash
    npm install -g pm2
    pm2 start build/index.js --name "hcss-website"
    ```
