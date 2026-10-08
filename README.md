# 🍔 FoodDash — EC2 Deployment Guide

Complete step-by-step guide to deploy FoodDash on AWS EC2.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1 — Launch EC2 Instance](#step-1--launch-ec2-instance)
3. [Step 2 — Connect to EC2](#step-2--connect-to-ec2)
4. [Step 3 — Install Required Software](#step-3--install-required-software)
5. [Step 4 — Clone the Project](#step-4--clone-the-project)
6. [Step 5 — Configure Nginx](#step-5--configure-nginx)
7. [Step 6 — Set Up SSL (HTTPS)](#step-6--set-up-ssl-https)
8. [Step 7 — Configure Security Groups](#step-7--configure-security-groups)
9. [Step 8 — Set Up Domain (Optional)](#step-8--set-up-domain-optional)
10. [Step 9 — Auto-Start on Reboot](#step-9--auto-start-on-reboot)
11. [Verify Deployment](#verify-deployment)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ An **AWS account** (free tier works)
- ✅ A **key pair (.pem file)** downloaded from AWS
- ✅ The GitHub repo: `https://github.com/g2rindian2005-cyber/food-APP`
- ✅ Git installed on your local machine
- ✅ A terminal (PowerShell / CMD / PuTTY on Windows)

---

## Step 1 — Launch EC2 Instance

### 1.1 Go to EC2 Console

1. Log in to **https://console.aws.amazon.com**
2. Search for **EC2** in the top search bar
3. Click **EC2** → Click **Launch Instance**

### 1.2 Configure the Instance

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `fooddash-server` |
| **AMI (OS)** | Ubuntu Server 22.04 LTS (Free tier eligible) |
| **Architecture** | 64-bit (x86) |
| **Instance Type** | `t2.micro` (Free tier — 1 vCPU, 1GB RAM) |
| **Key pair** | Create new → Name: `fooddash-key` → Download `.pem` |
| **Storage** | 8 GB gp2 (default is fine) |

### 1.3 Configure Security Group

Click **Edit** next to Security Group and add these rules:

| Type | Protocol | Port | Source | Why |
|------|----------|------|--------|-----|
| SSH | TCP | 22 | My IP | Remote access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web traffic |

### 1.4 Launch

- Click **Launch Instance**
- Wait ~2 minutes for status to show **Running** ✅
- Note down your **Public IPv4 address** (e.g., `13.234.56.78`)

---

## Step 2 — Connect to EC2

### On Windows (Using PowerShell or CMD)

#### 2.1 Fix key file permissions

```powershell
# Open PowerShell as Administrator
# Navigate to where your .pem file is saved
cd C:\Users\LENOVO\Downloads

# Fix permissions (Windows)
icacls "fooddash-key.pem" /inheritance:r /grant:r "%USERNAME%:R"
```

#### 2.2 Connect via SSH

```powershell
ssh -i "fooddash-key.pem" ubuntu@YOUR_PUBLIC_IP
```

Replace `YOUR_PUBLIC_IP` with your EC2 IP address.

**Example:**
```powershell
ssh -i "fooddash-key.pem" ubuntu@13.234.56.78
```

#### 2.3 Accept the fingerprint

When asked:
```
Are you sure you want to continue connecting (yes/no)?
```
Type `yes` and press Enter.

You should now see:
```
ubuntu@ip-172-31-XX-XX:~$
```
✅ You are now inside your EC2 server!

---

## Step 3 — Install Required Software

Run these commands **one by one** inside your EC2 terminal:

### 3.1 Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

> ⏳ This takes 1–2 minutes. Wait for it to finish.

### 3.2 Install Git

```bash
sudo apt install git -y
```

Verify:
```bash
git --version
# Should show: git version 2.x.x
```

### 3.3 Install Nginx (Web Server)

```bash
sudo apt install nginx -y
```

Verify Nginx is running:
```bash
sudo systemctl status nginx
```

You should see `Active: active (running)` in green ✅

### 3.4 Start Nginx and enable on boot

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.5 Test Nginx is working

Open your browser and go to:
```
http://YOUR_PUBLIC_IP
```

You should see the **Nginx Welcome Page** ✅

---

## Step 4 — Clone the Project

### 4.1 Navigate to web root

```bash
cd /var/www
```

### 4.2 Clone your GitHub repository

```bash
sudo git clone https://github.com/g2rindian2005-cyber/food-APP.git
```

> ⏳ Wait for cloning to finish.

### 4.3 Verify files are there

```bash
ls /var/www/food-APP
```

You should see:
```
index.html  README.md  css/  js/  data/  pages/  assets/
```

### 4.4 Set correct file permissions

```bash
sudo chown -R www-data:www-data /var/www/food-APP
sudo chmod -R 755 /var/www/food-APP
```

---

## Step 5 — Configure Nginx

### 5.1 Create Nginx config for FoodDash

```bash
sudo nano /etc/nginx/sites-available/fooddash
```

### 5.2 Paste this configuration

Copy and paste the entire block below:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name YOUR_PUBLIC_IP;

    root /var/www/food-APP;
    index index.html;

    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
    gzip_min_length 256;

    # Error pages
    error_page 404 /index.html;
}
```

> **Replace `YOUR_PUBLIC_IP`** with your actual EC2 public IP.

### 5.3 Save and exit

- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

### 5.4 Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/fooddash /etc/nginx/sites-enabled/
```

### 5.5 Remove default Nginx config

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 5.6 Test the Nginx config for errors

```bash
sudo nginx -t
```

You should see:
```
nginx: configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

✅ No errors!

### 5.7 Reload Nginx

```bash
sudo systemctl reload nginx
```

### 5.8 Test your site

Open your browser:
```
http://YOUR_PUBLIC_IP
```

🎉 **FoodDash should be live!**

---

## Step 6 — Set Up SSL (HTTPS)

> Skip this step if you don't have a domain name. You can still access via HTTP.

### 6.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Get free SSL certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Replace `yourdomain.com` with your actual domain.

Follow the prompts:
- Enter your email address
- Agree to Terms of Service → type `A` + Enter
- Choose whether to share email → type `N` + Enter
- Certbot will automatically configure HTTPS ✅

### 6.3 Auto-renew SSL (it expires every 90 days)

```bash
sudo certbot renew --dry-run
```

This tests the auto-renewal. Certbot sets up a cron job automatically.

---

## Step 7 — Configure Security Groups

Go back to **AWS Console → EC2 → Security Groups** and verify these rules:

### Inbound Rules

| Type | Protocol | Port Range | Source |
|------|----------|------------|--------|
| SSH | TCP | 22 | My IP only |
| HTTP | TCP | 80 | 0.0.0.0/0, ::/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0, ::/0 |

### How to add/edit rules

1. Go to EC2 → **Security Groups**
2. Click your security group
3. Click **Edit inbound rules**
4. Add missing rules
5. Click **Save rules**

---

## Step 8 — Set Up Domain (Optional)

If you have a custom domain (e.g., `fooddash.com`):

### 8.1 Go to your domain registrar (GoDaddy / Namecheap / Route 53)

### 8.2 Add DNS records

| Type | Name | Value |
|------|------|-------|
| A | @ | YOUR_EC2_PUBLIC_IP |
| A | www | YOUR_EC2_PUBLIC_IP |

### 8.3 Wait for DNS propagation

DNS changes take **5–30 minutes** to spread globally.

### 8.4 Update Nginx config

```bash
sudo nano /etc/nginx/sites-available/fooddash
```

Change `server_name` line:
```nginx
server_name fooddash.com www.fooddash.com;
```

Reload Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 8.5 Get SSL for your domain

```bash
sudo certbot --nginx -d fooddash.com -d www.fooddash.com
```

---

## Step 9 — Auto-Start on Reboot

Make sure Nginx starts automatically if your server reboots:

```bash
sudo systemctl enable nginx
```

Verify:
```bash
sudo systemctl is-enabled nginx
# Output: enabled ✅
```

---

## Verify Deployment

Run all these checks to confirm everything works:

### ✅ Check 1 — Nginx is running
```bash
sudo systemctl status nginx
```
Expected: `Active: active (running)`

### ✅ Check 2 — Files are in place
```bash
ls -la /var/www/food-APP/
```
Expected: See `index.html`, `css/`, `js/`, `pages/`, etc.

### ✅ Check 3 — Site responds
```bash
curl -I http://YOUR_PUBLIC_IP
```
Expected: `HTTP/1.1 200 OK`

### ✅ Check 4 — Open in browser
```
http://YOUR_PUBLIC_IP
```
Expected: FoodDash homepage loads ✅

### ✅ Check 5 — Test all pages
| Page | URL |
|------|-----|
| Home | `http://YOUR_IP/index.html` |
| Menu | `http://YOUR_IP/pages/menu.html` |
| Login | `http://YOUR_IP/pages/login.html` |
| Cart | `http://YOUR_IP/pages/cart.html` |
| Tracking | `http://YOUR_IP/pages/tracking.html` |
| Orders | `http://YOUR_IP/pages/orders.html` |
| Admin | `http://YOUR_IP/pages/admin.html` |
| Statistics | `http://YOUR_IP/pages/statistics.html` |
| Restaurant | `http://YOUR_IP/pages/restaurant-dashboard.html` |
| Delivery | `http://YOUR_IP/pages/delivery-dashboard.html` |

---

## Update the Site (After Code Changes)

Whenever you push new code to GitHub, pull it on the server:

```bash
cd /var/www/food-APP
sudo git pull origin main
sudo systemctl reload nginx
```

---

## Troubleshooting

### ❌ Cannot connect via SSH
- Check your `.pem` file permissions
- Verify port 22 is open in Security Group
- Make sure you're using the correct public IP

```bash
# Check if SSH is allowed
ssh -v -i "fooddash-key.pem" ubuntu@YOUR_IP
```

### ❌ Browser shows "This site can't be reached"
- Check Security Group — port 80 must be open to `0.0.0.0/0`
- Check Nginx is running: `sudo systemctl status nginx`
- Check for firewall issues: `sudo ufw status`

### ❌ 403 Forbidden error
File permissions issue. Run:
```bash
sudo chown -R www-data:www-data /var/www/food-APP
sudo chmod -R 755 /var/www/food-APP
```

### ❌ 404 Not Found
Wrong Nginx root. Check config:
```bash
cat /etc/nginx/sites-available/fooddash
```
Make sure `root` points to `/var/www/food-APP`

### ❌ Nginx fails to start
Check error logs:
```bash
sudo nginx -t
sudo journalctl -u nginx --no-pager -n 20
```

### ❌ Blank/broken page
Check browser console (F12) for errors. Usually a missing CSS/JS file.
Verify all files exist:
```bash
ls /var/www/food-APP/css/
ls /var/www/food-APP/js/
ls /var/www/food-APP/pages/
```

---

## Quick Reference — All Commands

```bash
# Connect to server
ssh -i "fooddash-key.pem" ubuntu@YOUR_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Git + Nginx
sudo apt install git nginx -y

# Clone project
cd /var/www
sudo git clone https://github.com/g2rindian2005-cyber/food-APP.git

# Set permissions
sudo chown -R www-data:www-data /var/www/food-APP
sudo chmod -R 755 /var/www/food-APP

# Create Nginx config
sudo nano /etc/nginx/sites-available/fooddash

# Enable site
sudo ln -s /etc/nginx/sites-available/fooddash /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx

# Pull updates from GitHub
cd /var/www/food-APP && sudo git pull origin main

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log
```

---

## 🎉 Your FoodDash is Live!

Once deployed, your app is accessible at:
- **HTTP:** `http://YOUR_EC2_PUBLIC_IP`
- **HTTPS:** `https://yourdomain.com` (if domain configured)

**Estimated cost:** ~$0/month on AWS Free Tier (first 12 months)

---

## 📁 Project Structure

```
food-APP/
├── index.html                      ← Homepage
├── css/
│   ├── style.css                   ← Global styles
│   └── home.css                    ← Homepage styles
├── js/
│   ├── app.js                      ← Cart, Auth, Toast, Search
│   └── home.js                     ← Homepage logic
├── data/
│   └── restaurants.js              ← Restaurant & menu data
└── pages/
    ├── login.html                  ← Login / Register
    ├── menu.html                   ← Browse & order
    ├── cart.html                   ← Cart & checkout
    ├── tracking.html               ← Real-time tracking
    ├── orders.html                 ← Order history
    ├── statistics.html             ← Platform statistics
    ├── admin.html                  ← Admin panel
    ├── restaurant-dashboard.html   ← Restaurant portal
    └── delivery-dashboard.html     ← Rider portal
```

---

Made with ❤️ | Deployed on AWS EC2 | FoodDash 2026
