# Prerender Integration Setup

This project has been configured to work with Prerender.io for SEO optimization of your React SPA.

## Configuration Completed

1. **Meta Tag Added** (`public/index.html`)
   - Added Prerender token meta tag: `<meta name="prerender-token" content="63GIOd8cXk4djS1KyRyD" />`

2. **Firebase Headers** (`firebase.json`)
   - Added `X-Prerender-Token` header with your token
   - Configured cache headers for optimal performance

3. **Robots.txt Updated** (`public/robots.txt`)
   - Added explicit allow rule for Prerender bot

## Prerender Token

Your Prerender token: `63GIOd8cXk4djS1KyRyD`

## Netlify Hosting (Recommended) ✅

**Files Created:**
- `netlify.toml` - Complete Netlify configuration with Prerender integration
- `public/_redirects` - Prerender redirects hack + SPA routing redirects for Netlify

**Deployment Steps:**

1. **Push to Git Repository:**
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)
   - Netlify will auto-detect the settings from `netlify.toml`

3. **Build Settings (Auto-detected):**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18`

4. **Configure Prerender Dashboard:**
   - Log in to your Prerender.io account
   - Add your Netlify URL (e.g., `https://your-site.netlify.app` or your custom domain)
   - The token is already configured in `netlify.toml`

5. **Deploy:**
   - Netlify will automatically deploy on every push to your main branch
   - Or trigger a manual deploy from the Netlify dashboard

6. **Verify Integration:**
   - After deploying, test by adding `?_escaped_fragment_=` to any URL
   - Or use Prerender's test tool in their dashboard

**Netlify Features Configured:**
- ✅ Prerender redirects hack (proxies Prerender crawler to Prerender service)
- ✅ SPA routing (all routes redirect to index.html)
- ✅ Prerender token header (`X-Prerender-Token` in netlify.toml)
- ✅ Cache control for static assets
- ✅ Automatic builds on Git push

**Important:** 
- The `_redirects` file uses `durkinpizza.netlify.app` as the domain
- If your Netlify site has a different URL, update line 2 in `public/_redirects`
- Replace `durkinpizza.netlify.app` with your actual Netlify domain

## Firebase Hosting (Alternative)

1. **Configure Prerender Dashboard:**
   - Log in to your Prerender.io account
   - Add your Firebase hosting URL (e.g., `https://durkin-pizza.web.app` or your custom domain)
   - The token is already configured in your site

2. **Verify Integration:**
   - After deploying, test by adding `?_escaped_fragment_=` to any URL
   - Or use Prerender's test tool in their dashboard

3. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## How It Works

- Prerender.io will automatically detect the meta tag in your HTML
- When search engines or crawlers request your pages, Prerender will serve pre-rendered HTML
- The token authenticates requests between Prerender and your site

## Environment Variables (Optional)

If you need to use the token in your React code, create a `.env` file:
```
REACT_APP_PRERENDER_TOKEN=63GIOd8cXk4djS1KyRyD
```

Note: The token is already hardcoded in `firebase.json` and `index.html` for Firebase Hosting, so this is optional.

## Express Server Integration (Option 4) ✅

**Files Created:**
- `server.js` - Express server with Prerender middleware configured

**Setup Steps:**

1. **Install dependencies:**
   ```bash
   npm install prerender-node express
   ```

2. **Build your React app:**
   ```bash
   npm run build
   ```

3. **Start the server:**
   ```bash
   npm run server
   ```
   Or use the production script that builds and starts:
   ```bash
   npm run server:prod
   ```

4. **The server will:**
   - Run on port 3000 (or PORT environment variable)
   - Automatically detect crawlers and serve prerendered content
   - Serve your React app for regular users

**How it works:**
- The `prerender-node` middleware is placed BEFORE your static file serving
- It automatically detects crawler user agents and `_escaped_fragment_` query parameters
- Crawlers get prerendered HTML, regular users get your React app

## Nginx Reverse Proxy Integration (Option 5) ✅

**Files Created:**
- `nginx.conf` - Complete Nginx configuration with Prerender integration

**Setup Steps:**

1. **Copy the configuration:**
   - The `nginx.conf` file is ready to use
   - Replace `example.com` with your actual domain
   - Replace `http://127.0.0.1:3000` with your app's upstream server

2. **Install the config:**
   ```bash
   # Copy to your Nginx sites-available directory
   sudo cp nginx.conf /etc/nginx/sites-available/your-site
   
   # Create symlink to sites-enabled
   sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
   
   # Test configuration
   sudo nginx -t
   
   # Reload Nginx
   sudo systemctl reload nginx
   ```

3. **Configuration Details:**
   - Detects crawlers via user agent matching
   - Detects `_escaped_fragment_` query parameter
   - Routes crawler requests to Prerender service
   - Routes regular users to your Express app
   - Includes proper proxy headers and caching

**User Agents Detected:**
- Googlebot, Bingbot, Baiduspider
- Facebook, Twitter, LinkedIn bots
- And many more (see `nginx.conf` for full list)

