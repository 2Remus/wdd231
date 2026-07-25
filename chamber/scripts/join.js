document.addEventListener("DOMContentLoaded", () => {
  // Populate hidden timestamp field with ISO date string
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // Open Modals
  const modalButtons = document.querySelectorAll(".open-modal");
  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  // Close Modals
  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest("dialog").close();
    });
  });
});
