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

Open [https://new-tube-gamma.vercel.app] with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about this project, take a look at the following resources:

## 01 Setup

- Configure environment
    - runtime (Node.js, Bun)
    - package manager (npm, pnpm, yarn, bun)

- Why bun?
    - You will get the same environment as I do some time
    - Easily run TypeScript scripts with ES6 imports
    - Less issues with dependency issues regarding React 19
        - (npm throws an error, yarn throws a warning, bun simply works)

- Establish basic Bun commands
    - bun add === npm install
    - bunx === npx

- Create Next.js project
    - use exact version
    - add shadcn/ui
    - get familiar with the structure

- Add usefull VSCode extensions

## 02 Basic layout
![alt text](./public/image.png)

- Add logo asset
- Learn basic app router folders
- Sidebar components
    - Sidebar sections
    - Sidebar items
- Navbar
    - Search input
    - Sign in component

## 03 Authentication
![alt text](./public/image-1.png)![alt text](./public/image-2.png)

- Integrate Clerk
- Add Sign in screens
- Add UserButton
- Add middleware
- Use auth state on sidebar sections
- Protect routers

## 04 Database setup

- Create a PostgreSQL database (www.neon.tech)
- Setup DrizzleORM
- Create users schema
- Migrate changes to database
- Learn how to use drizzle-kit

- Why DrizzleORM?
    - Only ORM with both relational and SQL-like query APIs
    - Serverless by default
    - Forcing up to "understand" our queries

```bash
cosnt result = await db.query.users.findMany({
    with: {  // prisma-like querying
    posts: true
    },
});
```
```bash
await db // sql-like querying
    .select()  
    .from(countries)
    .laftJoin(cities, eq(cities.countryId, countries.id))
    .where(eq(contires.id, 10))
```

## 05 Webhook sync

- Create ngrok account (or any other local tunnel solution)
- Obtain a static domain (not required, but easier development)
- Add script to concurrently run local tunnel & app
- Create the users webhook
- Connect the webhook on Clerk dashboard

## 06 tRPC setup

Why tRPC?
- end-to-end typesafety
- Familiar hooks (useQuery, useMutation etc.)
- v11 allows us to do authenticated prefetching

## 07 tRPC configuration

- Enable transformer on tRPC
- Add auth to tRPC context
- Add protectedProcedure
- Add rate limiting

## 08 Video Categories

- Create categories schema
- Push changes to the database
- Seed categories
- Prefetch categories
- Create categories components

## 09 Studio layout
![alt text](./public/image-3.png)
- Create studio route group
- Create studio layout
- Protect studio routes

## 10 Studio videos

- Create videos schema
- Push database changes
- Create studio procedures
- Add vidoes records creations

## 11 Infinite loading

- Add suspense and error boundaries
- Create reuseable InfiniteScroll components
- Demonstrate infinite scroll

## 12 Mux integration
![alt text](./public/image-4.png)

- Create a responsive dialog
- Create a free Mux account
    - Credit card NOT required!
- Get a 15-sec video with english audio
    - https://tinyurl.com/mytube-clip
- Create upload modal

Mux free account limitations

- Lenght limit (10s)
- Video deletion after 24h
- Mux watermark

You can add a credit card, and stay within free tier for the entirety of this project. You will unlock full benefits of Mux for $0

Mux pricing calculator: https://calculator.mux.com/

## 13 Mux webhooks
- Update video schema
- Push database changes
- Handle "video.asset.ready" events
    - assign thumbnail
    - assign preview
- Handle "video.asset.errored" events
    - update status
- Handle "video.asset.track.ready" events
    - delete from database
- Handle "video.asset.track.ready" event
    - update trackId and trackStatus

## 14 Video form
![alt text](./public/image-5.png)

- Add skeleton to videos-section
- Create video form page
- Create video player
- Add ability to update video information
    - (Title, Description, Category, Visibility)

## 15 Video thumbnails
![alt text](./public/image-6.png)

- Integrate uploadThink
- Add thumbnail upload functionality
- Add thumbnail restore functionality
- Refactor thumbnail field in the schema
    - Proper UploadThink cleanup

## 16 AI background jobs

Why background jobs?
- avoid timeout from long-running tasks
    - problematic with AI generations
- Ensure retries in case of failure

- Integrate Upstash workflow
- Trigger a background job
- Setup OpenAI SDK
    - Credit card required (No free trial, no free credits)
- Add background jobs
    - Generate title
    - Generate description
    - Generate thumbnail

## 17 AI thumbnails
![alt text](./public/image-7.png)

- Create thumbnail prompt modal
- Create thumbnail generation workflow
- Add skeleton to form-section loading state