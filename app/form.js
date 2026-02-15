// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

function logSection(title, data) {
  console.group(title);
  console.log(data);
  console.groupEnd();
}

// -------------- Validation state check (from resources.js) --------------
function isFormValid() {
  // Both fields must have valid values
  const resourceName = $("resourceName")?.value?.trim() ?? "";
  const resourceDescription = $("resourceDescription")?.value?.trim() ?? "";

  // Check if both have meaningful content
  return resourceName.length > 0 && resourceDescription.length > 0;
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) {
    console.warn("resourceForm not found. Ensure the form has id=\"resourceForm\".");
    return;
  }

  form.addEventListener("submit", onSubmit);
});

async function onSubmit(event) {
  event.preventDefault();
  const submitter = event.submitter;

  // Prevent submission if form is not valid
  if (!isFormValid()) {
    console.warn("Form validation failed. Create button should be disabled.");
    return;
  }

  const actionValue = submitter && submitter.value ? submitter.value : "create";
  
  // Clean and trim all values before sending
  const payload = {
    action: actionValue,
    resourceName: ($("resourceName")?.value ?? "").trim(),
    resourceDescription: ($("resourceDescription")?.value ?? "").trim(),
    resourceAvailable: $("resourceAvailable")?.checked ?? false,
    resourcePrice: parseFloat($("resourcePrice")?.value ?? "0") || 0,
    resourcePriceUnit: document.querySelector("input[name='resourcePriceUnit']:checked")?.value ?? "hour"
  };

  logSection("Sending cleaned payload to httpbin.org/post", payload);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();

    console.group("Response from httpbin.org");
    console.log("Status:", response.status);
    console.log("URL:", data.url);
    console.log("You sent (echo):", data.json);
    console.log("Headers (echoed):", data.headers);
    console.groupEnd();

    // Show success feedback
    console.log("✅ Resource submitted successfully!");

  } catch (err) {
    console.error("POST error:", err);
  }
}
