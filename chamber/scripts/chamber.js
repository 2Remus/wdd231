
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;


const menuButton = document.getElementById('menu-button');
const nav = document.getElementById('navigation');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.innerHTML = nav.classList.contains('open') ? '&#10006;' : '&#9776;';
});



const lat = "43.8260";
const lon = "-111.7897";
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            console.error("Weather data fetch error:", await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayWeather(data) {

    const current = data.list[0];
    document.getElementById('current-temp').textContent = Math.round(current.main.temp);
    document.getElementById('weather-desc').textContent = current.weather[0].description;


    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = "";


    const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(1, 4);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);

        const dayElement = document.createElement('p');
        dayElement.innerHTML = `<strong>${dayName}:</strong> ${temp}°F - ${day.weather[0].description}`;
        forecastContainer.appendChild(dayElement);
    });
}


const membersUrl = "data/members.json";

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error("Error fetching chamber members:", error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = "";


    const qualifiedMembers = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");


    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, Math.random() > 0.5 ? 3 : 2);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = "spotlight-card";
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.logo}" alt="${member.name} Logo" class="spotlight-logo">
            <p><strong>Membership:</strong> ${member.membershipLevel}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        container.appendChild(card);
    });
}


fetchWeather();
fetchSpotlights();
