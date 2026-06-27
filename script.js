const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const form = document.querySelector('#quote-form');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();

  const text = encodeURIComponent(`Bonjour ELK-Digital,%0A%0AJe m'appelle ${name}.%0AEmail: ${email}%0AService: ${service}%0A%0A${message}`);
  window.open(`https://wa.me/212620490769?text=${text}`, '_blank', 'noopener');
  form.reset();
});
