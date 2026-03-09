// --- NAVIGATION LOGIC ---
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
        menuToggle.innerHTML = navList.classList.contains('show') ? '&times;' : '&#9776;';
    });
}

// --- DATE LOGIC ---
const yearSpan = document.getElementById('currentyear');
const lastModPara = document.getElementById('lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModPara) lastModPara.textContent = `Last Modified: ${document.lastModified}`;

// --- COURSE DATA ---
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to programming logic and structures.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Learning the basics of HTML and CSS.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on functional programming concepts.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to JavaScript and DOM manipulation.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Advanced frontend techniques and frameworks.',
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Object-oriented programming concepts.',
        completed: false
    }
];

// --- DYNAMIC RENDERING ---
const courseContainer = document.getElementById('course-container');
const creditsSummary = document.getElementById('credits-summary');

function displayCourses(filter = 'all') {
    // Clear current display
    courseContainer.innerHTML = '';

    // Filter array
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.subject.toLowerCase() === filter.toLowerCase());

    // Generate HTML for each course
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        card.innerHTML = `${course.subject} ${course.number}`;
        courseContainer.appendChild(card);
    });

    // Update total credits using reduce
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsSummary.textContent = `Total Credits: ${total}`;
}

// Event Listeners for Buttons
document.getElementById('all').addEventListener('click', () => displayCourses('all'));
document.getElementById('cse').addEventListener('click', () => displayCourses('cse'));
document.getElementById('wdd').addEventListener('click', () => displayCourses('wdd'));

// Initial Load
displayCourses();