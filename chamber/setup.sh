#!/bin/bash
mkdir -p scripts styles

# Append HTML content to join.html if it doesn't already contain join-form
if ! grep -q "join-form" join.html 2>/dev/null; then
cat << 'EOF' >> join.html

<!-- W04 CHAMBER JOIN FORM & MODALS -->
<main class="join-container">
  <h2>Membership Application</h2>

  <!-- FORM SECTION -->
  <form action="thankyou.html" method="get" class="join-form">
    <label>
      First Name *
      <input type="text" name="fname" id="fname" required autocomplete="given-name" title="Enter your first name">
    </label>

    <label>
      Last Name *
      <input type="text" name="lname" id="lname" required autocomplete="family-name" title="Enter your last name">
    </label>

    <label>
      Organizational Title
      <input type="text" name="title" id="title" autocomplete="organization-title" title="At least 7 letters, spaces, or hyphens" pattern="[A-Za-z\s\-]{7,}">
    </label>

    <label>
      Email Address *
      <input type="email" name="email" id="email" required autocomplete="email" placeholder="example@domain.com" title="Enter a valid email address">
    </label>

    <label>
      Mobile Phone *
      <input type="tel" name="phone" id="phone" required autocomplete="tel" title="Enter your mobile phone number">
    </label>

    <label>
      Business/Organization Name *
      <input type="text" name="organization" id="organization" required autocomplete="organization" title="Enter your business name">
    </label>

    <label>
      Membership Level *
      <select name="membership" id="membership" required title="Select a membership level">
        <option value="" disabled selected>Select Level...</option>
        <option value="np">NP Membership (Non-Profit)</option>
        <option value="bronze">Bronze Membership</option>
        <option value="silver">Silver Membership</option>
        <option value="gold">Gold Membership</option>
      </select>
    </label>

    <label>
      Business Description
      <textarea name="description" id="description" title="Briefly describe your organization"></textarea>
    </label>

    <!-- Hidden Timestamp Field -->
    <input type="hidden" name="timestamp" id="timestamp">

    <input type="submit" value="Submit Application" class="submit-btn">
  </form>

  <!-- CARDS & MODALS SECTION -->
  <section class="membership-cards">
    <h3>Membership Benefits</h3>

    <div class="card card-animate">
      <h4>NP Membership</h4>
      <p>For Non-Profit Organizations.</p>
      <button type="button" class="open-modal" data-modal="modal-np">View Benefits</button>
    </div>

    <div class="card card-animate">
      <h4>Bronze Membership</h4>
      <p>Great for small businesses.</p>
      <button type="button" class="open-modal" data-modal="modal-bronze">View Benefits</button>
    </div>

    <div class="card card-animate">
      <h4>Silver Membership</h4>
      <p>Expanded advertising & events.</p>
      <button type="button" class="open-modal" data-modal="modal-silver">View Benefits</button>
    </div>

    <div class="card card-animate">
      <h4>Gold Membership</h4>
      <p>Maximum exposure & spotlight positioning.</p>
      <button type="button" class="open-modal" data-modal="modal-gold">View Benefits</button>
    </div>

    <!-- Modals -->
    <dialog id="modal-np">
      <h3>NP Membership Benefits</h3>
      <p>No annual fee. Access to standard chamber events and networking directory.</p>
      <button class="close-modal">Close</button>
    </dialog>

    <dialog id="modal-bronze">
      <h3>Bronze Membership Benefits</h3>
      <p>Discounted event tickets, directory inclusion, and monthly newsletter promotion.</p>
      <button class="close-modal">Close</button>
    </dialog>

    <dialog id="modal-silver">
      <h3>Silver Membership Benefits</h3>
      <p>Includes Bronze benefits + 1 homepage spotlight ad and workshop discounts.</p>
      <button class="close-modal">Close</button>
    </dialog>

    <dialog id="modal-gold">
      <h3>Gold Membership Benefits</h3>
      <p>Includes Silver benefits + premium homepage spotlight, event sponsorship, and VIP access.</p>
      <button class="close-modal">Close</button>
    </dialog>
  </section>
</main>
EOF
fi

# Append JS logic to scripts/join.js safely
cat << 'EOF' >> scripts/join.js

// Appended: Hidden timestamp & Modal handler logic
document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  const modalButtons = document.querySelectorAll(".open-modal");
  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest("dialog").close();
    });
  });
});
EOF

# Append card animation & modal styling to styles/styles.css
cat << 'EOF' >> styles/styles.css

/* Appended: Card Load Animation & Dialog Styles */
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-animate {
  animation: fadeInSlide 0.8s ease-out forwards;
}

dialog {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
}
EOF

# Create thankyou.html only if it does not already exist
if [ ! -f thankyou.html ]; then
cat << 'EOF' > thankyou.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You | Application Submitted</title>
  <link rel="stylesheet" href="styles/styles.css">
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const output = document.getElementById("submission-info");

      if (output) {
        output.innerHTML = `
          <p><strong>First Name:</strong> ${params.get("fname") || "N/A"}</p>
          <p><strong>Last Name:</strong> ${params.get("lname") || "N/A"}</p>
          <p><strong>Email:</strong> ${params.get("email") || "N/A"}</p>
          <p><strong>Phone:</strong> ${params.get("phone") || "N/A"}</p>
          <p><strong>Business Name:</strong> ${params.get("organization") || "N/A"}</p>
          <p><strong>Submission Date:</strong> ${params.get("timestamp") ? new Date(params.get("timestamp")).toLocaleString() : "N/A"}</p>
        `;
      }
    });
  </script>
</head>
<body>
  <main>
    <h2>Thank You for Joining!</h2>
    <p>We have received your application. Here are the details you submitted:</p>
    <div id="submission-info"></div>
  </main>
</body>
</html>
EOF
fi

echo "Successfully appended code without overwriting existing content!"
