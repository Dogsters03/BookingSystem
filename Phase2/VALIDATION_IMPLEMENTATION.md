# Booking System Phase 2 - Form Validation Implementation

## Overview
This is the completed Booking System Phase 2 with enhanced CSR (Client-Side Rendering) form validation for the Resources form.

## Features Implemented

### 1. Real-Time Form Validation
The Resources form now validates input in real-time as the user types:

- **Resource Name Field**
  - Length: 5-30 characters (required)
  - Allowed characters: letters (a-z, A-Z), numbers (0-9), spaces, and Finnish characters (ä, ö, å, Ä, Ö, Å)
  - Visual state: Green border + green background when valid, Red border + red background when invalid, Neutral when empty

- **Resource Description Field**
  - Length: 10-500 characters (required)
  - Allowed characters: letters, numbers, spaces, commas, periods, and Finnish characters
  - Visual state: Same green/red validation feedback as resource name

### 2. Submit Button Control
- The **Create button** is **disabled by default**
- It becomes **enabled only when BOTH fields contain valid values**
- Button shows visual disabled state (opacity-50, cursor-not-allowed) when validation fails
- Prevents submission of invalid data

### 3. Server-Side Data Handling
- All string values are **trimmed** before sending to the server
- Invalid payloads are **never sent** (prevented by button disable + form validation check)
- Price and availability values are properly parsed and cleaned
- Server receives meaningful, validated data only

### 4. Visual Feedback
- **Valid fields**: Green border (`border-green-500`) + light green background (`bg-green-100`)
- **Invalid fields**: Red border (`border-red-500`) + light red background (`bg-red-100`)
- **Empty fields**: Neutral styling (default black/10 border)
- Real-time updates as user types

## Files Modified

### `resources.js`
- Added validation functions: `isResourceNameValid()`, `isResourceDescriptionValid()`
- Added visual state management: `setInputVisualState()`
- Added real-time validation listeners: `attachResourceNameValidation()`, `attachResourceDescriptionValidation()`
- Created centralized button state controller: `updateCreateButtonState()`
- Tracks validation state in `validationState` object

### `form.js`
- Added `isFormValid()` function to check overall form validity
- Enhanced `onSubmit()` to trim all values before sending
- Properly handles checkbox (`resourceAvailable`) and radio button (`resourcePriceUnit`) values
- Prevents form submission if validation fails
- Sends clean, meaningful data to the server

### `resources.html`
- No changes to HTML structure (only validation logic changed)
- Form maintains all required fields and UI elements

## How to Run

### Using Docker Compose (Recommended)
```bash
cd BookingSystem/Phase2
docker compose up -d --build
```
The application will be available at: **http://localhost:8081**

### Without Docker
Simply open the `resources.html` file in a web browser (ensure you have a local server or use Live Server).

## Testing the Validation

1. **Open** http://localhost:8081/resources.html
2. **Try these scenarios**:
   - Leave fields empty → Create button stays disabled, fields neutral
   - Type 4 characters in name → Red validation, Create disabled
   - Type 5+ valid characters → Green validation
   - Short description (< 10 chars) → Red, Create disabled
   - Full description (10+) → Green, Create enabled
   - Mix invalid characters → Red
   - Spaces only → Treated as empty (neutral)
3. **Submit with valid data** → Check console (F12) for cleaned payload
4. **Watch the button state** change in real-time

## Validation Rules Summary

| Field | Min Length | Max Length | Allowed Characters |
|-------|-----------|-----------|-------------------|
| Resource Name | 5 | 30 | a-z, A-Z, 0-9, space, ä, ö, å, Ä, Ö, Å |
| Description | 10 | 500 | a-z, A-Z, 0-9, space, comma, period, Finnish chars |

## Browser Console
Open the browser console (F12 → Console tab) to see:
- Validation state changes
- Cleaned payload being sent
- Server response from httpbin.org
- Error messages if validation fails

## Technologies
- **Frontend**: HTML, JavaScript (Vanilla), Tailwind CSS
- **Server**: Nginx (Alpine Linux)
- **Containerization**: Docker + Docker Compose
- **Validation**: Client-side JavaScript (real-time)

## Notes
- The form prevents invalid submissions at the UI level (disabled button)
- Backend validation can still be added for defense-in-depth
- All string trimming happens before data is sent
- The solution is accessible and provides clear visual feedback

---
Assisted by: cagent
