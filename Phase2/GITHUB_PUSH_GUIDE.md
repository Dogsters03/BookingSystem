# 📚 Complete Guide: Push Phase 2 to GitHub

## Your GitHub Setup

**GitHub Username**: `Dogters03`
**Repository**: `BookingSystem`
**URL**: `https://github.com/Dogters03/BookingSystem`

---

## 🔧 Complete Step-by-Step Instructions

### Step 1: Open PowerShell in Your Phase 2 Folder

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
```

### Step 2: Verify Git is Initialized

```powershell
git status
```

**Expected output:**
```
On branch main
nothing to commit, working tree clean
```

✅ If you see this, your git is ready!

---

## Step 3: Setup Your GitHub Remote URL

Your Phase 2 folder currently has NO GitHub remote. You need to add it.

### Option A: Using HTTPS (Simpler for First Time)

```powershell
git remote add origin https://github.com/Dogters03/BookingSystem.git
git remote -v
```

This should show:
```
origin  https://github.com/Dogters03/BookingSystem.git (fetch)
origin  https://github.com/Dogters03/BookingSystem.git (push)
```

### Option B: Using SSH (More Secure, If You Have SSH Keys Set Up)

```powershell
git remote add origin git@github.com:Dogters03/BookingSystem.git
git remote -v
```

---

## Step 4: Configure Git User (One-Time Setup)

```powershell
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

Or globally:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 5: Push Your Phase 2 Code to GitHub

### For HTTPS (First Time):

```powershell
git push -u origin main
```

**It will ask for your GitHub credentials:**
- Username: `Dogters03`
- Password: Use your **GitHub Personal Access Token** (NOT your password)
  
  [How to create a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### For SSH (If You Have SSH Keys):

```powershell
git push -u origin main
```

No credentials needed!

---

## 🎯 What Happens After Push

After successful push, your code will appear on GitHub at:

```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

Or directly to the app files:
```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2/app
```

---

## ✅ Verification Checklist

After pushing, verify your code is on GitHub:

1. **Open GitHub in browser**:
   ```
   https://github.com/Dogters03/BookingSystem
   ```

2. **Click on "main" branch** to see all files

3. **You should see**:
   - ✅ `BookingSystem/Phase2/app/` folder with files
   - ✅ `BookingSystem/Phase2/Dockerfile`
   - ✅ `BookingSystem/Phase2/docker-compose.yml`
   - ✅ `BookingSystem/Phase2/QUICK_START.md`
   - ✅ All other documentation files

---

## 🚨 Troubleshooting

### Problem: "Repository not found"

**Solution**: 
1. Make sure your repository is **PUBLIC** (not private)
2. Check the URL is correct: `https://github.com/Dogters03/BookingSystem.git`
3. Verify you can access it in browser

### Problem: "fatal: 'origin' does not appear to be a 'git' repository"

**Solution**: You're in the wrong folder. Make sure you're in:
```
C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2
```

### Problem: "Authentication failed" or "Permission denied"

**Solution**:
- Clear cached credentials: `git credential reject https://github.com`
- Generate new Personal Access Token on GitHub
- Try push again and enter your token when prompted

### Problem: Remote URL is wrong

**Solution**: Fix it with:
```powershell
git remote set-url origin https://github.com/Dogters03/BookingSystem.git
git remote -v  # Verify it's correct
```

---

## 📝 Step-by-Step Quick Reference

Copy and paste these commands in order:

```powershell
# 1. Navigate to Phase 2
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"

# 2. Add GitHub as remote
git remote add origin https://github.com/Dogters03/BookingSystem.git

# 3. Verify connection
git remote -v

# 4. Check status (should be clean)
git status

# 5. Push to GitHub
git push -u origin main
```

---

## 🔗 After Push - Your GitHub URL

Once successfully pushed, your Phase 2 will be at:

**Full Project**: 
```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

**For Itslearning Submission**:
```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

**Individual Files**:
- Resources HTML: `https://github.com/Dogters03/BookingSystem/blob/main/BookingSystem/Phase2/app/resources.html`
- Resources JS: `https://github.com/Dogters03/BookingSystem/blob/main/BookingSystem/Phase2/app/resources.js`
- Form JS: `https://github.com/Dogters03/BookingSystem/blob/main/BookingSystem/Phase2/app/form.js`

---

## 📤 For Itslearning Submission

Once pushed successfully, in your C1 Task answer box include:

```
GitHub Link: https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

---

## 🎉 That's It!

You now have:
1. ✅ Phase 2 code ready locally
2. ✅ Git repository initialized with commits
3. ✅ GitHub remote configured
4. ✅ Ready to push with one command: `git push -u origin main`

Just follow the **Step 5** above to push!

---

*Last updated: 2026-02-15*
