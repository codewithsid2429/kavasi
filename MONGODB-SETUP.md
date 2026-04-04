# MONGODB CLOUD DEPLOYMENT GUIDE

To migrate your application from "Mock" local-mode into a full-scale deployed application with a working database, follow these steps to deploy MongoDB on the cloud.

## Step 1: Create your Cloud Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Click **Build a Database** and choose the **FREE M0** shared tier.
3. Select your preferred provider (AWS/Google/Azure) and the region closest to you (e.g., `Mumbai/ap-south-1`).
4. Click **Create Cluster**.

## Step 2: Configure Access Setup
1. **Security / Quickstart**: It will ask you how you'd like to authenticate. Create a Username and Password. 
   - **Important**: Save this password safely, you will need it for the connection string!
2. **Network Access**: Add your IP Address. To make it universally accessible from Vercel without configuring VPNs, you can set the IP Address to `0.0.0.0/0` (Allow Access From Anywhere).

## Step 3: Get your MONGODB_URI
1. On your Database Deployments page, click **Connect**.
2. Choose **Connect your application** (Drivers).
3. Copy the connection string. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority`
4. Replace `<password>` with the password you generated in Step 2. Add the database name you want to use before the `?` (e.g. `...mongodb.net/kavasi?retryWrites...`).

## Step 4: Import Initial Data (Optional)
If you want to boot up your database with the existing fake data:
1. Open **MongoDB Compass** (desktop app) or use the cloud Atlas UI **"Browse Collections"**.
2. Create three collections: `projects`, `teams`, and `jobs`.
3. In the Atlas UI, navigate to the `projects` collection -> Insert Document -> View as JSON (brackets) `{}`, and paste the contents from `"projects": [...]` inside `database-seed.json`. Repeat for `teams` and `jobs`.

## Step 5: Connect it to KAVASI
1. Open your project file `.env.local`
2. Change the variable: `MONGODB_URI="your-copied-connection-string-from-step-3"`
3. Restart your dev server (`npm run dev`).
4. For Vercel, paste `MONGODB_URI` exactly as-is into the **Environment Variables** deployment tab!

The system will automatically detect the valid MongoDB string, boot up Mongoose, override the fallback "Mock" system, and interact live with your Atlas cluster!
