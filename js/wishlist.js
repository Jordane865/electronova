/* ============================================================
   ELECTRONOVA - Wishlist Management
   ============================================================ */

const Wishlist = (() => {
  const STORAGE_KEY = 'electronova_wishlist';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    updateUI();
  }

  function toggle(productId) {
    const ids = load();
    const product = getProductById(productId);
    if (!product) return;

    if (ids.includes(productId)) {
      save(ids.filter(id => id !== productId));
      Toast.show('info', 'Retiré des favoris', `${product.name} retiré.`);
      return false;
    } else {
      save([...ids, productId]);
      Toast.show('success', 'Ajouté aux favoris', `${product.name} ajouté.`);
      return true;
    }
  }

  function has(productId) {
    return load().includes(productId);
  }

  function remove(productId) {
    save(load().filter(id => id !== productId));
  }

  function getItems() {
    return load().map(id => getProductById(id)).filter(Boolean);
  }

  function getCount() {
    return load().length;
  }

  function updateUI() {
    const count = getCount();
    document.querySelectorAll('.wish-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });

    // Update all wishlist buttons
    document.querySelectorAll('[data-wish-id]').forEach(btn => {
      const id = parseInt(btn.dataset.wishId);
      btn.classList.toggle('in-wishlist', has(id));
      btn.classList.toggle('active', has(id));
    });
  }

  return { toggle, has, remove, getItems, getCount, updateUI };
})();

function renderWishlistPage() {
  const grid = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');
  if (!grid) return;

  const items = Wishlist.getItems();

  if (items.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.innerHTML = items.map(p => renderProductCard(p)).join('');
  attachProductCardEvents();
}
