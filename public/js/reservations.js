// ===============================
// 0) Authorization
// ===============================

import { initAuthUI, getTokenPayload, getUserRole, requireAuthOrBlockPage, logout } from "./auth-ui.js";
initAuthUI();
if (!requireAuthOrBlockPage()) {
  throw new Error("Authentication required");
}

window.logout = logout;

// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("reservationActions");
const resourceSelect = document.getElementById("resourceId");
const userIdInput = document.getElementById("userId");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const noteInput = document.getElementById("note");
const statusSelect = document.getElementById("status");
const reservationIdInput = document.getElementById("reservationId");
const reservationListEl = document.getElementById("reservationList");
const refreshListBtn = document.getElementById("refreshListBtn");

let createButton = null;
let updateButton = null;
let deleteButton = null;
let clearButton = null;
let primaryActionButton = null;
let formMode = "create";
let reservationsCache = [];
let resourcesCache = [];
let selectedReservationId = null;
let originalState = null;
let allFieldsValid = true;

const BUTTON_BASE_CLASSES =
  "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";

const BUTTON_ENABLED_CLASSES =
  "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

const BUTTON_DISABLED_CLASSES =
  "cursor-not-allowed opacity-50";

// ===============================
// 2) Payload and Form Helpers
// ===============================

function getPayloadFromForm() {
  return {
    resourceId: resourceSelect?.value ?? "",
    userId: userIdInput?.value ?? "",
    startTime: startTimeInput?.value ?? "",
    endTime: endTimeInput?.value ?? "",
    note: noteInput?.value ?? "",
    status: statusSelect?.value ?? "active",
  };
}

function validateFormData(payload) {
  // Check required fields
  if (!payload.resourceId || !payload.userId || !payload.startTime || !payload.endTime) {
    return { valid: false, message: "Please fill in all required fields." };
  }

  const resourceId = Number(payload.resourceId);
  const userId = Number(payload.userId);

  if (isNaN(resourceId) || isNaN(userId)) {
    return { valid: false, message: "Resource ID and User ID must be valid numbers." };
  }

  const startTime = new Date(payload.startTime);
  const endTime = new Date(payload.endTime);

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return { valid: false, message: "Start time and end time must be valid dates." };
  }

  if (endTime <= startTime) {
    return { valid: false, message: "End time must be after start time." };
  }

  return { valid: true };
}

function convertDatetimeLocalToISO(dateTimeLocalStr) {
  // HTML datetime-local format: "2026-03-06T10:00"
  // We need to convert it to ISO 8601: "2026-03-06T10:00:00Z"
  if (!dateTimeLocalStr) return "";
  return dateTimeLocalStr + ":00Z";
}

// ===============================
// 3) Button Management
// ===============================

function addButton({ label, type = "button", value, classes = "" }) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = label;
  btn.name = "action";
  if (value) btn.value = value;

  btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();

  actions.appendChild(btn);
  return btn;
}

function setButtonEnabled(btn, enabled) {
  if (!btn) return;

  btn.disabled = !enabled;
  btn.classList.toggle("cursor-not-allowed", !enabled);
  btn.classList.toggle("opacity-50", !enabled);

  if (!enabled) {
    btn.classList.remove("hover:bg-brand-dark/80");
  } else {
    if (btn.value === "create" || btn.textContent === "Create") {
      btn.classList.add("hover:bg-brand-dark/80");
    }
  }
}

function renderActionButtons() {
  actions.innerHTML = "";

  if (formMode === "create") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      value: "create",
      classes: BUTTON_ENABLED_CLASSES,
    });

    clearButton = addButton({
      label: "Clear",
      type: "button",
      classes: BUTTON_ENABLED_CLASSES,
    });

    setButtonEnabled(createButton, false);
    primaryActionButton = createButton;
    setButtonEnabled(clearButton, true);
    clearButton.addEventListener("click", () => {
      clearReservationForm();
      clearFormMessage();
    });
  }

  if (formMode === "edit") {
    updateButton = addButton({
      label: "Update",
      type: "submit",
      value: "update",
      classes: BUTTON_ENABLED_CLASSES,
    });

    deleteButton = addButton({
      label: "Delete",
      type: "submit",
      value: "delete",
      classes: BUTTON_ENABLED_CLASSES,
    });
    setButtonEnabled(updateButton, false);
    primaryActionButton = updateButton;
    setButtonEnabled(deleteButton, true);
  }
}

// ===============================
// 4) Form Validation and UI
// ===============================

function attachValidationListeners() {
  const validate = () => {
    const payload = getPayloadFromForm();
    const validation = validateFormData(payload);
    allFieldsValid = validation.valid;
    refreshPrimaryButtonState();
  };

  resourceSelect?.addEventListener("change", validate);
  userIdInput?.addEventListener("input", validate);
  startTimeInput?.addEventListener("change", validate);
  endTimeInput?.addEventListener("change", validate);
  noteInput?.addEventListener("input", validate);
  statusSelect?.addEventListener("change", validate);
}

function refreshPrimaryButtonState() {
  if (!primaryActionButton) return;

  if (formMode === "create") {
    setButtonEnabled(primaryActionButton, allFieldsValid);
  } else if (formMode === "edit") {
    // Allow update if form is valid (user can re-save even without changes)
    setButtonEnabled(primaryActionButton, allFieldsValid);
  }
}

function clearReservationForm() {
  reservationIdInput.value = "";
  resourceSelect.value = "";
  userIdInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  noteInput.value = "";
  statusSelect.value = "active";
  allFieldsValid = false;
  formMode = "create";
  renderActionButtons();
  refreshPrimaryButtonState();
}

function clearFormMessage() {
  const formMsg = document.getElementById("formMessage");
  if (!formMsg) return;
  formMsg.textContent = "";
  formMsg.classList.add("hidden");
}

function showFormMessage(type, message) {
  const el = document.getElementById("formMessage");
  if (!el) return;

  el.className = "mt-6 rounded-2xl border px-4 py-3 text-sm whitespace-pre-line";
  el.classList.remove("hidden");

  if (type === "success") {
    el.classList.add("border-emerald-200", "bg-emerald-50", "text-emerald-900");
  } else if (type === "info") {
    el.classList.add("border-amber-200", "bg-amber-50", "text-amber-900");
  } else {
    el.classList.add("border-rose-200", "bg-rose-50", "text-rose-900");
  }

  el.textContent = message;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ===============================
// 5) Resource List Rendering
// ===============================

async function loadResources() {
  try {
    const res = await fetch("/api/resources");
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Failed to load resources:", res.status, body);
      resourcesCache = [];
      return;
    }

    resourcesCache = Array.isArray(body.data) ? body.data : [];
    
    // Update resource dropdown
    const currentValue = resourceSelect.value;
    resourceSelect.innerHTML = '<option value="">-- Select a resource --</option>';
    
    resourcesCache.forEach(resource => {
      const option = document.createElement("option");
      option.value = resource.id;
      option.textContent = resource.name || `Resource ${resource.id}`;
      resourceSelect.appendChild(option);
    });
    
    // Restore selection if it still exists
    if (currentValue) {
      resourceSelect.value = currentValue;
    }
  } catch (err) {
    console.error("Failed to load resources:", err);
    resourcesCache = [];
  }
}

// ===============================
// 6) Reservation List Rendering
// ===============================

function renderReservationList(reservations) {
  if (!reservationListEl) return;
  
  if (reservations.length === 0) {
    reservationListEl.innerHTML = '<p class="text-sm text-black/50">No reservations yet. Create one to get started!</p>';
    return;
  }

  reservationListEl.innerHTML = reservations
    .map((r) => {
      const startDate = new Date(r.start_time).toLocaleString();
      const resourceName = r.resource_name || `Resource ${r.resource_id}`;
      return `
        <button
          type="button"
          data-reservation-id="${r.id}"
          class="w-full text-left rounded-2xl border border-black/10 bg-white px-4 py-3 transition hover:bg-black/5"
          title="Select reservation"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="font-semibold truncate">${resourceName}</div>
              <div class="text-xs text-black/50 mt-1">${startDate}</div>
            </div>
            <span class="text-xs px-2 py-1 rounded-full ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
              ${r.status || 'active'}
            </span>
          </div>
        </button>
      `;
    })
    .join("");

  // Wire selection clicks
  reservationListEl.querySelectorAll("[data-reservation-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearFormMessage();
      const id = Number(btn.dataset.reservationId);
      const reservation = reservationsCache.find((x) => Number(x.id) === id);
      if (!reservation) return;
      selectReservation(reservation);
    });
  });
}

async function loadReservations() {
  try {
    const res = await fetch("/api/reservations");
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Failed to load reservations:", res.status, body);
      renderReservationList([]);
      return;
    }

    reservationsCache = Array.isArray(body.data) ? body.data : [];
    renderReservationList(reservationsCache);

    // Keep selection if it still exists
    const idNow = reservationIdInput?.value ? Number(reservationIdInput.value) : null;
    if (idNow) {
      const found = reservationsCache.find((x) => Number(x.id) === idNow);
      if (found) selectReservation(found);
    }
  } catch (err) {
    console.error("Failed to load reservations:", err);
    renderReservationList([]);
  }
}

function selectReservation(reservation) {
  originalState = reservation;
  selectedReservationId = Number(reservation.id);
  reservationIdInput.value = String(reservation.id);

  resourceSelect.value = reservation.resource_id;
  userIdInput.value = reservation.user_id;
  
  // Convert ISO 8601 back to datetime-local format
  // ISO format: "2026-03-06T10:00:00Z"
  // datetime-local format: "2026-03-06T10:00"
  const startDateObj = new Date(reservation.start_time);
  const endDateObj = new Date(reservation.end_time);
  
  const startStr = startDateObj.toISOString().slice(0, 16);
  const endStr = endDateObj.toISOString().slice(0, 16);
  
  startTimeInput.value = startStr;
  endTimeInput.value = endStr;
  noteInput.value = reservation.note || "";
  statusSelect.value = reservation.status || "active";

  // Switch to edit mode
  formMode = "edit";
  renderActionButtons();
  highlightSelectedReservation(reservation.id);
  allFieldsValid = true;
  refreshPrimaryButtonState();
}

function highlightSelectedReservation(id) {
  if (!reservationListEl) return;
  const items = reservationListEl.querySelectorAll("[data-reservation-id]");
  items.forEach((el) => {
    const thisId = Number(el.dataset.reservationId);
    const isSelected = id && thisId === Number(id);
    el.classList.toggle("ring-2", isSelected);
    el.classList.toggle("ring-brand-blue/40", isSelected);
    el.classList.toggle("bg-brand-blue/5", isSelected);
  });
}

// ===============================
// 7) Form Submission
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  if (form) {
    form.addEventListener("submit", onReservationFormSubmit);
  }

  if (refreshListBtn) {
    refreshListBtn.addEventListener("click", loadReservations);
  }
});

async function onReservationFormSubmit(event) {
  event.preventDefault();
  const submitter = event.submitter;
  const actionValue = submitter?.value || "create";

  const payload = getPayloadFromForm();

  try {
    clearFormMessage();

    // Validate
    const validation = validateFormData(payload);
    if (!validation.valid) {
      showFormMessage("error", validation.message);
      return;
    }

    // Prepare request
    let method = "POST";
    let url = "/api/reservations";
    let body = null;

    // Convert datetime-local to ISO 8601
    const startTimeISO = convertDatetimeLocalToISO(payload.startTime);
    const endTimeISO = convertDatetimeLocalToISO(payload.endTime);

    const requestPayload = {
      resourceId: Number(payload.resourceId),
      userId: Number(payload.userId),
      startTime: startTimeISO,
      endTime: endTimeISO,
      note: payload.note || null,
      status: payload.status || "active",
    };

    if (actionValue === "create") {
      method = "POST";
      url = "/api/reservations";
      body = JSON.stringify(requestPayload);
    } else if (actionValue === "update") {
      if (!payload.resourceId) {
        showFormMessage("error", "Update failed: missing reservation ID.");
        return;
      }
      method = "PUT";
      url = `/api/reservations/${reservationIdInput.value}`;
      body = JSON.stringify(requestPayload);
    } else if (actionValue === "delete") {
      if (!reservationIdInput.value) {
        showFormMessage("error", "Delete failed: missing reservation ID.");
        return;
      }
      method = "DELETE";
      url = `/api/reservations/${reservationIdInput.value}`;
      body = null;
    }

    const response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body,
    });

    const responseBody = response.status === 204 ? null : await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 400) {
        showFormMessage("error", responseBody?.error || "Validation failed. Check your input.");
        return;
      }

      if (response.status === 404) {
        showFormMessage("error", "Not found. The reservation may have been deleted. Refresh the list and try again.");
        return;
      }

      if (response.status === 500) {
        showFormMessage("error", responseBody?.error || "Server error. Please try again.");
        return;
      }

      showFormMessage("error", `Server error (${response.status}): ${responseBody?.error || "Unknown error"}`);
      return;
    }

    // Success
    if (actionValue === "delete") {
      showFormMessage("success", "👍 Reservation successfully deleted! 🥳");
    } else if (actionValue === "create") {
      showFormMessage("success", "👍 Reservation successfully created! 🥳");
    } else if (actionValue === "update") {
      showFormMessage("success", "👍 Reservation successfully updated! 🥳");
    }

    // Reset form and reload
    if (actionValue === "delete" || actionValue === "create") {
      clearReservationForm();
    }
    
    await loadReservations();
    renderActionButtons();

  } catch (err) {
    console.error("Fetch error:", err);
    showFormMessage("error", "Network error: Could not reach the server. Check your environment and try again.");
  }
}

// ===============================
// 8) Auto-fill user ID from token
// ===============================

function autofillUserIdFromToken() {
  const payload = getTokenPayload();
  if (payload && payload.id && userIdInput) {
    userIdInput.value = payload.id;
    // Make it read-only so they can't change it easily
    userIdInput.readOnly = true;
  }
}

// ===============================
// 9) Initialization
// ===============================

async function init() {
  // Set user ID from token
  autofillUserIdFromToken();
  
  // Load resources and populate dropdown
  await loadResources();
  
  // Load reservations and show in list
  await loadReservations();
  
  // Attach validation listeners
  attachValidationListeners();
  
  // Render buttons for create mode
  renderActionButtons();
  refreshPrimaryButtonState();
}

// Run on page load
init();