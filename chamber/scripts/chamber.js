
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}


const apiKey = 'fn2-9rg3k-44je';
const lat = '43.8260';
const lon = '-111.7897';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();

            const desc = data.weather[0].description
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            document.querySelector('#current-temp').textContent = Math.round(data.main.temp);
            document.querySelector('#weather-desc').textContent = desc;
        } else {
            console.error('Weather API response error:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            const forecastContainer = document.querySelector('#forecast-container');
            forecastContainer.innerHTML = '';

            // Filter 5-day forecast for items near noon (12:00:00) to get daily readings
            const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

            dailyData.forEach(day => {
                const dateObj = new Date(day.dt * 1000);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const temp = Math.round(day.main.temp);
                const desc = day.weather[0].description;

                const forecastRow = document.createElement('p');
                forecastRow.innerHTML = `<strong>${dayName}:</strong> ${temp}°F - <em>${desc}</em>`;
                forecastContainer.appendChild(forecastRow);
            });
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Call weather functions
fetchWeather();
fetchForecast();

// ==========================================
// 3. Business Spotlights (JSON Fetch)
// ==========================================
const membersUrl = 'data/members.json'; // Adjust path if your JSON file is located elsewhere

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.members);
        }
    } catch (error) {
        console.error('Error loading business spotlights:', error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector('#spotlight-container');
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = '';

    // Filter members for Gold (level 3 or 'Gold') and Silver (level 2 or 'Silver')
    const qualifiedMembers = members.filter(member => {
        const level = member.membership || member.membershipLevel;
        return level === 'Gold' || level === 'Silver' || level === 3 || level === 2;
    });

    // Randomize order and select 2 to 3 members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedSpotlights = shuffled.slice(0, 3);

    // Build member cards
    selectedSpotlights.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        const membershipText = member.membership || (member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" class="spotlight-logo" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Level:</strong> ${membershipText}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

fetchSpotlights();

// ==========================================
// 4. Footer Last Modified Date
// ==========================================
const lastModifiedElement = document.querySelector('#lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}