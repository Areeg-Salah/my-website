// 1. Find all the sections on the page
const sections = document.querySelectorAll('section');

// 2. Find the empty <ul> element where we’ll add nav links
const navList = document.getElementById('navbar__list');

// 3. Loop through each section
sections.forEach(section => {
  // Get the ID and the data-nav name from the section
  const sectionID = section.id; // like "section1"
  const sectionName = section.dataset.nav; // like "Welcome"

  // Create a new <li> element for the list
  const listItem = document.createElement('li');

  // Create a new <a> (link) element inside the list item
  const link = document.createElement('a');
  link.href = `#${sectionID}`; // This makes the link go to the section
  link.textContent = sectionName; // This sets the link's text
  link.classList.add('menu__link'); // Adds a CSS class to style the link

  // Optional: make the scroll smooth when link is clicked
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Stop the default jump
    section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
  });

  // Put the link inside the list item, and the list item inside the nav
  listItem.appendChild(link);
  navList.appendChild(listItem);
});

