/* ============================================================
   ELECTRONOVA - Cart Management
   ============================================================ */

const Cart = (() => {
  const STORAGE_KEY = 'electronova_cart';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateUI();
  }

  function add(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const items = load();
    const existing = items.find(i => i.id === productId);

    if (existing) {
      existing.qty = Math.min(existing.qty + quantity, product.stock);
    } else {
      items.push({ id: productId, qty: quantity });
    }

    save(items);
    Toast.show('success', 'Ajouté au panier', `${product.name} a été ajouté.`);
    animateCartBadge();
  }

  function remove(productId) {
    const items = load().filter(i => i.id !== productId);
    save(items);
    renderDrawer();
    Toast.show('info', 'Retiré du panier', 'Le produit a été retiré.');
  }

  function updateQty(productId, qty) {
    const items = load();
    const item = items.find(i => i.id === productId);
    if (!item) return;

    if (qty <= 0) {
      remove(productId);
      return;
    }
    const product = getProductById(productId);
    item.qty = Math.min(qty, product ? product.stock : qty);
    save(items);
    renderDrawer();
  }

  function clear() {
    save([]);
    renderDrawer();
  }

  function getItems() {
    return load().map(i => {
      const product = getProductById(i.id);
      return product ? { ...product, qty: i.qty } : null;
    }).filter(Boolean);
  }

  function getCount() {
    return load().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getTotal() {
    const subtotal = getSubtotal();
    const shipping = subtotal >= 99 ? 0 : 5.99;
    return subtotal + shipping;
  }

  function getShipping() {
    return getSubtotal() >= 99 ? 0 : 5.99;
  }

  function updateUI() {
    const count = getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  }

  function animateCartBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = 'bounceIn .4s ease';
    });
  }

  function renderDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    const body = drawer.querySelector('.cart-drawer-body');
    const items = getItems();

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.962-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
          <h4>Votre panier est vide</h4>
          <p>Découvrez nos produits et ajoutez-les à votre panier</p>
          <a href="shop.html" class="btn btn-primary btn-sm" onclick="Cart.close()">Voir les produits</a>
        </div>`;
      updateFooter(0, 0, 0);
      return;
    }

    body.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/76x76?text=No+Image'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-brand">${item.brand}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1})">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1})">+</button>
          </div>
        </div>
        <button class="cart-item-del" onclick="Cart.remove(${item.id})" title="Retirer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>`).join('');

    updateFooter(getSubtotal(), getShipping(), getTotal());
  }

  function updateFooter(subtotal, shipping, total) {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    const foot = document.getElementById('cart-drawer-foot');
    if (foot) foot.style.display = subtotal > 0 ? 'block' : 'none';

    const sub = drawer.querySelector('.cart-subtotal-val');
    const ship = drawer.querySelector('.cart-shipping-val');
    const tot = drawer.querySelector('.cart-total-val');
    if (sub) sub.textContent = formatPrice(subtotal);
    if (ship) ship.textContent = shipping === 0 ? 'Gratuit' : formatPrice(shipping);
    if (tot) tot.textContent = formatPrice(total);

    const fill = drawer.querySelector('#drawer-ship-fill');
    const msg = drawer.querySelector('#drawer-ship-msg');
    if (fill && msg) {
      const pct = Math.min((subtotal / 99) * 100, 100);
      fill.style.width = pct + '%';
      msg.textContent = subtotal >= 99
        ? '🎉 Livraison gratuite débloquée !'
        : `Plus que ${formatPrice(99 - subtotal)} pour la livraison gratuite`;
    }
  }

  function open() {
    renderDrawer();
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { add, remove, updateQty, clear, getItems, getCount, getSubtotal, getTotal, getShipping, open, close, renderDrawer, updateUI };
})();

// Cart page rendering
function renderCartPage() {
  const tableBody = document.getElementById('cart-table-body');
  const emptyMsg = document.getElementById('cart-empty-msg');
  if (!tableBody) return;

  const items = Cart.getItems();

  if (items.length === 0) {
    tableBody.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    updateCartSummary();
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  tableBody.innerHTML = items.map(item => `
    <div class="cart-row-item" data-id="${item.id}">
      <div class="cart-prod">
        <img class="cart-prod-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80'">
        <div>
          <div class="cart-prod-name">${item.name}</div>
          <div class="cart-prod-brand">${item.brand}</div>
          ${item.discount > 0 ? `<div style="font-size:.75rem;color:var(--accent);font-weight:700">-${item.discount}% de réduction</div>` : ''}
        </div>
      </div>
      <div class="cart-cell-price">${formatPrice(item.price)}</div>
      <div>
        <div class="qty-ctrl">
          <button onclick="Cart.updateQty(${item.id}, ${item.qty - 1}); renderCartPage();">−</button>
          <input type="number" value="${item.qty}" min="1" max="${item.stock}" onchange="Cart.updateQty(${item.id}, parseInt(this.value)); renderCartPage();">
          <button onclick="Cart.updateQty(${item.id}, ${item.qty + 1}); renderCartPage();">+</button>
        </div>
      </div>
      <div class="cart-cell-total">${formatPrice(item.price * item.qty)}</div>
      <button class="cart-prod-del" style="width:32px;height:32px;border-radius:50%;background:var(--gray-bg);border:1.5px solid var(--gray-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .15s;color:var(--gray)" onclick="Cart.remove(${item.id}); renderCartPage();" title="Supprimer" onmouseover="this.style.background='#fee2e2';this.style.borderColor='#fca5a5';this.style.color='#ef4444'" onmouseout="this.style.background='var(--gray-bg)';this.style.borderColor='var(--gray-light)';this.style.color='var(--gray)'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>`).join('');

  updateCartSummary();
  if (typeof updateFreeShipBar === 'function') updateFreeShipBar();
}

function updateCartSummary() {
  const subtotal = Cart.getSubtotal();
  const shipping = Cart.getShipping();
  const total = Cart.getTotal();

  const els = {
    subtotal: document.getElementById('summary-subtotal'),
    shipping: document.getElementById('summary-shipping'),
    total: document.getElementById('summary-total'),
    count: document.getElementById('summary-count'),
  };

  if (els.subtotal) els.subtotal.textContent = formatPrice(subtotal);
  if (els.shipping) els.shipping.textContent = shipping === 0 ? 'Gratuit 🎉' : formatPrice(shipping);
  if (els.total) els.total.textContent = formatPrice(total);
  if (els.count) els.count.textContent = Cart.getCount();
}
