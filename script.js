// Reveal-Animationen
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
sections.forEach(s => observer.observe(s));

// CV-Dropdown per Klick
const cvGroup  = document.getElementById('cv-group');
const cvToggle = document.getElementById('cv-toggle');

function closeCvMenu() {
  if (!cvGroup) return;
  cvGroup.classList.remove('open');
  if (cvToggle) cvToggle.setAttribute('aria-expanded', 'false');
}

if (cvToggle) {
  cvToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = cvGroup.classList.contains('open');
    if (isOpen) {
      closeCvMenu();
    } else {
      cvGroup.classList.add('open');
      cvToggle.setAttribute('aria-expanded', 'true');
    }
  });
}

document.addEventListener('click', (e) => {
  if (!cvGroup) return;
  if (!cvGroup.contains(e.target)) closeCvMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCvMenu();
});
