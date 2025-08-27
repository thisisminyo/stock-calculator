# 🌐 External Access Guide

## Access Your Stock Calculator from Outside Your Local Network

Here are several ways to share your dev server with others or access it from different devices:

---

## 🏠 **Option 1: Local Network Access** (Same WiFi/Network)

### **Step 1: Start dev server with network access**
```bash
# Stop current server (Ctrl+C)
# Then run:
pnpm run dev:network
```

### **Step 2: Find your local IP address**
```bash
# On Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# On Windows:
ipconfig | findstr "IPv4"
```

### **Step 3: Access from other devices**
- Your server will show: `ready - started server on 0.0.0.0:3000`
- Access from other devices on same network: `http://YOUR_LOCAL_IP:3000`
- Example: `http://192.168.1.100:3000`

**✅ Pros:** Fast, secure, no third-party services
**❌ Cons:** Only works on same WiFi network

---

## 🌍 **Option 2: ngrok Tunneling** (Internet Access)

### **Install ngrok**
```bash
# Install via Homebrew (Mac):
brew install ngrok

# Or download from: https://ngrok.com/download
```

### **Setup & Run**
```bash
# 1. Start your dev server (normal way)
pnpm run dev

# 2. In another terminal, create tunnel:
ngrok http 3000
```

### **Access Your App**
ngrok will give you URLs like:
- `https://abc123.ngrok.io` (HTTPS - secure)
- `http://abc123.ngrok.io` (HTTP)

**✅ Pros:** Works anywhere in the world, HTTPS support
**❌ Cons:** Free version has limits, URLs change each restart

---

## 🚀 **Option 3: Deploy to Vercel** (Permanent Hosting)

### **Deploy with one command**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time will ask for setup)
vercel

# Follow prompts, choose your settings
```

### **Automatic Deployment**
- Push to GitHub → Auto-deploy to Vercel
- Get permanent URL like: `https://stock-calc-yourname.vercel.app`
- Free tier includes HTTPS, CDN, custom domains

**✅ Pros:** Permanent URL, fast CDN, free tier
**❌ Cons:** Need to redeploy for changes (can set up auto-deploy)

---

## 🛠 **Option 4: Other Tunneling Services**

### **localtunnel** (Free alternative to ngrok)
```bash
# Install
npm install -g localtunnel

# Start your dev server
pnpm run dev

# Create tunnel
lt --port 3000 --subdomain mystockcalc
```

### **serveo** (No installation needed)
```bash
# Start your dev server
pnpm run dev

# Create tunnel
ssh -R 80:localhost:3000 serveo.net
```

---

## ⚠️ **Security Considerations**

### **Development Server Warning:**
- Dev servers are NOT production-ready
- Don't expose sensitive data
- Use HTTPS tunnels when possible

### **API Key Security:**
- Your `.env.local` file should be secure
- Never commit API keys to git
- Consider environment-specific keys

### **For Production:**
- Deploy to proper hosting (Vercel, Netlify, etc.)
- Use production builds (`pnpm run build`)
- Set up proper security headers

---

## 🎯 **Quick Start Commands**

```bash
# Option 1: Local network access
pnpm run dev:network

# Option 2: ngrok tunnel (in separate terminal)
ngrok http 3000

# Option 3: Deploy to Vercel
vercel

# Option 4: localtunnel
lt --port 3000
```

---

## 📱 **Testing on Mobile Devices**

1. **Use Option 1** for same WiFi testing
2. **Use Option 2** for remote mobile testing
3. **Access your external URL** on mobile browsers
4. **Test touch interactions** and responsive design

---

**Recommended:** Start with **Option 1** for local testing, then use **Option 2 (ngrok)** for sharing with others, and **Option 3 (Vercel)** for permanent hosting!
