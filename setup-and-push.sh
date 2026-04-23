#!/bin/bash
# Run this script inside the ecommerce-dashboard folder
# It initializes git and pushes to your GitHub repo

echo "🚀 Setting up ECommerce Dashboard..."

# Initialize git
git init
git add .
git commit -m "feat: initial commit — ECommerce Dashboard with 10 practice bugs"

# Add your remote (replace with your actual repo URL)
git remote add origin https://github.com/Aaditdot-1234/ecommerce-dashboard-practice.git

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Done! Visit your repo on GitHub."
echo "Next: Create Issues from GITHUB_ISSUES.md on your board."
