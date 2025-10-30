# Vertical Stepwise Calculator

Simple static web app that shows vertical, stepwise arithmetic and long-division with SVG export and PNG generation.

## Features
- Vertical step-by-step UI for calculations
- Long-division SVG generator with step array
- Client-side SVG -> high-res PNG export
- Git LFS support for large assets
- GitHub Actions workflows for Pages deployment and release asset creation

## Local dev
1. Install deps: `npm ci`
2. Start dev server: `npm run dev`
3. Build: `npm run build`

## Deploy
Use `scripts/init-and-deploy.ps1` to initialize a repo, enable LFS if needed, add files and push to remote. Edit variables in the script before running.

## License
MIT