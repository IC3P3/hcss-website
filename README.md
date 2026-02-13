# HCSS Website

A modern, low-maintenance website for the Helmstedter Chor- und Singschule e.V.
(HCSS) designed to replace the old site with a solution that simplifies media
and event management.

## Overview

This project serves as the official website for HCSS e.V. It was developed to
reduce maintenance overhead, particularly when adding new media content or
events. The website features a clean, responsive design with an intuitive admin
interface for content management.

## TODO

- [ ] Redesign the About component
- [ ] Add Event creation
- [ ] Add Media, Event and Content customizations
- [ ] Add videos and audio to media types
- [ ] Fill in the placeholder texts
- [ ] Add Event page with past and future events
- [ ] Add Media page with all the uploaded media
- [ ] Create Docker image/compose file
- [ ] Create CI/CD pipeline
- [ ] Implement image optimization (instead of only accepting webp, maybe sharp)
- [ ] Add Open Graph tags
- [ ] Get Datenschutzerklären and Impressum and add it
- [ ] Add custom error page
- [ ] Add logging (winston)

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

3. Set up environment variables:
    - Create a `.env` file with the following variables:

        ```txt
        DATABASE_URL=./data.db
        ```

4. Initialize the database:

    ```bash
    pnpm db:migrate
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
