/* ============================================================
   ELECTRONOVA - Main JavaScript
   ============================================================ */

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 600);
});

// ===== TOAST SYSTEM =====
const Toast = (() => {
  function show(type = 'success', title = '', msg = '', duration = 3500) {
    const container = document.getElementById('toast-container') || createContainer();

    const icons = {
      success: `<svg class="toast-icon success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      error: `<svg class="toast-icon error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      info: `<svg class="toast-icon info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      warning: `<svg class="toast-icon" style="color:#f59e0b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    };

    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      ${icons[type] || icons.info}
      <div class="toast-body">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>`;

    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('removing');
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  function createContainer() {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-wrap';
    document.body.appendChild(c);
    return c;
  }

  return { show };
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);

  const backTop = document.getElementById('back-top');
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// Note: back-top, mobile menu, and cart drawer are handled via event delegation above

// ===== CART DRAWER (event delegation for dynamically injected elements) =====
document.addEventListener('click', (e) => {
  if (e.target.closest('.cart-open-btn')) Cart.open();
  if (e.target.closest('#cart-drawer-close')) Cart.close();
  if (e.target.closest('#cart-drawer-backdrop')) Cart.close();
  if (e.target.closest('#hamburger')) {
    document.getElementById('mobile-nav')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (e.target.closest('#mobile-nav-close') || e.target.closest('#mobile-nav-backdrop')) {
    document.getElementById('mobile-nav')?.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target.closest('#back-top')) window.scrollTo({ top: 0, behavior: 'smooth' });
  if (e.target.closest('#quick-view-bg') || e.target.closest('#quick-view-close')) closeQuickView();
});

// ===== SEARCH (initialized after components inject navbar) =====
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchCat = document.getElementById('search-cat');
  if (!searchInput || !searchDropdown) return;

  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const q = e.target.value.trim();
    if (q.length < 2) { searchDropdown.classList.remove('open'); return; }

    searchTimeout = setTimeout(() => {
      const cat = searchCat ? searchCat.value : '';
      const results = filterProducts({ search: q, category: cat && cat !== 'all' ? cat : undefined }).slice(0, 6);

      searchDropdown.innerHTML = results.length === 0
        ? `<div class="search-no-results">Aucun résultat pour "${q}"</div>`
        : results.map(p => `
          <a href="product.html?id=${p.id}" class="search-result">
            <img class="search-result-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/48'">
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-price">${formatPrice(p.price)}</div>
            </div>
          </a>`).join('');

      searchDropdown.classList.add('open');
    }, 280);
  });

  document.getElementById('search-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) searchDropdown.classList.remove('open');
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px 120px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PRODUCT CARD RENDERER =====
function renderProductCard(product) {
  const inWish = Wishlist.has(product.id);
  const discountBadge = product.discount > 0 ? `<span class="price-discount">-${product.discount}%</span>` : '';
  const origPrice = product.originalPrice > product.price ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : '';

  const badgeMap = { promo: 'badge-promo', new: 'badge-new', popular: 'badge-popular', hot: 'badge-hot' };
  const badgeLabel = { promo: 'Promo', new: 'Nouveau', popular: 'Top Ventes', hot: 'Hot' };
  const badgeHtml = product.badge ? `<span class="badge ${badgeMap[product.badge]}">${badgeLabel[product.badge]}</span>` : '';

  return `
    <div class="product-card reveal" data-product-id="${product.id}">
      <div class="product-card-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
        <div class="product-badges">${badgeHtml}</div>
        <div class="product-actions">
          <button class="product-action-btn${inWish ? ' in-wishlist' : ''}" data-wish-id="${product.id}" onclick="handleWishToggle(${product.id}, this)" title="Favoris">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${inWish ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <button class="product-action-btn" onclick="window.location.href='product.html?id=${product.id}'" title="Voir le produit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </div>
        <button class="product-quick-btn" onclick="openQuickView(${product.id})">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          Aperçu rapide
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-brand">${product.brand}</div>
        <a href="product.html?id=${product.id}" class="product-name" style="display:block">${product.name}</a>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${origPrice}
          ${discountBadge}
        </div>
      </div>
      <div class="product-card-foot">
        <button class="btn-add-cart" onclick="handleAddToCart(${product.id}, this)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Ajouter au panier
        </button>
      </div>
    </div>`;
}

// ===== PRODUCT CARD EVENTS =====
function attachProductCardEvents() {
  const cards = document.querySelectorAll('.product-card.reveal');
  cards.forEach(el => revealObserver.observe(el));
  // Force-reveal product cards after layout (double rAF ensures browser has painted)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.product-card.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }));
}

function handleAddToCart(productId, btn) {
  Cart.add(productId);
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Ajouté !';
    btn.classList.add('added');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('added'); }, 2000);
  }
}

function handleWishToggle(productId, btn) {
  const added = Wishlist.toggle(productId);
  if (btn) {
    btn.classList.toggle('in-wishlist', added);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
  }
}

// ===== QUICK VIEW MODAL =====
function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const inWish = Wishlist.has(productId);

  modal.querySelector('.quick-view-inner').innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400'">
      </div>
      <div>
        <div class="product-detail-brand">${product.brand}</div>
        <h3 style="font-size:1.3rem;font-weight:800;margin-bottom:.75rem">${product.name}</h3>
        <div class="product-rating" style="margin-bottom:1rem">
          <span class="stars" style="font-size:.9rem">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews} avis)</span>
        </div>
        <div class="detail-price-wrap">
          <span class="detail-price">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="detail-price-orig">${formatPrice(product.originalPrice)}</span>` : ''}
          ${product.discount > 0 ? `<span class="detail-price-badge">-${product.discount}%</span>` : ''}
        </div>
        <p style="font-size:.875rem;color:var(--gray);line-height:1.7;margin-bottom:1.5rem">${product.description}</p>
        <div class="detail-cta">
          <button class="btn btn-primary" style="flex:1" onclick="handleAddToCart(${product.id}, this); setTimeout(()=>closeQuickView(),1500)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Ajouter au panier
          </button>
          <button class="btn-wish${inWish ? ' active' : ''}" onclick="handleWishToggle(${product.id}, this)" title="Favoris">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${inWish ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>
        <a href="product.html?id=${product.id}" class="view-all" style="margin-top:.5rem">
          Voir les détails complets
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('quick-view-modal')?.querySelector('.modal-bg')?.addEventListener('click', closeQuickView);
document.getElementById('quick-view-close')?.addEventListener('click', closeQuickView);

// ===== PRODUCT TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.tab;
    const container = btn.closest('.prod-tabs') || btn.closest('.tabs-container');
    if (!container) return;

    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const target = container.querySelector(`#${targetId}`);
    if (target) target.classList.add('active');
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== CONTACT FORM =====
document.addEventListener('submit', (e) => {
  if (e.target.id === 'contact-form') {
    e.preventDefault();
    Toast.show('success', 'Message envoyé !', 'Nous vous répondrons dans les 24h.');
    e.target.reset();
  }
});

// ===== AUTH TABS =====
document.querySelectorAll('.auth-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ===== NEWSLETTER FORM (event delegation since footer injected dynamically) =====
document.addEventListener('submit', (e) => {
  if (e.target.id === 'newsletter-form') {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value) {
      Toast.show('success', 'Inscription réussie !', `Bienvenue ! Vous recevrez nos offres sur ${input.value}`);
      e.target.reset();
    }
  }
});
