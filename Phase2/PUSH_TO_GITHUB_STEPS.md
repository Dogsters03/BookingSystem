# 🚀 Push Phase 2 to GitHub - Visual Step-by-Step Guide

## Your Details
- **GitHub Username**: `Dogters03`
- **Repository**: `BookingSystem`
- **GitHub URL**: `https://github.com/Dogters03/BookingSystem`

---

## ⚡ Quick Command (Copy & Paste All Together)

Open PowerShell in your Phase 2 folder and run:

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
git remote add origin https://github.com/Dogters03/BookingSystem.git
git push -u origin main
```

**That's it!** Then enter your GitHub credentials when prompted.

---

## 📋 Detailed Step-by-Step

### STEP 1️⃣: Open PowerShell in Your Phase 2 Folder

Press `Win + X` and select **Windows PowerShell** (or Windows Terminal)

Then paste:
```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
```

Press Enter. You should see:
```
PS C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2>
```

✅ **You're in the right folder**

---

### STEP 2️⃣: Check Git Status

```powershell
git status
```

You should see:
```
On branch main
nothing to commit, working tree clean
```

✅ **Git is ready**

---

### STEP 3️⃣: Add GitHub Remote

```powershell
git remote add origin https://github.com/Dogters03/BookingSystem.git
```

Then verify:
```powershell
git remote -v
```

You should see:
```
origin  https://github.com/Dogters03/BookingSystem.git (fetch)
origin  https://github.com/Dogters03/BookingSystem.git (push)
```

✅ **Remote is configured**

---

### STEP 4️⃣: Push to GitHub

```powershell
git push -u origin main
```

### What Happens Next:

**First time only** - You'll be asked for credentials:
```
Username for 'https://github.com': Dogters03
Password for 'https://Dogters03@github.com': [PASTE YOUR GITHUB TOKEN]
```

⚠️ **IMPORTANT**: 
- Username: `Dogters03`
- Password: **NOT your GitHub password**, but your **Personal Access Token**

**How to get a Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo` (check all repo options)
4. Copy the token
5. Paste it when prompted (it won't show as you type)
6. Press Enter

✅ **Code pushed successfully!**

After successful push, you'll see:
```
Counting objects: 20, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
Total X (delta X), reused 0 (delta 0), pack-reused 0
To https://github.com/Dogters03/BookingSystem.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ✅ Verify on GitHub

1. Open browser: https://github.com/Dogters03/BookingSystem
2. You should now see a folder/branch called `BookingSystem/Phase2`
3. Inside you'll see:
   - `app/` folder (with resources.html, resources.js, form.js, etc.)
   - `Dockerfile`
   - `docker-compose.yml`
   - All documentation files

✅ **Phase 2 is now on GitHub!**

---

## 🔗 Your Phase 2 GitHub Link

After successful push, your Phase 2 is at:

```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

---

## 📝 For Itslearning Submission

Submit this link in your answer:
```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

---

## 🆘 Common Issues & Fixes

### ❌ "fatal: remote origin already exists"
**Fix**: Someone already added origin. Use:
```powershell
git remote set-url origin https://github.com/Dogters03/BookingSystem.git
```

### ❌ "Repository not found"
**Fixes**:
1. Check URL is exactly: `https://github.com/Dogters03/BookingSystem.git`
2. Make sure your repository is PUBLIC (not private)
3. Try again with correct credentials

### ❌ "Permission denied" or "Authentication failed"
**Fix**:
1. Go to https://github.com/settings/tokens
2. Create new Personal Access Token with `repo` scope
3. Clear cached credentials: `git credential reject https://github.com`
4. Try push again, paste new token

### ❌ "fatal: 'origin' does not appear to be a 'git' repository"
**Fix**: Make sure you're in the right folder:
```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
```

---

## 💡 Pro Tips

### After First Push - Easier Future Pushes

Next time you make changes, just do:
```powershell
git add .
git commit -m "Your commit message"
git push
```

No `-u origin main` needed!

### Create Personal Access Token Once
1. Go: https://github.com/settings/tokens
2. Create token with `repo` scope
3. Save it somewhere safe
4. Use it for all git operations

### If You Want to Use SSH (More Secure)

1. Generate SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
2. Add to GitHub: https://github.com/settings/ssh/new
3. Then change remote to: 
```powershell
git remote set-url origin git@github.com:Dogters03/BookingSystem.git
```

---

## 📊 Summary

| Step | Command | What It Does |
|------|---------|------------|
| 1 | `cd "path"` | Open Phase 2 folder |
| 2 | `git status` | Check git status |
| 3 | `git remote add origin URL` | Connect to GitHub |
| 4 | `git push -u origin main` | Push code to GitHub |

---

## ✨ You're Ready!

Execute the quick command from the top, enter your credentials, and your Phase 2 will be on GitHub!

```powershell
git push -u origin main
```

That's it! 🎉
