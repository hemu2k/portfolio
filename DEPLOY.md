# 🚀 GitHub Deployment Instructions

## Prerequisites
- A GitHub account
- Git installed on your machine (already done ✓)

## Step 1: Create a New GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `portfolio` (or any name you prefer)
   - **Description**: "My professional portfolio website"
   - **Visibility**: Public (required for GitHub Pages free hosting)
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 2: Push Your Code to GitHub

```bash
# Navigate to your portfolio directory
cd /Users/pavanikuncha/Downloads/hemu_interview

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify the remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

> **Note**: You may be prompted to enter your GitHub credentials. If you have 2FA enabled, you'll need to use a Personal Access Token instead of your password.

### Creating a Personal Access Token (if needed)
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Upload")
4. Select scopes: `repo` (all)
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under "Source":
   - Select **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

## Step 4: Verify Deployment

1. After a few minutes, refresh the Pages settings
2. You should see: "Your site is live at https://YOUR_USERNAME.github.io/portfolio/"
3. Click the link to view your live portfolio
4. Share this URL on your resume, LinkedIn, and email signature!

## 📝 Updating Your Portfolio

Whenever you make changes to your portfolio:

```bash
# Make your changes to the files
# Then commit and push:

git add .
git commit -m "Update: describe your changes here"
git push
```

GitHub Pages will automatically redeploy your site within 1-2 minutes.

## 🎨 Custom Domain (Optional)

If you want to use a custom domain (e.g., hemanthreddy.com):

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In GitHub Pages settings, add your custom domain
3. In your domain registrar's DNS settings, add:
   - Type: `A` records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Type: `CNAME` record: `www` → `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (up to 24 hours)

## 🚨 Troubleshooting

### Push Rejected
If you get "Updates were rejected because the remote contains work":
```bash
git pull origin main --rebase
git push -u origin main
```

### Site Not Loading
- Wait 2-3 minutes after enabling Pages
- Check that branch is set to `main` in Pages settings
- Ensure repository is Public

### 404 Error
- Verify `index.html` is in the root directory
- Check that Pages source is set to `/ (root)` not `/docs`

## ✅ Success!

Once deployed, your portfolio will be accessible worldwide at your GitHub Pages URL. Share it proudly!

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
