# TetherLabs Website - Deployment Guide

## 🚀 Local Development

### Option 1: Python Server (Currently Running)
```bash
# Start local server
python3 -m http.server 3000

# Access website at:
http://localhost:3000
```

### Option 2: Node.js Server (if Node.js is installed)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access website at:
http://localhost:3000
```

### Option 3: PHP Server (if PHP is installed)
```bash
# Start PHP server
php -S localhost:3000

# Access website at:
http://localhost:3000
```

## 🌐 Vercel Deployment

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: For version control
3. **Vercel CLI** (optional): `npm i -g vercel`

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TetherLabs website"
   git branch -M main
   git remote add origin https://github.com/yourusername/tetherlabs-agency.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a static site
   - Click "Deploy"

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy!

### Method 3: Direct Upload

1. **Zip the project**:
   ```bash
   zip -r tetherlabs-website.zip . -x "*.git*" "node_modules/*"
   ```

2. **Upload to Vercel**:
   - Go to Vercel dashboard
   - Click "New Project"
   - Drag and drop the zip file
   - Deploy!

## ⚙️ Vercel Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "version": 2,
  "name": "tetherlabs-agency",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 🔧 Environment Variables (if needed)

If you need environment variables later:

1. **In Vercel Dashboard**:
   - Go to Project Settings
   - Click "Environment Variables"
   - Add your variables

2. **In vercel.json**:
   ```json
   {
     "env": {
       "CONTACT_EMAIL": "info@tetherlabs.net"
     }
   }
   ```

## 📱 Custom Domain Setup

1. **Add Domain in Vercel**:
   - Go to Project Settings
   - Click "Domains"
   - Add your domain (e.g., tetherlabs.net)

2. **Update DNS**:
   - Add CNAME record pointing to your Vercel deployment
   - Or use Vercel's nameservers

## 🚀 Performance Optimization

### Already Included:
- ✅ Optimized CSS and JavaScript
- ✅ Responsive images
- ✅ Minified assets
- ✅ Fast loading times

### Additional Optimizations (Optional):
- Add image optimization
- Implement service worker for caching
- Add analytics (Google Analytics, etc.)

## 📊 Analytics Setup

### Google Analytics:
1. Add tracking code to `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Vercel Analytics:
1. Install: `npm i @vercel/analytics`
2. Add to `index.html`:
   ```html
   <script>
     import { inject } from '@vercel/analytics';
     inject();
   </script>
   ```

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Automatic HTTPS certificates
- Global CDN distribution

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **TetherLabs Email**: info@tetherlabs.net

---

**Your website is now ready for production deployment! 🎉**
