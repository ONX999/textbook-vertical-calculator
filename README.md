# Vertical Stepwise Calculator

Simple static web app that shows vertical, stepwise arithmetic and long-division with SVG export and PNG generation.

## Features
- Vertical step-by-step UI for calculations
- Long-division SVG generator with step array
- Client-side SVG -> high-res PNG export
- Git LFS support for large assets
- GitHub Actions workflows for Pages deployment and release asset creation
- Automatic PR approval for trusted bots (dependabot, copilot-swe-agent)

## Local dev
1. No installation needed - the project has zero dependencies
2. Start dev server: `npm run dev` (uses npx to run http-server)
3. Build: `npm run build`

Note: `npm run dev` uses `npx` which will automatically download and run http-server without requiring installation.

## Deploy
Use `scripts/init-and-deploy.ps1` to initialize a repo, enable LFS if needed, add files and push to remote. Edit variables in the script before running.

## GitHub Actions Workflows
The repository includes the following automated workflows:
- **deploy-pages.yml**: Automatically deploys to GitHub Pages on push to main branch
- **release-assets.yml**: Creates releases with assets when a version tag is pushed
- **auto-approve.yml**: Automatically approves pull requests from trusted bots (dependabot, copilot-swe-agent)

## License
MIT