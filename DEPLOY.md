# Deploying Your Portfolio & Global Views Counter

## 1. Push to Private GitHub Repo (`my-portfolio`)
Create a private repo named `my-portfolio` at https://github.com/new, then push:
```powershell
git push -u origin main
```

## 2. Deploy on Vercel
1. Go to **Vercel -> Add New Project** and import your private `8bitAnurag/my-portfolio` repo.
2. Click **Deploy** (Vite is auto-detected).

## 3. Enable Global Views Counter (Upstash Redis — Free Tier)
1. Inside your Vercel project, open the **Storage** tab -> **Create Database** -> **Upstash Redis** (Free tier).
2. Connect it to your project (Vercel automatically adds `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_*`).
3. Go to **Deployments -> Redeploy** so `/api/views` picks up the new Redis environment variables.

*(Optional: Add `VIEWS_OFFSET` in Vercel Environment Variables if you want the counter to start from a custom base number.)*
