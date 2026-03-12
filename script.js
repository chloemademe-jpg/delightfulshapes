history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Copy email button
document.querySelectorAll('#copyEmailBtn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    const email = this.href.replace('mailto:', '');
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = email;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const icon = this.querySelector('img');
    const originalHTML = this.innerHTML;

    if (icon) icon.style.display = 'none';
    this.innerHTML = "Copied!";

    setTimeout(() => {
      if (icon) icon.style.display = 'inline';
      this.innerHTML = originalHTML;
    }, 2000);
  });
});

// Intersection observer — benefits + projects fade in
const benefitHeading = document.querySelector('.benefits .heading_columns');
const cards = document.querySelectorAll('.benefit_cols');
const projectCols = document.querySelectorAll('.project_cols');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target === benefitHeading) {
        entry.target.style.transitionDelay = '0s';
      } else if (entry.target.classList.contains('benefit_cols')) {
        const index = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${0.25 + index * 0.08}s`;
      } else {
        const index = Array.from(projectCols).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (benefitHeading) observer.observe(benefitHeading);
cards.forEach(card => observer.observe(card));
projectCols.forEach(col => observer.observe(col));

// Intersection observer — footer fade in
const footerItems = document.querySelectorAll('.heading_columns h2, .footer_cols h2, .heading_columns, .footer_cols .email-container, .footer_cols .copyright');
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(footerItems).indexOf(entry.target);
      entry.target.style.transitionDelay = `${0.15 + index * 0.2}s`;
      entry.target.classList.add('is-visible');
      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -20% 0px" });
footerItems.forEach(el => footerObserver.observe(el));

// Header hide/show on scroll
const header = document.querySelector('.site-header');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 80) {
    header.classList.add('site-header--hidden');
  } else {
    header.classList.remove('site-header--hidden');
  }
  lastY = y;
});

// Nav pill colour update
const navPill = document.querySelector('.site-header__middle');
const navSections = document.querySelectorAll('section[data-nav-bg]');

function updateNavColor() {
  const navMid = 60;
  let activeColor = '#ffffff';
  for (const section of navSections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navMid && rect.bottom >= navMid) {
      activeColor = section.dataset.navBg;
      break;
    }
  }
  navPill.style.backgroundColor = activeColor;
}

window.addEventListener('scroll', updateNavColor, { passive: true });
updateNavColor();

// Footer background colour lerp
const footerEl = document.querySelector('.footer');
function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
window.addEventListener('scroll', () => {
  const triggerStart = footerEl.offsetTop - window.innerHeight * 0.6;
  const triggerEnd   = footerEl.offsetTop - window.innerHeight * 0.1;
  const progress = Math.max(0, Math.min(1, (window.scrollY - triggerStart) / (triggerEnd - triggerStart)));
  const r = lerp(253, 253, progress);
  const g = lerp(246, 103, progress);
  const b = lerp(237, 79,  progress);
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
}, { passive: true });
