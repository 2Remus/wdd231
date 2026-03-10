// 1. Fetch and Display Members
const url = 'data/members.json';
const display = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    display.innerHTML = "";
    members.forEach((member) => {
        let section = document.createElement("section");
        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="200" height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership">Level: ${member.membership}</p>`;
        display.appendChild(section);
    });
}

// 2. View Toggle Logic
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid-view");
    display.classList.remove("list-view");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list-view");
    display.classList.remove("grid-view");
});

// 3. Hamburger Menu Toggle
const menuButton = document.querySelector("#menu-toggle");
const navList = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {
    navList.classList.toggle("show");
});

// 4. Footer Dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();