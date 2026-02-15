# ✅ BOOKINGSYSTEMPHASE2 - COMPLETE GUIDE TO PUSH TO GITHUB

## ✨ Your Project is Ready!

Your complete BookingSystem Phase 2 project is now created at the correct location:

```
C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystemPhase2
```

---

## 📦 What's Included

✅ **app/** folder with:
- `resources.html` - Form with validation
- `resources.js` - Validation logic (MODIFIED)
- `form.js` - Data cleaning logic (MODIFIED)
- `index.html` - Home page
- `logo.svg` - Logo

✅ **Docker files**:
- `Dockerfile` - Docker container config
- `docker-compose.yml` - Run on localhost:8081

✅ **Documentation**:
- Multiple guides for setup and GitHub push
- Instructions for testing
- Submission checklist

✅ **Git**:
- Repository initialized
- 6+ commits with proper history

---

## 🚀 PUSH TO GITHUB - FOLLOW THESE STEPS

### STEP 1: Open PowerShell

Click Windows Start button, type `PowerShell`, press Enter

### STEP 2: Navigate to Your BookingSystemPhase2 Folder

Copy and paste this:

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystemPhase2"
```

Press Enter

### STEP 3: Check Your Repository Status

**Before pushing, check if your GitHub repository exists:**

Open your browser: https://github.com/Dogters03/BookingSystem

**What do you see?**
- ✅ I see the repository
- ❌ 404 Not Found
- ⚠️ It's private

---

## BASED ON WHAT YOU SAW - CHOOSE YOUR PATH

### PATH A: Repository Exists & is PUBLIC ✅

If you can see your BookingSystem repository on GitHub:

```powershell
git remote add origin https://github.com/Dogters03/BookingSystem.git
git push -u origin main
```

### PATH B: Repository Doesn't Exist ❌

If you see "404 Not Found":

1. **Go to**: https://github.com/new
2. **Repository name**: `BookingSystem`
3. **Visibility**: **PUBLIC** (important!)
4. **Click**: "Create repository"
5. **Then run PATH A commands above**

### PATH C: Repository is PRIVATE ⚠️

If it says "This repository is private":

1. **Go to**: https://github.com/Dogters03/BookingSystem/settings
2. **Find**: "Visibility" section
3. **Click**: "Change visibility"
4. **Select**: "Public"
5. **Then run PATH A commands above**

---

## STEP 4: Create Personal Access Token

When git asks for credentials, you need a Personal Access Token:

1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token"
3. **Name**: `BookingSystem`
4. **Select scope**: `repo` (check all sub-options)
5. **Click**: "Generate token"
6. **COPY the token** (you won't see it again!)

---

## STEP 5: Enter Credentials When Prompted

When running `git push`, PowerShell will ask:

```
Username for 'https://github.com': 
```
→ Type: `Dogters03`

```
Password for 'https://Dogters03@github.com': 
```
→ Paste your Personal Access Token (from STEP 4)

The password won't show as you type - this is **normal**!

---

## STEP 6: Wait for Success

You should see something like:

```
Counting objects: 20, done.
...
To https://github.com/Dogters03/BookingSystem.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Success!**

---

## STEP 7: Verify on GitHub

1. **Open browser**: https://github.com/Dogters03/BookingSystem
2. **You should see your files now!**
3. **Look for**: `BookingSystemPhase2/` folder with all your content

---

## 📤 Your GitHub Link (For Itslearning Submission)

After successful push, use this link:

```
https://github.com/Dogters03/BookingSystem/tree/main/BookingSystemPhase2
```

---

## 📝 All Commands Together (Copy & Paste)

```powershell
cd "C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittaminen jatko\BookingSystemPhase2"
git remote add origin https://github.com/Dogters03/BookingSystem.git
git push -u origin main
```

Then enter:
- Username: `Dogters03`
- Password: Your Personal Access Token

---

## ✅ Checklist Before Push

- [ ] You checked if your repository exists on GitHub
- [ ] Repository is PUBLIC (not private)
- [ ] You created a Personal Access Token
- [ ] You're in the correct folder: `BookingSystemPhase2`
- [ ] You ran: `git remote add origin https://github.com/Dogters03/BookingSystem.git`
- [ ] You ran: `git push -u origin main`
- [ ] You entered your credentials correctly

---

## 🆘 Troubleshooting

### Error: "Repository not found"
→ You skipped creating the repository (PATH B)
→ Create it at: https://github.com/new

### Error: "Permission denied"
→ Your Personal Access Token is wrong
→ Create a new one at: https://github.com/settings/tokens

### Error: "remote origin already exists"
→ Run: `git remote remove origin`
→ Then: `git remote add origin https://github.com/Dogters03/BookingSystem.git`

### Error: "fatal: 'origin' does not appear to be a 'git' repository"
→ You're in the wrong folder
→ Make sure you're in: `C:\Users\Mona\OneDrive - Centria ammattikorkeakoulu Oy\Web kehittamien jatko\BookingSystemPhase2`

---

## ✨ NEXT ACTIONS

1. **Check your GitHub**: https://github.com/Dogters03/BookingSystem (does it exist?)
2. **Run the push commands** (from STEP 2 & 3 above based on your PATH)
3. **Enter your credentials** (username + Personal Access Token)
4. **Verify on GitHub** that your files are there
5. **Submit to Itslearning** with the GitHub link

---

## 📸 For Itslearning Submission

Include in your C1 Task answer:

1. **Screenshot** showing:
   - Browser with http://localhost:8081/resources.html (validation working)
   - Form with green/red fields
   - Docker running

2. **GitHub link**:
   ```
   https://github.com/Dogters03/BookingSystem/tree/main/BookingSystemPhase2
   ```

---

**You're all set! Good luck! 🚀**
