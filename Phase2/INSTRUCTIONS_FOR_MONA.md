# 🎯 FINAL INSTRUCTIONS FOR MONA - Push Phase 2 to GitHub

## Your GitHub Account Details
- **URL**: https://github.com/Dogters03/BookingSystem
- **Username**: `Dogters03`
- **Repository**: `BookingSystem`

---

## 🚀 DO THIS NOW (Copy & Paste)

### 1. Open PowerShell

Click Windows Start button, type `PowerShell`, click to open

### 2. Go to Your Phase 2 Folder

Copy and paste this entire command:

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
```

Press `Enter`

**Expected**: You should see the path in the prompt

### 3. Check Your Files Are There

```powershell
ls
```

Press `Enter`

**Expected**: You should see files like `app`, `Dockerfile`, `docker-compose.yml`, etc.

### 4. Add Your GitHub Repository

```powershell
git remote add origin https://github.com/Dogters03/BookingSystem.git
```

Press `Enter`

**Expected**: No output means success ✅

### 5. Verify Remote Was Added

```powershell
git remote -v
```

Press `Enter`

**Expected**: Should show:
```
origin  https://github.com/Dogters03/BookingSystem.git (fetch)
origin  https://github.com/Dogters03/BookingSystem.git (push)
```

### 6. Push Your Code to GitHub

```powershell
git push -u origin main
```

Press `Enter`

**Important**: You'll be asked for credentials:
- **Username**: Enter `Dogters03`
- **Password**: Enter your **GitHub Personal Access Token** (NOT your regular password)

If you don't have a token, get one here: https://github.com/settings/tokens
- Click "Generate new token"
- Give it access to `repo`
- Copy the token
- Paste when prompted

**Expected after push**: Message saying code was pushed successfully

---

## ✅ After Push - Verify on GitHub

1. Open browser
2. Go to: https://github.com/Dogters03/BookingSystem
3. You should see a folder structure with `BookingSystem/Phase2` containing all your files

---

## 🔗 Your Phase 2 GitHub Link

Once pushed, use this link for Itslearning submission:

```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

---

## ⚡ All Commands Together (Copy & Paste All at Once)

If you want to do it all at once, open PowerShell and paste:

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2"
git remote add origin https://github.com/Dogters03/BookingSystem.git
git push -u origin main
```

Then when prompted, enter your GitHub credentials.

---

## 🆘 If You Get an Error

### Error: "fatal: remote origin already exists"
```powershell
git remote set-url origin https://github.com/Dogters03/BookingSystem.git
git push -u origin main
```

### Error: "Repository not found"
- Check your repository is PUBLIC (not private)
- Check the URL is correct
- Try again

### Error: "Permission denied" or "Authentication failed"
- Go to https://github.com/settings/tokens
- Create a NEW Personal Access Token with `repo` scope
- Copy it
- Try push again and paste the token

---

## 📋 Checklist After Push

- [ ] No errors in PowerShell
- [ ] Can access https://github.com/Dogters03/BookingSystem in browser
- [ ] Can see `BookingSystem/Phase2` folder on GitHub
- [ ] Can see files: `app/`, `Dockerfile`, `docker-compose.yml`, etc.

---

## 📤 Submit to Itslearning

Once verified on GitHub, submit to C1 Task:

**Copy this link**:
```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystem/Phase2
```

**Also include**:
- Your screenshot of the validation working
- Brief description of what was implemented

---

## ✨ That's All You Need!

You now have:
1. ✅ Phase 2 code ready in `BookingSystem/Phase2`
2. ✅ All documentation files ready
3. ✅ Git repository initialized
4. ✅ Easy push command to upload to GitHub

**Just run the push command above and you're done!**

---

## 💡 Questions?

- **Push not working?** → Check errors above in "If You Get an Error"
- **Don't have Personal Access Token?** → Create one at https://github.com/settings/tokens
- **Wrong folder?** → Use the exact path: `C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystem\Phase2`
- **Can't see files after push?** → Wait 30 seconds and refresh GitHub page

---

**Good luck! 🎉**
