# Act - Local GitHub Actions Testing Guide

## Overview
`act` allows you to test GitHub Actions workflows locally using Docker containers before pushing to GitHub.

## Installation Check
```bash
act --version
```

## Available Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
Continuous Integration workflow with quality checks, tests, builds, and security audits.

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
Deployment workflow for GitHub Pages.

## Common Commands

### List All Available Jobs
```bash
act --list
# or
act -l
```

### Dry Run (See What Would Execute)
```bash
# Dry run for CI workflow
act push -W .github/workflows/ci.yml -n

# Dry run for Deploy workflow
act push -W .github/workflows/deploy.yml -n
```

### Run Specific Workflow
```bash
# Run CI workflow on push event
act push -W .github/workflows/ci.yml

# Run Deploy workflow on push event
act push -W .github/workflows/deploy.yml

# Run Deploy workflow with workflow_dispatch event
act workflow_dispatch -W .github/workflows/deploy.yml
```

### Run Specific Job
```bash
# Run only the Code Quality job
act push -W .github/workflows/ci.yml -j quality

# Run only the Unit Tests job
act push -W .github/workflows/ci.yml -j test

# Run only the Build job
act push -W .github/workflows/ci.yml -j build

# Run only the Security Audit job
act push -W .github/workflows/ci.yml -j security
```

### Run with Specific Branch
```bash
# Simulate push to main branch
act push -W .github/workflows/ci.yml --ref main

# Simulate push to develop branch
act push -W .github/workflows/ci.yml --ref develop
```

### Verbose Output
```bash
# Run with verbose output
act push -W .github/workflows/ci.yml -v

# Run with extra verbose output
act push -W .github/workflows/ci.yml -vv
```

### Using Secrets
```bash
# Create a .secrets file with your secrets
echo "MY_SECRET=my_value" > .secrets

# Run with secrets file
act push -W .github/workflows/ci.yml --secret-file .secrets

# Or pass secrets directly
act push -W .github/workflows/ci.yml -s MY_SECRET=my_value
```

### Using Environment Variables
```bash
# Pass environment variables
act push -W .github/workflows/ci.yml --env NODE_ENV=production
```

## Testing Specific Scenarios

### Test CI Pipeline Before Commit
```bash
# Run full CI pipeline
act push -W .github/workflows/ci.yml
```

### Test Only Code Quality
```bash
# Quick code quality check
act push -W .github/workflows/ci.yml -j quality
```

### Test Build Process
```bash
# Test build without running tests
act push -W .github/workflows/ci.yml -j build
```

### Test with Different Node Versions
The test and build jobs use matrix strategy, so they'll automatically test with Node 18.x and 20.x.

## Workflow Jobs Available

### CI Workflow Jobs:
- **quality** (🧹 Code Quality) - ESLint and TypeScript checks
- **test** (🧪 Unit Tests) - Runs tests with Node 18.x and 20.x
- **build** (🏗️ Build Applications) - Builds frontend and API
- **security** (🔒 Security Audit) - npm audit and security checks

### Deploy Workflow Jobs:
- **build** (🏗️ Build for Production) - Production build
- **deploy** (🚀 Deploy to Pages) - Deploys to GitHub Pages

## Advanced Usage

### Run with Different Runner Image
```bash
# Use specific Ubuntu image
act -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

### Skip Pulling Docker Images
```bash
# Skip pulling images (faster subsequent runs)
act push -W .github/workflows/ci.yml --pull=false
```

### Container Architecture
```bash
# Run on specific platform
act push -W .github/workflows/ci.yml --container-architecture linux/amd64
```

### Reuse Previous Container
```bash
# Reuse container from previous run
act push -W .github/workflows/ci.yml --reuse
```

## Tips & Best Practices

1. **Start with Dry Run**: Always do a dry run first to see what will execute
   ```bash
   act push -W .github/workflows/ci.yml -n
   ```

2. **Test Individual Jobs**: Test specific jobs before running the full workflow
   ```bash
   act push -W .github/workflows/ci.yml -j quality
   ```

3. **Use Verbose Mode**: For debugging, use verbose output
   ```bash
   act push -W .github/workflows/ci.yml -v
   ```

4. **Check Specific Events**: Test different trigger events
   ```bash
   act push -W .github/workflows/ci.yml
   act pull_request -W .github/workflows/ci.yml
   act workflow_dispatch -W .github/workflows/deploy.yml
   ```

5. **Cache Benefits**: Subsequent runs are faster due to Docker layer caching and npm cache

## Troubleshooting

### Issue: "Could not find any stages to run"
**Solution**: Specify the workflow file and event:
```bash
act push -W .github/workflows/ci.yml
```

### Issue: Docker permission denied
**Solution**: Make sure your user is in the docker group:
```bash
sudo usermod -aG docker $USER
# Then log out and log back in
```

### Issue: Workflow fails on specific action
**Solution**: Use verbose mode to see detailed logs:
```bash
act push -W .github/workflows/ci.yml -vv
```

### Issue: Out of disk space
**Solution**: Clean up Docker images and containers:
```bash
docker system prune -a
```

## Example Workflows

### Quick Pre-Commit Check
```bash
# Run quality checks and tests
act push -W .github/workflows/ci.yml -j quality
act push -W .github/workflows/ci.yml -j test
```

### Full Integration Test
```bash
# Run entire CI pipeline
act push -W .github/workflows/ci.yml
```

### Test Deployment Build
```bash
# Test production build
act push -W .github/workflows/deploy.yml -j build
```

## Resources

- **act Documentation**: https://github.com/nektos/act
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Workflow Files**: `.github/workflows/`

## Notes

- Some GitHub Actions features may not work exactly the same in act (e.g., upload-artifact, deploy-pages)
- act uses Docker containers to simulate GitHub's runners
- Matrix jobs will run sequentially in act (vs parallel in GitHub)
- Environment variables and secrets need to be explicitly passed to act



