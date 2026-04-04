# KAVASI Project Documentation

Welcome to the documentation for the KAVASI full-stack Next.js web application. This guide explains how to configure environment variables, deploy the application to Vercel, and edit vital administrative configuration details.

---

## 1. Environment Configurations
Your project connects to multiple backend services using the `.env.local` config.

At the root of the agency folder (`d:\agencywebsite`), you will find the `.env.local` file.
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/kavasi?retryWrites=true&w=majority"
JWT_SECRET="your-super-long-secure-random-secret"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@kavasi.com"
```

**Note on Database connection:** 
The application was built to bypass the database when the `MONGODB_URI` connection fails. It will route requests to MOCK objects (showing hardcoded portfolios, team members, etc.) if it can't establish a Mongoose connection. When you acquire your actual MongoDB URI, change it here.

---

## 2. Managing Content (Admin Panel/IDs)
The KAVASI agency website has a secure admin ecosystem to handle your content seamlessly without needing to edit the codebase.

### **How to Login:**
1. Navigate to `http://localhost:3000/admin/login` (or equivalent production domain).
2. Use the default Mock Credentials:
   - **ID/Email:** `admin@kavasi.com`
   - **Password:** `password`
3. Hit "Sign In". Since it is utilizing a fallback setup to bypass your localized database crash, this combination works globally right out of the box.

### **Navigating Admin Panel:**
Inside the dashboard:
- **Portfolio Tab:** Add new portfolio works. This propagates dynamically to `/portfolio`.
- **Team Tab:** Add team members representing KAVASI. They will instantly appear on the `/about` screen. 

*(If MongoDB goes completely active later on, these entries will properly post and save into the deployed database cluster!)*

---

## 3. How to modify the Logo
To modify the **Header and Footer Logos**:
1. Open the codebase in your editor.
2. Navigate to `src/components/layout/Navbar.tsx` and `src/components/layout/Footer.tsx`.
3. Search for the HTML comment `<!-- LOGO PLACEHOLDER -->`.
4. Replace the `<div className="w-10 h-10...">LOGO</div>` structure with an actual `<img src="/your-logo.png" />`.
5. Ensure `your-logo.png` is placed in the `public/` directory!

---

## 4. How to Deploy to Vercel (Production)
Deployment to Vercel is the most reliable method for Next.js 15 apps:

1. Create a GitHub Repo and push all files inside `d:\agencywebsite` to GitHub.
2. Sign up on [Vercel](https://vercel.com/) and click "Add New... -> Project".
3. Select your initialized GitHub Repository.
4. **Environment Variables**: Make sure to paste all key-value mappings from `.env.local` into the Vercel Environment Variables UI during setup.
5. Click **Deploy**. Vercel will install dependencies, build the application, and provide you with a live customizable URL within 60 seconds!

---

For further developer references, the Next.js and Shadcn GUI frameworks allow heavy component customization located under `src/components/ui/`.
