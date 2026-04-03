// Set Current Year
const yearSpan = document.querySelector("#current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Modal Toggle
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal();
    }
}

// Form Timestamp Logic
const timestampInput = document.querySelector("#form-timestamp");
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}