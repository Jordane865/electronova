/* ============================================================
   ELECTRONOVA - Product Filters & Shop Logic
   ============================================================ */

const ShopState = {
  filters: {
    category: 'all',
    brands: [],
    minPrice: 0,
    maxPrice: 3000,
    minRating: 0,
    badge: '',
    inStock: false,
    search: '',
    sort: 'default',
  },
  page: 1,
  perPage: 12,
  view: 'grid',
};

function initShop() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Read URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) ShopState.filters.category = params.get('category');
  if (params.get('search')) ShopState.filters.search = params.get('search');
  if (params.get('sort')) ShopState.filters.sort = params.get('sort');

  // Set active category in cat bar
  if (ShopState.filters.category !== 'all') {
    document.querySelectorAll('.cat-link').forEach(l => {
      l.classList.toggle('active', l.dataset.cat === ShopState.filters.category);
    });
  }

  // Set search input
  const searchInput = document.getElementById('search-input');
  if (searchInput && ShopState.filters.search) {
    searchInput.value = ShopState.filters.search;
  }

  // Initialize price range slider
  const slider = document.getElementById('price-slider');
  const priceMax = document.getElementById('price-max');
  if (slider) {
    slider.value = ShopState.filters.maxPrice;
    slider.addEventListener('input', () => {
      ShopState.filters.maxPrice = parseInt(slider.value);
      if (priceMax) priceMax.textContent = formatPrice(ShopState.filters.maxPrice);
      ShopState.page = 1;
      renderShop();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = ShopState.filters.sort;
    sortSelect.addEventListener('change', () => {
      ShopState.filters.sort = sortSelect.value;
      ShopState.page = 1;
      renderShop();
    });
  }

  // Brand checkboxes
  document.querySelectorAll('.brand-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      ShopState.filters.brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(c => c.value);
      ShopState.page = 1;
      renderShop();
    });
  });

  // Rating filters
  document.querySelectorAll('.rating-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rating-filter').forEach(b => b.classList.remove('active'));
      const val = parseFloat(btn.dataset.rating);
      ShopState.filters.minRating = ShopState.filters.minRating === val ? 0 : val;
      if (ShopState.filters.minRating) btn.classList.add('active');
      ShopState.page = 1;
      renderShop();
    });
  });

  // Stock filter
  document.getElementById('filter-instock')?.addEventListener('change', (e) => {
    ShopState.filters.inStock = e.target.checked;
    ShopState.page = 1;
    renderShop();
  });

  // Category sidebar links
  document.querySelectorAll('.cat-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      ShopState.filters.category = link.dataset.cat;
      document.querySelectorAll('.cat-filter-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      ShopState.page = 1;
      renderShop();
    });
  });

  // View toggle
  document.querySelectorAll('.view-sw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-sw-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ShopState.view = btn.dataset.view;
      const gridEl = document.getElementById('products-grid');
      if (gridEl) {
        gridEl.classList.toggle('list-view', ShopState.view === 'list');
      }
    });
  });

  // Clear filters
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    ShopState.filters = { category: 'all', brands: [], minPrice: 0, maxPrice: 3000, minRating: 0, badge: '', inStock: false, search: ShopState.filters.search, sort: 'default' };
    document.querySelectorAll('.brand-filter').forEach(cb => cb.checked = false);
    document.querySelectorAll('.rating-filter').forEach(b => b.classList.remove('active'));
    const stockCb = document.getElementById('filter-instock');
    if (stockCb) stockCb.checked = false;
    if (slider) { slider.value = 3000; }
    if (priceMax) priceMax.textContent = formatPrice(3000);
    ShopState.page = 1;
    renderShop();
  });

  renderShop();
}

function renderShop() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const allResults = filterProducts(ShopState.filters);
  const totalPages = Math.ceil(allResults.length / ShopState.perPage);
  const start = (ShopState.page - 1) * ShopState.perPage;
  const pageResults = allResults.slice(start, start + ShopState.perPage);

  // Update count
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.innerHTML = `<strong>${allResults.length}</strong> produits trouvés`;

  // Render products
  if (pageResults.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-emoji">🔍</div>
        <h2>Aucun produit trouvé</h2>
        <p>Modifiez vos filtres pour voir plus de résultats.</p>
        <button class="btn btn-primary" onclick="document.getElementById('clear-filters')?.click()">Réinitialiser les filtres</button>
      </div>`;
  } else {
    grid.innerHTML = pageResults.map(p => renderProductCard(p)).join('');
    grid.classList.toggle('list-view', ShopState.view === 'list');
    attachProductCardEvents();
    Wishlist.updateUI();

    // Trigger scroll reveal for new cards
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }, 50);
  }

  renderPagination(ShopState.page, totalPages);
  renderActiveFilters();
}

function renderPagination(current, total) {
  const container = document.getElementById('pagination');
  if (!container || total <= 1) { if (container) container.innerHTML = ''; return; }

  let html = `
    <button class="page-btn" onclick="goToPage(${current - 1})" ${current === 1 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </button>`;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      html += `<button class="page-btn${i === current ? ' active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === current - 2 || i === current + 2) {
      html += `<span style="padding:0 .25rem;color:var(--gray)">…</span>`;
    }
  }

  html += `
    <button class="page-btn" onclick="goToPage(${current + 1})" ${current === total ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>`;

  container.innerHTML = html;
}

function goToPage(page) {
  const total = Math.ceil(filterProducts(ShopState.filters).length / ShopState.perPage);
  if (page < 1 || page > total) return;
  ShopState.page = page;
  renderShop();
  document.querySelector('.shop-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderActiveFilters() {
  const container = document.getElementById('active-filters');
  if (!container) return;

  const tags = [];
  if (ShopState.filters.category !== 'all') {
    const cat = CATEGORIES.find(c => c.id === ShopState.filters.category);
    if (cat) tags.push({ label: cat.name, action: "ShopState.filters.category='all'; ShopState.page=1; renderShop()" });
  }
  ShopState.filters.brands.forEach(b => {
    tags.push({ label: b, action: `ShopState.filters.brands=ShopState.filters.brands.filter(x=>x!=='${b}'); document.querySelector('.brand-filter[value="${b}"]').checked=false; ShopState.page=1; renderShop()` });
  });
  if (ShopState.filters.minRating > 0) {
    tags.push({ label: `${ShopState.filters.minRating}+ étoiles`, action: "ShopState.filters.minRating=0; document.querySelectorAll('.rating-filter').forEach(b=>b.classList.remove('active')); ShopState.page=1; renderShop()" });
  }
  if (ShopState.filters.inStock) {
    tags.push({ label: 'En stock', action: "ShopState.filters.inStock=false; document.getElementById('filter-instock').checked=false; ShopState.page=1; renderShop()" });
  }

  container.innerHTML = tags.map(t => `
    <span class="filter-tag">
      ${t.label}
      <button class="filter-tag-remove" onclick="${t.action}">×</button>
    </span>`).join('');
}

// Expose for category nav links
window.setCategoryFilter = function(cat) {
  ShopState.filters.category = cat;
  ShopState.page = 1;
  renderShop();
};
