# Netlify Deployment Instructions

This portfolio is now ready for deployment to Netlify! 🚀

## Deployment Steps:

1. **Push to GitHub**: Make sure all your changes are committed and pushed to your GitHub repository.

2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your `portfolio` repository

3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18` (set in netlify.toml)

4. **Deploy**: Click "Deploy site"

## What's Configured:

✅ **Static Export**: Next.js configured for static export (`output: 'export'`)
✅ **Optimized Images**: Images set to unoptimized for static hosting
✅ **ESLint**: Disabled during builds to prevent deployment failures
✅ **Redirects**: SPA redirects configured in netlify.toml
✅ **Metadata**: SEO metadata with proper base URL configured
✅ **Node Version**: Specified Node 18 for consistent builds

## Files Added/Modified:

- `netlify.toml` - Netlify deployment configuration
- `next.config.js` - Updated for static export and build settings
- `.eslintrc.json` - ESLint configuration
- `package.json` - Removed deprecated @next/font dependency
- `app/layout.tsx` - Added metadataBase for proper SEO

## Local Testing:

```bash
npm run build  # Test the build locally
npx serve out  # Serve the static files locally (optional)
```

Your portfolio will be available at: `https://[site-name].netlify.app`

You can customize the domain name in Netlify settings after deployment.

## Troubleshooting:

### If the professional headshot image is missing:
1. **Clear build cache**: Redeploy the site in Netlify (Site settings > Deploys > Trigger deploy)
2. **Check file paths**: Ensure `/pp.jpg` loads correctly at `https://[your-site].netlify.app/pp.jpg`
3. **File case sensitivity**: Netlify servers are case-sensitive, ensure file names match exactly
4. **Force refresh**: Clear browser cache and hard refresh (Ctrl+F5)

### If other issues occur:
- Check Netlify deploy logs for specific error messages
- Ensure all commits are pushed to GitHub before redeploying
- Verify build command and publish directory settings match the netlify.toml file
