AI-Powered Video Calling App
================================

A production-ready, TypeScript-first Next.js application that enables AI-enhanced video calling and collaboration. Built with modern tooling for realtime media, messaging, server-side orchestration, and a robust API surface intended for enterprise and developer use.
![Uploading image.png…]()


Key Features
------------

- Real-time video calling and group meetings
- Chat and presence integrated with Stream services
- Server-side event orchestration with Inngest
- Type-safe APIs using tRPC and Drizzle (database schema)
- Role-based dashboard, meeting management, and user flows

Tech Stack
----------

- Framework: Next.js (App Router)
- Language: TypeScript
- Realtime / Media: Stream Video & Stream Chat (see `src/lib/stream-video.ts`)
- API: tRPC (`src/trpc`) and Inngest (`src/inngest`)
- DB: Drizzle ORM (`drizzle.config.ts`, `src/db`)
- Styling: Tailwind / CSS modules (see `src/app/globals.css`)

Architecture Overview
---------------------

The app uses a server-driven approach where Next.js API routes and tRPC resolvers orchestrate authentication, meeting lifecycle, and background workflows. Realtime media (video/chat) is handled by Stream; background jobs and analytics use Inngest for reliable server-side events.

Quickstart — Development
------------------------

Prerequisites:

- Node.js 18+ and a package manager (`npm`, `pnpm`, or `yarn`)
- Environment variables (see `./env.example` or `.env.local`)

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

Run the dev server:

```bash
npm run dev
# opens at http://localhost:3000
```

Key scripts:

- `dev` — start development server
- `build` — production build
- `start` — start production server after build
- `lint` — run ESLint

Environment Variables
---------------------

Create a `.env.local` file with the required keys. Typical variables used by the project include:

- `NEXT_PUBLIC_STREAM_KEY`, `STREAM_SECRET`
- `DATABASE_URL` (for Drizzle)
- `INNGEST_API_KEY`
- `NEXTAUTH_URL` and provider secrets (if used)

Check the source for exact variable names under `src/lib` and `src/api`.

Testing & Quality
-----------------

- Linting: `npm run lint`
- Add unit and integration tests near the modules they cover. CI should run `build`, `lint`, and tests on pull requests.

Deployment
----------

This repository is deployable to Vercel, but any Node-friendly platform works. For Vercel:

```bash
# Build and preview locally
npm run build
npm run start
```

Ensure environment variables are copied into the target environment and secrets are stored securely.

Contributing
------------

- Fork the repo and open a pull request with a clear description
- Follow conventional commits for changelogs
- Add tests for new features and update docs when behavior changes

Troubleshooting
---------------

- If video or chat fails, confirm Stream keys and network connectivity
- For DB issues, verify `DATABASE_URL` and run migrations if applicable

Roadmap & Notes
---------------

- Add end-to-end tests for meeting flows
- Enhance observability (metrics, tracing)
- Provide deploy recipes for Kubernetes and serverless

---

Contact / Maintainers: See `package.json` and `src/lib/auth.ts` for author and support references.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
