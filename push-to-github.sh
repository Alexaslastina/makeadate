#!/bin/bash
# Helper script to push to GitHub
# You will need to provide authentication when running this

echo "🚀 Pushing changes to GitHub..."
echo ""
echo "You will be prompted for your GitHub credentials:"
echo "  Username: Alexaslastina"
echo "  Password: Use a Personal Access Token (PAT)"
echo ""
echo "Create a PAT at: https://github.com/settings/tokens"
echo "Required scopes: repo (full control)"
echo ""

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🔗 View workflows: https://github.com/Alexaslastina/makeadate/actions"
    echo "🌐 Live site (after deploy): https://alexaslastina.github.io/makeadate/"
    echo ""
    echo "Next steps:"
    echo "1. Enable GitHub Pages in repository settings"
    echo "2. Monitor the deployment workflow"
    echo "3. Visit your live site!"
else
    echo ""
    echo "❌ Push failed. Please check your credentials."
    echo ""
    echo "Troubleshooting:"
    echo "- Ensure you're using a Personal Access Token, not your password"
    echo "- Check token has 'repo' scope"
    echo "- Verify repository URL: $(git remote get-url origin)"
fi

