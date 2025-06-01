# 🚀 Deployment Guide

This guide covers various deployment options for BlinkShot.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ A Together AI API key
- ✅ Your code pushed to a Git repository
- ✅ Environment variables configured

## 🌐 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step-by-Step Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Select your project
   - Navigate to Settings → Environment Variables
   - Add `TOGETHER_API_KEY` with your API key

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Automatic Deployments

Connect your GitHub repository to Vercel for automatic deployments:
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables
5. Deploy!

## 🚀 Netlify

Deploy to Netlify using their Git integration.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out/` folder

### Git Integration

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add `TOGETHER_API_KEY`

## 🚂 Railway

Railway offers simple deployment with automatic HTTPS.

### Deployment Steps

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your repository

2. **Configure Environment**
   - Add `TOGETHER_API_KEY` in the Variables tab
   - Railway will automatically detect Next.js

3. **Deploy**
   - Railway will automatically build and deploy
   - You'll get a custom domain

## 🐳 Docker

Deploy using Docker for maximum control.

### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands

```bash
# Build the image
docker build -t blinkshot .

# Run the container
docker run -p 3000:3000 -e TOGETHER_API_KEY=your_key blinkshot
```

## ☁️ AWS Amplify

Deploy to AWS with automatic CI/CD.

### Deployment Steps

1. **Connect Repository**
   - Go to AWS Amplify console
   - Click "Connect app"
   - Select your Git provider and repository

2. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Set Environment Variables**
   - Add `TOGETHER_API_KEY` in the Environment variables section

## 🌊 DigitalOcean App Platform

Simple deployment with managed infrastructure.

### Deployment Steps

1. **Create App**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect your repository

2. **Configure App**
   - Select Node.js
   - Build command: `npm run build`
   - Run command: `npm start`

3. **Set Environment Variables**
   - Add `TOGETHER_API_KEY` in the environment section

## 🔧 Environment Variables

For all deployment platforms, you'll need to set:

| Variable | Value | Required |
|----------|-------|----------|
| `TOGETHER_API_KEY` | Your Together AI API key | ✅ Yes |
| `NODE_ENV` | `production` | Recommended |

## 🔍 Troubleshooting

### Common Issues

#### Build Failures
- **Check Node.js version**: Ensure you're using Node.js 18+
- **Clear cache**: Delete `node_modules` and `package-lock.json`, then reinstall
- **Check dependencies**: Ensure all dependencies are in `package.json`

#### Runtime Errors
- **API Key**: Verify `TOGETHER_API_KEY` is set correctly
- **CORS Issues**: Check if your deployment platform supports API routes
- **Memory Limits**: Some platforms have memory restrictions

#### Performance Issues
- **Enable caching**: Configure proper cache headers
- **Optimize images**: Use Next.js Image optimization
- **Bundle analysis**: Use `npm run analyze` to check bundle size

### Platform-Specific Issues

#### Vercel
- **Function timeout**: Increase timeout in `vercel.json`
- **Bundle size**: Vercel has a 50MB limit for serverless functions

#### Netlify
- **Function size**: Netlify functions have a 50MB limit
- **Build time**: Netlify has a 15-minute build timeout

#### Railway
- **Memory usage**: Railway provides 512MB RAM by default
- **Build time**: No specific time limits

## 📊 Monitoring

### Performance Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor Core Web Vitals

2. **Google Analytics**
   - Add tracking code to `layout.tsx`
   - Monitor user interactions

3. **Error Tracking**
   - Use Sentry for error monitoring
   - Set up alerts for API failures

### Cost Monitoring

- **Together AI**: Monitor API usage and costs
- **Deployment Platform**: Check usage limits and billing
- **CDN**: Monitor bandwidth usage

## 🔐 Security

### Best Practices

1. **Environment Variables**
   - Never commit API keys to Git
   - Use platform-specific secret management

2. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only

3. **Content Security**
   - Implement CSP headers
   - Sanitize user inputs
   - Validate image content

## 📈 Scaling

### Performance Optimization

1. **Caching**
   - Enable Redis for API caching
   - Use CDN for static assets

2. **Database**
   - Consider adding a database for user management
   - Cache frequently accessed data

3. **Load Balancing**
   - Use multiple instances for high traffic
   - Implement health checks

---

**Need help?** Check our [troubleshooting guide](./TROUBLESHOOTING.md) or [open an issue](https://github.com/stedbrown/blinkshot/issues). 