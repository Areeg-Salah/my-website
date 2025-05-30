const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navLinks = {};
navList.innerHTML = '';
sections.forEach(section => {
  const sectionID = section.id;
  const sectionName = section.dataset.nav;
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${sectionID}`;
  link.textContent = sectionName;
  link.classList.add('menu__link');
  link.addEventListener('click', e => {
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
  });
  listItem.appendChild(link);
  navList.appendChild(listItem);
  navLinks[sectionID] = link;
});

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
window.addEventListener('scroll', setActiveSection);
setActiveSection();

const commentForm = document.getElementById('commentForm');
const errorMsg = document.getElementById('errorMsg');
const commentsList = document.getElementById('commentsList');

commentForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = commentForm.name.value.trim();
  const email = commentForm.email.value.trim();
  const comment = commentForm.comment.value.trim();
  if (!name || !email || !comment) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }
  if (!email.includes('@')) {
    errorMsg.textContent = 'Please enter a valid email address.';
    return;
  }
  errorMsg.textContent = '';
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
