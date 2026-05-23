/* ============================================================
   ELECTRONOVA - Hero Slider & Carousel
   ============================================================ */

// ===== HERO SLIDER =====
const HeroSlider = (() => {
  let current = 0;
  let autoTimer;
  let slides, dots;

  const SLIDES_DATA = [
    {
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1400&q=80&fit=crop',
      eyebrow: '🔥 Offres Limitées',
      title: 'La Technologie <span class="highlight">Premium</span><br>à Prix Imbattable',
      desc: 'Découvrez notre sélection de téléviseurs 4K QLED & OLED avec jusqu\'à -30% de réduction. Qualité d\'image exceptionnelle.',
      cta1: { text: 'Voir les TVs', url: 'shop.html?category=electronique' },
      cta2: { text: 'Toutes les offres', url: 'shop.html' },
    },
    {
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&fit=crop',
      eyebrow: '✨ Nouveaux Arrivages',
      title: 'Équipez Votre <span class="highlight">Cuisine</span><br>Comme un Chef',
      desc: 'Robots pâtissiers, cafetières haut de gamme et ustensiles premium. Transformez votre cuisine en espace professionnel.',
      cta1: { text: 'Cuisinez mieux', url: 'shop.html?category=cuisine' },
      cta2: { text: 'Voir les collections', url: 'shop.html' },
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=80&fit=crop',
      eyebrow: '🎵 Audio Premium',
      title: 'Son <span class="highlight">Exceptionnel</span>,<br>Liberté Totale',
      desc: 'Casques Sony, enceintes Bose, AirPods Pro… Immergez-vous dans une qualité sonore hi-fi sans compromis.',
      cta1: { text: 'Explorer l\'Audio', url: 'shop.html?category=audio' },
      cta2: { text: 'Meilleures ventes', url: 'shop.html?sort=popular' },
    },
  ];

  function init() {
    const container = document.getElementById('hero-slides');
    if (!container) return;

    container.innerHTML = SLIDES_DATA.map((slide, i) => `
      <div class="hero-slide${i === 0 ? ' active' : ''}" data-index="${i}">
        <img src="${slide.image}" alt="Slide ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
        <div class="hero-slide-overlay"></div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <div class="hero-eyebrow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                ${slide.eyebrow}
              </div>
              <h1 class="hero-title">${slide.title}</h1>
              <p class="hero-desc">${slide.desc}</p>
              <div class="hero-cta">
                <a href="${slide.cta1.url}" class="btn btn-accent btn-lg">${slide.cta1.text}</a>
                <a href="${slide.cta2.url}" class="btn btn-outline-white btn-lg">${slide.cta2.text}</a>
              </div>
            </div>
          </div>
        </div>
      </div>`).join('');

    slides = container.querySelectorAll('.hero-slide');

    // Build dots
    const dotsContainer = document.getElementById('hero-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = SLIDES_DATA.map((_, i) =>
        `<button class="hero-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`
      ).join('');
      dots = dotsContainer.querySelectorAll('.hero-dot');
      dots.forEach(dot => {
        dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
      });
    }

    document.getElementById('hero-prev')?.addEventListener('click', prev);
    document.getElementById('hero-next')?.addEventListener('click', next);

    startAuto();
    setupSwipe(container);
  }

  function goTo(index) {
    if (!slides) return;
    slides[current].classList.remove('active');
    if (dots) dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots) dots[current].classList.add('active');

    resetAuto();
  }

  function prev() { goTo(current - 1); }
  function next() { goTo(current + 1); }

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  function setupSwipe(el) {
    let startX = 0;
    el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    }, { passive: true });
  }

  return { init, goTo, prev, next };
})();

// ===== CAROUSEL DRAG SCROLL =====
function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  if (!track) return;

  // Drag to scroll
  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  document.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  // Buttons
  document.getElementById(prevId)?.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  });
  document.getElementById(nextId)?.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  HeroSlider.init();
  initCarousel('popular-track', 'popular-prev', 'popular-next');
  initCarousel('featured-track', 'featured-prev', 'featured-next');
});
