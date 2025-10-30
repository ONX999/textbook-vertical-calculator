# Automated Workflows

This repository includes automated workflows for code review and pull request merging.

## Auto Review Workflow

The auto-review workflow (`auto-review.yml`) automatically reviews pull requests when they are opened, synchronized, or reopened.

### Features:
- Checks for large file changes (>500 lines) and adds warnings
- Adds a comment to confirm automated review completion
- Auto-approves PRs from Dependabot or PRs with the `auto-approve` label

## Auto Merge Workflow

The auto-merge workflow (`auto-merge.yml`) automatically merges pull requests when certain conditions are met.

### Conditions for Auto-Merge:
1. PR must have the `auto-merge` or `automerge` label, OR
2. PR is from Dependabot, OR
3. PR title contains `[auto-merge]`

AND all of the following:
- At least one approval (or from Dependabot)
- No changes requested in reviews
- All CI checks pass
- PR is not a draft

### Merge Method:
The workflow uses **squash merge** by default. This can be changed in the workflow file.

## How to Use

### For Auto-Review:
Pull requests will be automatically reviewed. To enable auto-approval:
- Add the `auto-approve` label to your PR, OR
- The PR is from Dependabot

### For Auto-Merge:
1. Add the `auto-merge` or `automerge` label to your PR, OR
2. Include `[auto-merge]` in the PR title
3. Ensure all checks pass
4. Get at least one approval (unless it's from Dependabot)

## CI Workflow

The CI workflow (`ci.yml`) runs basic validation checks:
- Verifies README.md exists
- Checks repository file structure

This provides a baseline set of checks that must pass before auto-merge.

## Labels

You may want to create the following labels in your repository:
- `auto-approve` - Automatically approves the PR
- `auto-merge` - Enables automatic merging when conditions are met
- `automerge` - Alternative label for automatic merging

## Security Notes

- The workflows use `GITHUB_TOKEN` with appropriate permissions
- Auto-merge requires approval unless from Dependabot
- All checks must pass before auto-merge occurs
