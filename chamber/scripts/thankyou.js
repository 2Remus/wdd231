
const resultsElement = document.querySelector('#results');
const urlParams = new URLSearchParams(window.location.search);

function displayResults() {
    if (urlParams.size === 0) {
        resultsElement.innerHTML = "<p>No form data found.</p>";
        return;
    }

    // Create a list of the submitted data
    resultsElement.innerHTML = `
        <p><strong>Name:</strong> ${urlParams.get('firstname')} ${urlParams.get('lastname')}</p>
        <p><strong>Email:</strong> ${urlParams.get('email')}</p>
        <p><strong>Phone:</strong> ${urlParams.get('phone')}</p>
        <p><strong>Organization:</strong> ${urlParams.get('organization')}</p>
        <p><strong>Membership Level:</strong> ${urlParams.get('level').toUpperCase()}</p>
        <p><strong>Submitted on:</strong> ${new Date(urlParams.get('timestamp')).toLocaleString()}</p>
    `;
}

displayResults();