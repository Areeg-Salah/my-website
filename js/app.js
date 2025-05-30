// Get all sections and navigation container
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navLinks = {};

// Build the navigation menu dynamically
sections.forEach(section => {
  const sectionID = section.id;
  const sectionName = section.dataset.nav;

  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${sectionID}`;
  link.textContent = sectionName;
  link.classList.add('menu__link');

  // Add smooth scroll behavior
  link.addEventListener('click', e => {
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
  });

  listItem.appendChild(link);
  navList.appendChild(listItem);
  navLinks[sectionID] = link;
});

// Highlight the active section and nav link based on scroll position
function setActiveSection() {
  let closestSection = null;
  let minDistance = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance && rect.top < window.innerHeight) {
      minDistance = distance;
      closestSection = section;
    }
  });

  sections.forEach(section => {
    const link = navLinks[section.id];
    if (section === closestSection) {
      section.classList.add('active');
      link.classList.add('active-link');
    } else {
      section.classList.remove('active');
      link.classList.remove('active-link');
    }
  });
}

// Initialize active section highlighting
window.addEventListener('scroll', setActiveSection);
setActiveSection();

// Handle comment form submission
const commentForm = document.getElementById('commentForm');
const errorMsg = document.getElementById('errorMsg');
const commentsList = document.getElementById('commentsList');

/**
 * Validates form input and appends a comment to the DOM
 */
commentForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = commentForm.name.value.trim();
  const email = commentForm.email.value.trim();
  const comment = commentForm.comment.value.trim();

  // Validate input
  if (!name || !email || !comment) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }
  if (!email.includes('@')) {
    errorMsg.textContent = 'Please enter a valid email address.';
    return;
  }

  errorMsg.textContent = '';

  // Create and append comment
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.innerHTML = `
    <h3>${name}</h3>
    <p><em>${email}</em></p>
    <p>${comment}</p>
    <hr>
  `;

  commentsList.appendChild(commentDiv);
  commentForm.reset();
});
