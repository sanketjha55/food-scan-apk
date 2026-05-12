# 🤖 AUTOMATIC DEPLOYMENT - JUST 3 COMMANDS!

## 🚀 THE EASIEST WAY

### Step 1: Get Your GitHub Token (2 minutes)

1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token" → "Generate new token (classic)"**
3. Fill:
   - Name: `Food Scanner Builder`
   - Expiration: `90 days`
4. Scroll down, check: **`repo`** (all sub-options will auto-check)
5. Click: **"Generate token"**
6. **COPY** the token (you won't see it again!)

Example token looks like:
```
ghp_abc123XYZ789defGHI456jklMNO789pqr
```

---

### Step 2: Get Your GitHub Username

Simple! Your username is in URL:
```
https://github.com/YOUR_USERNAME ← This is your username
```

---

### Step 3: RUN THIS COMMAND (5 minutes)

**Copy-paste this in PowerShell:**

```powershell
cd d:\ntcc

powershell -ExecutionPolicy Bypass -File deploy.ps1 -GitHubToken "ghp_paste_your_token_here" -GitHubUser "your_username_here"
```

**Example:**
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1 -GitHubToken "ghp_abc123XYZ789defGHI456jklMNO789pqr" -GitHubUser "sanketjha8271"
```

---

### That's It! ✅

**What happens automatically:**
- ✅ Creates GitHub repo
- ✅ Pushes your code
- ✅ GitHub Actions builds APK (15 min)
- ✅ Builds IPA (20 min)
- ✅ Creates Release with downloads

---

### Step 4: Get Your APK & IPA (20 minutes later)

**Visit:**
```
https://github.com/YOUR_USERNAME/food-scanner-app/releases
```

**Download:**
- `app-release.apk` → For Play Store
- (IPA also available for App Store)

---

## ✨ BENEFITS

```
✅ No manual git commands
✅ No CLI installation needed
✅ Automated builds on GitHub
✅ Free hosting on GitHub
✅ Automatic releases
✅ Download anywhere, anytime
```

---

## 🎯 READY?

1. Get token from: https://github.com/settings/tokens
2. Run deploy.ps1 script
3. Wait 20 minutes
4. Download APK from releases
5. Upload to Play Store
6. 🚀 LIVE!

---

## 🆘 TROUBLESHOOTING

### "Token invalid"
- Make sure you copied the ENTIRE token
- No spaces at start/end
- Token not expired

### "Repository already exists"
- That's ok! Code will still push
- Check: https://github.com/YOUR_USERNAME/food-scanner-app

### "Permission denied"
- Your token might not have `repo` scope
- Create new token with `repo` checked

### Still stuck?
- Manual option: Use Codemagic.io (even easier!)
- Visit: https://codemagic.io (sign up with GitHub)

---

**READY TO BUILD?** 🚀

**COMMAND:**
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1 -GitHubToken "YOUR_TOKEN" -GitHubUser "YOUR_USERNAME"
```
