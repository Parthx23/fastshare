# Minimal File & Text Sharing

Ultra-lightweight web app for temporary file and text sharing.

## Features

- Upload files (10MB max) with auto-delete after 24 hours
- Share text/code instantly
- No login required
- Device-local history only
- Fast loading (<1s)
- Secure temporary storage

## Setup

```bash
npm install
npm run dev
```

## API Routes

- `POST /api/upload` - Upload file
- `POST /api/text` - Share text
- `GET /api/get/[id]` - Retrieve share
- `POST /api/cleanup` - Clean expired items

## Deployment

Deploy to Vercel with automatic daily cleanup cron job.

```bash
vercel --prod
```