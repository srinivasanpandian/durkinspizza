# Netlify Deployment Guide

This guide will help you deploy your Durkin's Pizza website to Netlify with Prerender integration.

## Quick Start

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign up or log in
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider and repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy automatically
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy:**
   ```bash
   # Build your site
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod
   ```

## Configuration Files

### `netlify.toml`
This file contains all Netlify configuration:
- **Build settings**: Build command and publish directory
- **Redirects**: SPA routing (all routes → index.html)
- **Headers**: Prerender token and cache control
- **Node version**: Set to Node 18

### `public/_redirects`
Implements the **Prerender Redirects Hack** (Method 1 - Easiest & Works 100%):
- Proxies Prerender crawler requests directly to Prerender service
- Handles client-side routing for React Router (all routes → index.html)
- **Important:** Currently configured for `durkinpizza.netlify.app`
  - If your Netlify site has a different URL, update line 2 in `public/_redirects`
  - Replace `durkinpizza.netlify.app` with your actual Netlify domain

## Prerender Integration

**Method 1: Redirects Hack (Currently Active)** ✅
- The `_redirects` file proxies Prerender crawler to Prerender service
- This is the easiest and most reliable method
- No additional configuration needed after deployment

**Method 2: Headers (Backup)**
- Prerender token is also configured in `netlify.toml`:
- Token: `63GIOd8cXk4djS1KyRyD`
- Header: `X-Prerender-Token` is set for all routes

**Next Steps:**
1. After deployment, get your Netlify URL
2. Log in to [Prerender.io](https://prerender.io)
3. Add your Netlify URL to your Prerender account
4. Prerender will automatically start serving prerendered content to crawlers
5. **Update the domain in `public/_redirects` if your Netlify URL is different**

## Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Update Prerender dashboard with your custom domain

## Environment Variables

If you need to set environment variables:

1. In Netlify dashboard, go to "Site settings" → "Environment variables"
2. Add any variables you need (e.g., API keys)
3. They will be available during build and runtime

## Continuous Deployment

Netlify automatically deploys when you:
- Push to your main/master branch
- Create a pull request (creates a preview deployment)
- Manually trigger a deploy from the dashboard

## Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Node version**: `18` (configured in netlify.toml)

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Routes Not Working
- Check that `public/_redirects` file exists
- Verify redirect rules in `netlify.toml`

### Prerender Not Working
- Verify Prerender token in `netlify.toml`
- Check that your site URL is added in Prerender dashboard
- Test with `?_escaped_fragment_=` parameter

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- [Prerender Documentation](https://prerender.io/documentation)

