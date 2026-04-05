// 1. Visit Message Logic (localStorage)
const visitDisplay = document.querySelector("#visitor-message");
const msToDays = 84600000;
const lastVisit = Number(window.localStorage.getItem("lastVisit-ls")) || 0;
const today = Date.now();

if (lastVisit === 0) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = (today - lastVisit) / msToDays;

    if (daysBetween < 1) {
        visitDisplay.textContent = "Back so soon! Awesome!";
    } else {
        const roundedDays = Math.floor(daysBetween);
        const dayText = roundedDays === 1 ? "day" : "days";
        visitDisplay.textContent = `You last visited ${roundedDays} ${dayText} ago.`;
    }
}
localStorage.setItem("lastVisit-ls", today);

// 2. Fetch JSON Data and Build Cards
const url = 'data/members.json'; // Ensure this file exists with 8 members
const cards = document.querySelector('#cards-container');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    members.forEach((member, index) => {
        let card = document.createElement('section');
        card.classList.add('card');
        // Applying grid-area dynamically for the rubric requirement
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h3>${member.name}</h3>
            <figure>
                <img src="${member.image}" alt="${member.name}" 
                     loading="lazy" width="300" height="200">
            </figure>
            <p>${member.address}</p>
            <p>${member.description}</p>
            <a href="#" class="btn">Learn More</a>
        `;
        cards.appendChild(card);
    });
}

getMemberData();

// Footer Year
document.querySelector("#year").textContent = new Date().getFullYear();