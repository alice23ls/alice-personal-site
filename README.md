# Alice Shang Xu Personal Website

This is a lightweight static personal site built from:

- `index.html`
- `styles.css`
- `Alice Shang Xu_swe_use.pdf`

## Local preview

Open the site directly in a browser:

```bash
open index.html
```

## GitHub Pages target

Current setup:

- GitHub username: `alice23ls`
- Repository name: `alice-personal-site`
- Final Pages URL: `https://alice23ls.github.io/alice-personal-site/`

Important note:

- This is a **project site**, not a root user site.
- If you want the site to live at `https://alice23ls.github.io/`, the repository name must be `alice23ls.github.io`.

## Publish steps

1. Create a new public GitHub repository named `alice-personal-site`
2. Push this folder to the repository
3. In GitHub, go to `Settings -> Pages`
4. Set `Source` to `Deploy from a branch`
5. Choose branch `main` and folder `/ (root)`
6. Save and wait a few minutes

## Suggested git commands

```bash
git init
git add .
git commit -m "feat: build personal website from resume"
git branch -M main
git remote add origin https://github.com/alice23ls/alice-personal-site.git
git push -u origin main
```

Or use the helper script after the repository exists and git is available:

```bash
./publish-site.sh
```

## Site content

The website now turns the resume into a live portfolio-style page:

- Hero section with academic profile and impact metrics
- Experience section with quantified outcomes
- Project section with technical detail
- Skills section grouped by engineering focus
- Resume PDF still available for download

## Links used on the page

- Email: `lishixu23@gmail.com`
- GitHub: `https://github.com/alice23ls`
- LinkedIn: `https://linkedin.com/in/alice-xu-154509290`
