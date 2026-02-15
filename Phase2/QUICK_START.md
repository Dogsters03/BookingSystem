# 🚀 Quick Start Guide - Booking System Phase 2

## For Screenshot Submission

### 1. Verify Docker is Running
The application is already running! Check status:
```bash
docker ps
```

Expected output:
```
NAMES                         STATUS              PORTS
booking-system-phase2-web-1   Up About a minute   0.0.0.0:8081->80/tcp
```

### 2. Open Browser
Navigate to: **http://localhost:8081/resources.html**

### 3. Test the Form Validation

**Try This To Show Validation Works:**

#### Test Case 1: Invalid Fields (Red)
1. Type "abc" in Resource Name field (less than 5 chars)
2. Leave Description empty
3. ✅ Observe: Red borders on both fields
4. ✅ Observe: Create button is **disabled** (gray, not clickable)

#### Test Case 2: Valid Fields (Green)
1. Clear the form (or refresh page)
2. Type "Meeting Room A" in Resource Name
3. Type "A comfortable room with projector for team meetings" in Description
4. ✅ Observe: Green borders on both fields
5. ✅ Observe: Create button is **enabled** (pink/red, clickable)

#### Test Case 3: Real-Time Validation
1. Type in Resource Name slowly to see it go from Red → Green
2. Type in Description and watch validation update in real-time
3. Delete characters and watch it go back to Red if invalid

### 4. Take Screenshot

**Required for submission:** Show
- ✅ Browser address bar showing `http://localhost:8081/`
- ✅ Resources form visible
- ✅ Validation working (ideally with green or red field indicators)
- ✅ Docker running (visible in taskbar/background or include terminal showing `docker ps`)

**Suggestion:** Take screenshot showing:
- Green valid fields with enabled Create button, OR
- Red invalid fields with disabled Create button

### 5. Open Browser Console (Optional but Good)
Press `F12` or `Right-Click → Inspect → Console`
- Type something in the form
- Watch real-time validation logs
- Click Create with valid data
- See the cleaned payload being sent to server
- See success confirmation

### 6. Verify Project Structure

Files are located at:
```
BookingSystem/Phase2/
├── app/
│   ├── resources.html  ✅ (form UI - unchanged)
│   ├── resources.js    ✅ (MODIFIED - validation logic)
│   ├── form.js         ✅ (MODIFIED - form submission)
│   ├── index.html      ✅ (unchanged)
│   └── logo.svg        ✅ (unchanged)
├── docker-compose.yml  (unchanged)
├── Dockerfile          (unchanged)
└── COMPLETION_SUMMARY.md (documentation)
```

---

## If You Need to Restart Docker

```bash
# Stop the current container
docker compose down

# Start it again
cd BookingSystem/Phase2
docker compose up -d --build

# Wait a few seconds, then open browser
```

---

## Validation Rules (For Reference)

**Resource Name:**
- ✅ Valid: "Meeting Room A", "konferenssi", "Huone 1", "room-123" ❌ (hyphen not allowed)
- ❌ Invalid: "abc" (too short), "Meeting Room with very long name that exceeds limit" (too long)
- Must be 5-30 characters, letters + numbers + Finnish chars + spaces only

**Description:**
- ✅ Valid: "A comfortable meeting room with projector", "Kokoushuone. Kapasiteetti 10 henkeä"
- ❌ Invalid: "short" (too short), "description with @ symbols" ❌ (special chars not allowed)
- Must be 10-500 characters, letters + numbers + spaces + comma + period

---

## For Your Submission (Itslearning)

1. **Screenshot**: Save a screenshot showing the validation working
   - Include browser window with Resources form
   - Include Docker evidence (taskbar, terminal, or `docker ps` output visible)

2. **GitHub Link**: 
   - Push entire `BookingSystem/Phase2` folder to your GitHub
   - Submit link to: `https://github.com/YOUR_USERNAME/YOUR_REPO/tree/main/BookingSystem/Phase2`

3. **Include in Answer Box**:
   - Screenshot file
   - GitHub repository link
   - Brief description of what was implemented (see COMPLETION_SUMMARY.md)

---

## What Happens When You Submit Valid Data

1. All values are **trimmed** (spaces removed)
2. Form validation passes
3. Cleaned payload is sent to httpbin.org/post (echo service)
4. Browser console shows success message and server response
5. ✅ "Resource submitted successfully!"

---

## Key Features Implemented

✅ Real-time form validation
✅ Visual feedback (green = valid, red = invalid)
✅ Create button control (disabled/enabled based on validation)
✅ Data cleaning (trimmed values)
✅ Prevents invalid submission
✅ Browser console shows validation progress
✅ Docker environment ready to demonstrate

---

**Everything is ready! Just take a screenshot and submit. You've got this! 🎉**

---

*Questions? Check COMPLETION_SUMMARY.md or VALIDATION_IMPLEMENTATION.md for detailed documentation.*
