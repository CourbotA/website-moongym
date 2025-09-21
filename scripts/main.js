const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-navigation');
const yearSpan = document.getElementById('year');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.getAttribute('data-open') === 'true';
        nav.setAttribute('data-open', String(!isOpen));
        navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
}

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
