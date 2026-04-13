#!/bin/zsh

set -e

REPO_URL="https://github.com/alice23ls/alice-personal-site.git"

if ! command -v git >/dev/null 2>&1; then
  echo "git is not available yet. Please finish installing Command Line Tools first."
  exit 1
fi

if [ ! -d .git ]; then
  git init
  git branch -M main
fi

git add .

if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "feat: build personal website from resume" || true
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REPO_URL"
else
  git remote set-url origin "$REPO_URL"
fi

git push -u origin main
