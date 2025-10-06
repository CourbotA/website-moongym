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

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.photo-carousel__track');
    const prevBtn = carousel.querySelector('.photo-carousel__nav--prev');
    const nextBtn = carousel.querySelector('.photo-carousel__nav--next');
    if (!track) return;

    const scrollByAmount = (direction = 1) => {
        const amount = track.clientWidth * 0.85;
        track.scrollBy({ left: amount * direction, behavior: 'smooth' });
    };

    const updateNavState = () => {
        if (!prevBtn || !nextBtn) return;
        const maxScroll = track.scrollWidth - track.clientWidth - 1;
        prevBtn.disabled = track.scrollLeft <= 0;
        nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    prevBtn?.addEventListener('click', () => {
        scrollByAmount(-1);
        resetAuto();
    });
    nextBtn?.addEventListener('click', () => {
        scrollByAmount(1);
        resetAuto();
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('is-grabbing');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        resetAuto();
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('is-grabbing');
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('is-grabbing');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    const autoDelay = 4500;
    let autoTimer;

    const handleAutoScroll = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 1) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollByAmount(1);
        }
    };

    const startAuto = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(handleAutoScroll, autoDelay);
    };

    const resetAuto = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(handleAutoScroll, autoDelay);
    };

    track.addEventListener('scroll', updateNavState);
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', resetAuto);

    updateNavState();
    startAuto();
});