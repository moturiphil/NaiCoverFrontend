# NaiCover Frontend Deployment Guide 🚀

This guide covers various deployment options for the NaiCover frontend application, from simple hosting solutions to enterprise-grade deployments.

## Table of Contents

- [Overview](#overview)
- [Build Process](#build-process)
- [Platform-Specific Deployments](#platform-specific-deployments)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
  - [Firebase Hosting](#firebase-hosting)
  - [Traditional VPS/Server](#traditional-vpsserver)
- [Docker Deployment](#docker-deployment)
- [CI/CD Pipelines](#cicd-pipelines)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Overview

NaiCover Frontend is a React + Vite application that builds to static files, making it compatible with most hosting platforms. The built application consists of:

- Static HTML, CSS, and JavaScript files
- Optimized assets (images, fonts)
- No server-side dependencies (pure frontend)

## Build Process

### Production Build

```bash
# Install dependencies
npm install

# Run linting (optional but recommended)
npm run lint

# Build for production
npm run build

# Preview the build locally (optional)
npm run preview
```

### Build Output

The build creates a `dist/` directory containing:
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js     # Main JavaScript bundle
│   ├── index-[hash].css    # Main CSS bundle
│   └── [asset-files]       # Other assets
└── [other-static-files]    # Public assets
```

### Build Optimization

```typescript
// vite.config.ts - Production optimizations
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Set to true for debugging
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
})
```

## Platform-Specific Deployments

### Vercel (Recommended)

Vercel provides excellent integration with React applications and automatic deployments.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moturiphil/NaiCoverFrontend)

#### Manual Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Configuration File**
   ```json
   // vercel.json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ],
     "env": {
       "VITE_API_URL": "https://api.naicover.com"
     }
   }
   ```

4. **Auto-deployment Setup**
   - Connect your GitHub repository
   - Enable auto-deployments on push to main
   - Configure environment variables in Vercel dashboard

### Netlify

Perfect for static sites with powerful features like form handling and redirects.

#### Drag and Drop Deploy

1. Build your project: `npm run build`
2. Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

#### Git-based Deploy

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   ```yaml
   # Build command
   npm run build
   
   # Publish directory
   dist
   
   # Environment variables
   VITE_API_URL=https://api.naicover.com
   ```

3. **Configuration File**
   ```toml
   # netlify.toml
   [build]
   command = "npm run build"
   publish = "dist"

   [build.environment]
   NODE_VERSION = "20"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200

   [[headers]]
   for = "/*"
   [headers.values]
   X-Frame-Options = "DENY"
   X-XSS-Protection = "1; mode=block"
   X-Content-Type-Options = "nosniff"
   Referrer-Policy = "strict-origin-when-cross-origin"
   ```

### GitHub Pages

Free hosting for public repositories.

1. **Setup GitHub Actions**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build
           env:
             VITE_API_URL: ${{ secrets.VITE_API_URL }}

         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           if: github.ref == 'refs/heads/main'
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configure Vite for GitHub Pages**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/NaiCoverFrontend/', // Repository name
     // ... other config
   })
   ```

### AWS S3 + CloudFront

Enterprise-grade deployment with global CDN.

1. **Build and Upload to S3**
   ```bash
   # Build the project
   npm run build

   # Install AWS CLI
   pip install awscli

   # Configure AWS credentials
   aws configure

   # Create S3 bucket
   aws s3 mb s3://naicover-frontend

   # Upload files
   aws s3 sync dist/ s3://naicover-frontend --delete
   ```

2. **S3 Bucket Configuration**
   ```json
   // Static website hosting settings
   {
     "IndexDocument": {
       "Suffix": "index.html"
     },
     "ErrorDocument": {
       "Key": "index.html"
     }
   }
   ```

3. **CloudFront Distribution**
   ```yaml
   # cloudfront-config.yml
   Distribution:
     Origins:
       - DomainName: naicover-frontend.s3.amazonaws.com
         Id: S3-naicover-frontend
         S3OriginConfig:
           OriginAccessIdentity: ""
     DefaultCacheBehavior:
       TargetOriginId: S3-naicover-frontend
       ViewerProtocolPolicy: redirect-to-https
       Compress: true
     CustomErrorResponses:
       - ErrorCode: 404
         ResponseCode: 200
         ResponsePagePath: "/index.html"
   ```

### Firebase Hosting

Google's hosting platform with excellent integration.

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configuration**
   ```json
   // firebase.json
   {
     "hosting": {
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "**/*.@(js|css)",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "max-age=31536000"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Traditional VPS/Server

For custom server deployments using Nginx.

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Nginx
   sudo apt install nginx -y

   # Install Node.js (for building)
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Build and Deploy**
   ```bash
   # On your local machine or CI
   npm run build

   # Upload to server
   scp -r dist/* user@your-server:/var/www/naicover/

   # Or use rsync
   rsync -avz --delete dist/ user@your-server:/var/www/naicover/
   ```

3. **Nginx Configuration**
   ```nginx
   # /etc/nginx/sites-available/naicover
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/naicover;
       index index.html;

       # Gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 10240;
       gzip_proxied expired no-cache no-store private must-revalidate auth;
       gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Handle client-side routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
   }
   ```

4. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/naicover /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Docker Deployment

### Production Dockerfile

```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  # Optional: Add reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    restart: unless-stopped
```

### Deployment Commands

```bash
# Build and run
docker build -t naicover-frontend .
docker run -p 80:80 naicover-frontend

# Using Docker Compose
docker-compose up -d

# Update deployment
docker-compose down
docker-compose up -d --build
```

## CI/CD Pipelines

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Environment Configuration

### Environment Variables

```bash
# Production Environment Variables
VITE_API_URL=https://api.naicover.com
VITE_APP_VERSION=1.0.0
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=YOUR_SENTRY_DSN
VITE_ENVIRONMENT=production
```

### Platform-Specific Environment Setup

```bash
# Vercel
vercel env add VITE_API_URL

# Netlify
netlify env:set VITE_API_URL https://api.naicover.com

# AWS (using AWS Systems Manager)
aws ssm put-parameter --name "/naicover/VITE_API_URL" --value "https://api.naicover.com" --type "String"
```

## Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'vendor-router': ['react-router-dom'],
          'vendor-forms': ['react-hook-form', 'zod'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
```

### CDN Configuration

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.naicover.com">
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Resource hints -->
<link rel="dns-prefetch" href="//api.naicover.com">
```

## Monitoring and Analytics

### Error Tracking with Sentry

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
  });
}
```

### Analytics Setup

```typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (import.meta.env.VITE_GA_TRACKING_ID) {
    gtag('event', eventName, properties);
  }
};
```

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   
   # Check for lint errors
   npm run lint
   
   # Clear cache and rebuild
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   ```bash
   # Ensure variables start with VITE_
   VITE_API_URL=https://api.example.com
   
   # Check build logs for variable substitution
   npm run build -- --debug
   ```

3. **Routing Issues (404 on Refresh)**
   - Configure server redirects to `/index.html`
   - See platform-specific configurations above

4. **Performance Issues**
   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   
   # Check for unused dependencies
   npx depcheck
   ```

### Health Checks

```bash
# Basic health check script
#!/bin/bash
echo "Checking deployment health..."

# Check if site is accessible
if curl -f -s https://your-domain.com > /dev/null; then
    echo "✅ Site is accessible"
else
    echo "❌ Site is not accessible"
    exit 1
fi

# Check specific endpoints
if curl -f -s https://your-domain.com/api/health > /dev/null; then
    echo "✅ API is healthy"
else
    echo "⚠️  API health check failed"
fi
```

---

For additional help with deployment, check the troubleshooting section in [SETUP.md](./SETUP.md) or create an issue on GitHub.