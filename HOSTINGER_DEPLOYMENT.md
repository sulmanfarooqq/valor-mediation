# 🚀 Valor Mediation - Hostinger Deployment Guide

**Last Updated:** April 8, 2026
**Status:** ✅ Ready for Deployment (Database-Optional Mode)

## ⚠️ Critical Issues Found & Fixed

### 1. **Error Handler Bug** ✅
- **Problem:** Error pages were showing "status is undefined"
- **Fixed in:** `middleware/errorHandler.js` & `views/error.ejs`

### 2. **Environment Configuration** ✅
- **Problem:** `.env` was set for localhost development
- **Fixed in:** `.env` - Updated for production/Hostinger

### 3. **Database Optional Now** ✅ NEW
- **Problem:** App crashed if database not configured
- **Solution:** Database now OPTIONAL - deploy first, add DB later
- **Impact:** Website works 100% without database initially
- **Files Modified:** `config/database.js`, `server.js`, `config/env.js`

---

## 🎯 Deployment Strategy (NEW - April 8, 2026)

### Phase 1: Deploy WITHOUT Database (TODAY)
Upload and run on Hostinger with NO database configured.

**What Works:**
✅ Website homepage & all pages
✅ Chatbot (100% functional)
✅ Static content, blogs, locations
✅ Contact form (displays, needs DB to save)

**What's Limited:**
⚠️ Admin panel (needs login)
⚠️ Contact submissions not saved
⚠️ Blog management

### Phase 2: Add Database Later (After Hostname is Live)
Once site is live on Hostinger, set up MySQL and enable full features.

**Steps:**
1. Go to Hostinger cPanel
2. Create MySQL database
3. SSH and run: `npm run migrate`
4. SSH and run: `node create-admin.js`
5. Update `.env` with DB credentials
6. Restart Node.js app
7. ✅ Full admin panel active

---

## 📋 Pre-Deployment Checklist

- [ ] **Review Phase 1 strategy above** (deploy WITHOUT database)
- [ ] Update `.env` with ONLY PORT and SESSION_SECRET
- [ ] Leave database variables EMPTY or commented out
- [ ] Test locally: `npm start` should run fine
- [ ] Prepare to upload files to Hostinger FTP

---

## 🔧 Configuration: Minimal .env for Initial Deployment

**Use this for PHASE 1 (without database):**

```env
# Server
PORT=3000
NODE_ENV=production
APP_NAME=Valor Mediation, LLC
APP_URL=https://yourdomain.com

# Session Secret - Change to random string!
SESSION_SECRET=generate_random_32_character_string_here_123456

# Email (optional for Phase 1)
EMAIL_FROM=noreply@yourdomain.com
```

**That's it!** Leave database variables empty or commented out.

---

## ⚡ Quick Start: Deploy Now Without Database

Follow these steps to get your site live IMMEDIATELY on Hostinger:

### Step 1: Prepare Local Files
In your project folder, create/update `.env`:

```env
PORT=3000
NODE_ENV=production
APP_NAME=Valor Mediation, LLC
APP_URL=https://yourdomain.com
SESSION_SECRET=your_random_secret_key_here_at_least_32_chars
```

**Do NOT include database variables** - leave them empty/commented.

### Step 2: Upload to Hostinger
Using their File Manager or FTP:
1. Login to Hostinger cPanel
2. Go to File Manager → `public_html/`
3. Create folder: `valor-mediation` (or your app name)
4. Upload ALL files (except `node_modules/`)
5. **DO upload:** `.env` file

### Step 3: Install Dependencies via SSH
```bash
ssh your-hostinger-account
cd public_html/valor-mediation
npm install
```

### Step 4: Create Node.js App in cPanel
1. Go to **Node.js Applications**
2. Click **Create Application**
3. Fill in:
   - **Node.js version:** 18+ 
   - **Application root:** `/public_html/valor-mediation`
   - **Application URL:** `yourdomain.com` or subdomain
   - **Startup file:** `server.js`
   - **Application mode:** Production
4. Click **Create** - wait 2-3 minutes

### Step 5: Verify It's Live! 🎉
- Visit `https://yourdomain.com`
- See homepage? ✅
- Try chatbot? ✅
- All working without database? ✅

---

## 🔧 Configuration: Full .env for After Database Setup

**Use this for PHASE 2 (with database on Hostinger):**

```env
# Server
PORT=3000
NODE_ENV=production
APP_URL=https://yourdomain.com

# DATABASE - Get from Hostinger cPanel > MySQL Databases
DB_HOST=mysql.yourdomain.com           # Your MySQL host
DB_PORT=3306
DB_USER=yourdomain_dbuser              # Your database user
DB_PASSWORD=your_secure_password       # Your database password
DB_NAME=yourdomain_dbname              # Your database name

# Session Secret - Change this to a random string!
SESSION_SECRET=your_random_string_here_at_least_32_chars_long

# Email - Use Gmail or your domain email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com

# Admin - Change these!
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_admin_password

# App Name
APP_NAME=Valor Mediation, LLC
```

### Finding Hostinger MySQL Credentials:
1. Login to **Hostinger cPanel**
2. Find **MySQL Databases** section
3. Look for:
   - Database host
   - Database name
   - Database user
   - Database password

---

## 📝 Deployment Steps

### Step 1: Get Hostinger MySQL Credentials
```
cPanel → MySQL Databases → Your Database
- DB_HOST: (Usually shows in cPanel)
- DB_NAME: (Database name you created)
- DB_USER: (Database user)
- DB_PASSWORD: (Password you set)
```

### Step 2: Update `.env` File
Edit the `.env` file in root directory with actual values

### Step 3: Upload Files to Hostinger
Using FTP/SFTP:
1. Upload all files (except `node_modules`) to `public_html/`
2. Make sure `.env` file is uploaded
3. Create `logs/` directory if needed

### Step 4: Install Dependencies via SSH
```bash
# SSH into your Hostinger account
cd public_html/your-app-folder

# Install npm packages
npm install

# Create database tables (if not auto-synced)
npm run migrate
```

### Step 5: Create Admin User
```bash
node create-admin.js
```

### Step 6: Setup Node.js Application
**In Hostinger cPanel:**
1. Go to **Node.js Applications**
2. Click **Create Application**
3. Set:
   - **Node.js version:** 18 or higher
   - **Application root:** `/public_html/your-app-folder`
   - **Application URL:** `/yourdomain.com` (or your domain)
   - **Startup file:** `server.js`
   - **Application mode:** Production
4. Click **Create**

### Step 7: Verify Deployment
- Visit: `https://yourdomain.com`
- Check error logs: Hostinger cPanel → Node.js Applications → View Logs

---

## 🐛 Troubleshooting

### "Database connection failed"
**Solution:**
- [ ] Verify credentials in `.env` match Hostinger cPanel
- [ ] Check database user has full privileges (GRANT)
- [ ] Ensure MySQL is running on Hostinger
- [ ] Try connecting with MySQL client to verify

### "Application crashes immediately"
**Solution:**
- Check Node.js logs in cPanel
- Ensure all required env vars are set in `.env`
- Make sure `node_modules/` is installed via `npm install`

### "Cannot find module"
**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Error rendering views"
**Solution:**
- [ ] Check `views/` folder is uploaded
- [ ] Verify file permissions (755 for directories, 644 for files)
- [ ] Check EJS syntax in view files

### "Port already in use"
**Solution:**
Change `PORT` in `.env` to available port (3000, 3001, 3002, etc.)

---

## 📊 Files Modified for Hostinger

**Fixed Issues:**
1. `middleware/errorHandler.js` - Added status code to error rendering
2. `views/error.ejs` - Proper error page variable handling
3. `.env` - Updated configuration for production

**These fixes prevent deployment errors and ensure proper error handling.**

---

## 🔐 Security Reminders

- ⚠️ **Never commit `.env` file to Git**
- ⚠️ **Change all default passwords**
- ⚠️ **Use strong SESSION_SECRET (32+ random characters)**
- ⚠️ **Use Gmail App Password, not regular password**
- ⚠️ **Keep database password complex**

---

## ✅ Verification After Deployment

1. **Homepage loads:** `https://yourdomain.com`
2. **Database connected:** Check cPanel MySQL
3. **Admin login works:** `https://yourdomain.com/admin/login`
4. **Contact form works:** Test from homepage
5. **Email notifications:** Send test contact form
6. **No console errors:** Check browser dev tools

---

## 📞 Support

If deployment fails:
1. Check Node.js application logs in Hostinger cPanel
2. Verify all env variables in `.env`
3. Test database connection separately
4. Check file permissions (should be readable by web server)

---

**Good luck with your deployment! 🚀**
