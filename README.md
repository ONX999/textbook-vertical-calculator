# textbook-vertical-calculator

## Automated Workflows

This repository includes automated workflows for streamlined development:

### 🤖 Auto Review
- Automatically reviews pull requests when opened or updated
- Checks for large file changes
- Auto-approves Dependabot PRs or PRs with `auto-approve` label

### ✅ Auto Merge
- Automatically merges PRs when all conditions are met:
  - Has `auto-merge` or `automerge` label (or is from Dependabot)
  - At least one approval (or from Dependabot)
  - All CI checks pass
  - No changes requested
  - Not a draft PR

### 🔍 CI Checks
- Basic validation to ensure repository integrity

See [.github/workflows/README.md](.github/workflows/README.md) for detailed documentation.