// Dynamic Footer Dates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Responsive Hamburger Navigation Menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// Directory Members Fetch and Render Engine
const url = 'data/members.json';
const container = document.getElementById('member-container');

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Could not fetch member data:", error);
        container.innerHTML = `<p class="error">Unable to load directory information at this time.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = ""; // Clear loader/previous data

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Map membership numerical level to clean string tags
        let memberLevelStr = "Member";
        if (member.membershipLevel === 2) memberLevelStr = "Silver Partner";
        if (member.membershipLevel === 3) memberLevelStr = "Gold Partner";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="200" height="150">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="membership-tag lvl-${member.membershipLevel}">${memberLevelStr}</p>
            <p class="website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;
        container.appendChild(card);
    });
}

// Layout View Grid/List Toggling Logic
const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');

gridButton.addEventListener('click', () => {
    container.classList.add('grid-layout');
    container.classList.remove('list-layout');
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    container.classList.add('list-layout');
    container.classList.remove('grid-layout');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

// Initialize Fetch Execution
getMemberData();
