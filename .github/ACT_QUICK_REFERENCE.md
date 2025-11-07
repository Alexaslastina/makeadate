# Act Quick Reference Guide

## What is Act?

Act allows you to run GitHub Actions locally using Docker. It's useful for testing workflows before pushing to GitHub.

## Installation Status

✅ Act is installed at: `/usr/local/bin/act`  
✅ Version: 0.2.82  
✅ Docker is configured and running

## Common Commands

### List All Workflows
```bash
act --list
```

### Run Workflows

#### Dry Run (no execution, just validation)
```bash
# Test deploy workflow
act -W .github/workflows/deploy.yml -n

# Test CI workflow
act -W .github/workflows/ci.yml -n

# Test PR check workflow
act -W .github/workflows/pr-check.yml -n
```

#### Run Specific Job
```bash
# Run build job from deploy workflow
act -W .github/workflows/deploy.yml --job build

# Run build-and-test from CI workflow
act -W .github/workflows/ci.yml --job build-and-test

# Run validate job from PR check
act -W .github/workflows/pr-check.yml --job validate
```

#### Run with Event Trigger
```bash
# Simulate push event
act push

# Simulate pull request event
act pull_request

# Simulate workflow_dispatch
act workflow_dispatch
```

### Debugging

#### Verbose Output
```bash
act -W .github/workflows/deploy.yml -v
```

#### Very Verbose Output
```bash
act -W .github/workflows/deploy.yml -vv
```

#### Use Specific Docker Platform
```bash
act --platform ubuntu-latest=catthehacker/ubuntu:act-latest
```

### Working with Secrets

#### Create a secrets file (.secrets)
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
NPM_TOKEN=npm_xxxxxxxxxxxxx
```

#### Run with secrets
```bash
act --secret-file .secrets
```

#### Pass individual secret
```bash
act --secret GITHUB_TOKEN=xxx
```

### Working with Environment Variables

```bash
# Set environment variable
act --env NODE_ENV=production

# Use env file
act --env-file .env.local
```

## Configuration

Act configuration is stored in: `~/.config/act/actrc`

Current configuration:
```
-P ubuntu-latest=catthehacker/ubuntu:act-latest
```

### Image Sizes

- **Micro** (<200MB): Basic Node.js only
- **Medium** (~500MB): Most common tools (currently used)
- **Large** (~17GB): Full GitHub-hosted runner replica

## Workflow-Specific Notes

### Deploy to GitHub Pages
- Will fail at "Setup Pages" step locally (requires GitHub authentication)
- This is expected and normal
- Use dry run (`-n`) to validate structure

### CI Workflow
- Tests with multiple Node versions (18.x, 20.x)
- Matrix jobs run in parallel
- Can be fully tested locally

### PR Check Workflow
- Validates builds and TypeScript
- Cannot post actual PR comments locally
- Can be fully tested locally (except PR commenting)

## Troubleshooting

### Docker Not Running
```bash
sudo service docker start
```

### Permission Issues
```bash
sudo usermod -aG docker $USER
# Then log out and back in
```

### Clean Up Docker Resources
```bash
# Remove act containers
docker ps -a | grep act | awk '{print $1}' | xargs docker rm

# Remove act volumes
docker volume ls | grep act | awk '{print $2}' | xargs docker volume rm
```

### Update Act
```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

## Best Practices

1. **Always dry run first** to validate workflow structure
2. **Use verbose mode** (`-v`) when debugging
3. **Don't commit secrets** to `.secrets` file (add to `.gitignore`)
4. **Test locally** before pushing workflow changes
5. **Remember** some features (like GitHub API calls) won't work locally

## Limitations

❌ GitHub API authentication  
❌ Real artifact uploads to GitHub  
❌ Real PR comments  
❌ GitHub-hosted secrets  
❌ Some GitHub-specific contexts  

✅ Workflow syntax validation  
✅ Job execution order  
✅ Step execution  
✅ Local artifact testing  
✅ Environment variables  
✅ Docker-based actions  

## Resources

- [Act GitHub Repository](https://github.com/nektos/act)
- [Act Documentation](https://nektosact.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated:** November 7, 2025

