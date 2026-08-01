import { places } from '../data/places.mjs';

// Populate Discover Cards
const cardsContainer = document.querySelector('#cards-container');

if (cardsContainer) {
  places.forEach((place, index) => {
    const card = document.createElement('section');
    card.classList.add('card');
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.title}</h2>
      <figure>
        <img src="${place.photo}" alt="${place.title}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    cardsContainer.appendChild(card);
  });
}

// Visitor Message Logic via localStorage
const visitMessage = document.querySelector('#visit-message');
const msInDay = 86400000;
const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (visitMessage) {
  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentVisit - parseInt(lastVisit, 10);
    if (timeDifference < msInDay) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(timeDifference / msInDay);
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }
}

localStorage.setItem('lastVisit', currentVisit.toString());
