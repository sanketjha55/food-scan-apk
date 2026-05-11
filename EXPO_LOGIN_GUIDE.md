# 🔐 Expo Account Setup - Login Guide

## 📋 What You Need

To build APK and iOS apps, you need an **Expo account** (free).

---

## ✅ Option 1: Create New Expo Account

### Step 1: Sign Up Online
1. Go to: https://expo.dev/signup
2. Enter email address
3. Create password
4. Click "Create Account"
5. Verify email (check inbox)

### Step 2: Login via Terminal
```bash
eas login
```
- Paste username/email
- Enter password
- Click "Yes" when prompted to authorize

**Done!** ✅

---

## ✅ Option 2: Use Existing Account

### If You Already Have Expo Account:
```bash
eas login
```
- Enter your email/username
- Enter password
- Authorize when prompted

**Done!** ✅

---

## 🚀 After Login - Next Steps

### Verify Login Success
```bash
eas whoami
```
Should show your email address.

### Link Your Project to Expo
```bash
cd d:\ntcc
eas init
```
- Choose "Create a new project" or "Link existing project"
- Follow prompts
- Project links to your Expo account

### Start Building
```bash
# Android APK
eas build --platform android --type apk

# iOS app  
eas build --platform ios
```

---

## 🔑 Where to Get Expo Account

**Free Account Benefits:**
- ✅ Build Android APK
- ✅ Build iOS app for TestFlight
- ✅ Cloud builds (no local build tools needed)
- ✅ Automatic code signing
- ✅ Up to 30 free builds/month

**Sign Up at:** https://expo.dev

---

## 📱 Build Pricing

| Plan | Price | Builds/Month | Features |
|------|-------|-------------|----------|
| Free | $0 | 30 | Basic builds, APK, iOS |
| Personal | $10 | Unlimited | Priority builds |
| Organization | $99 | Unlimited | Team access |

For your case: **Free plan works fine!** ✅

---

## ⏭️ You're Ready!

Next command:
```bash
eas login
# Enter your email and password
# Then proceed with building
```

