# Deployment Instructions

## Environment Variables

This application requires the following environment variables to be configured in production:

### Required Variables

- `JWT_SECRET`: A secret key for JWT token signing and verification
- `DATABASE_URL`: Database connection string (SQLite file path)
- `NODE_ENV`: Set to `production` in production (optional, but recommended)
- `PORT`: Port number (Render sets this automatically)

### For Render.com Deployment

1. Go to your Render dashboard
2. Select your service
3. Go to "Environment" tab
4. Add the following environment variables:

```
JWT_SECRET=your-secret-key-here
DATABASE_URL=file:./dev.db
NODE_ENV=production
```

### Generating a JWT Secret

You can generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Local Development

Copy `.env.example` to `.env` and configure your local variables:

```bash
cp .env.example .env
```

Then edit `.env` with your values.

## Database Setup

The application uses SQLite with Prisma. The database file will be created automatically on first run.

## Build Process

The build process automatically:
1. Generates Prisma client
2. Compiles TypeScript to JavaScript

```bash
npm run build
```
