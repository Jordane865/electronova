// ╔══════════════════════════════════════════════════════╗
// ║              ElectroNova — auth.js                   ║
// ║     Gestion auth via fichier JSON + PHP + Google     ║
// ╚══════════════════════════════════════════════════════╝

const SESSION_KEY = 'electroNova_session';
const CART_KEY    = 'electronova_cart';

function saveSession(user, remember) {
  const data = JSON.stringify(user);
  remember
    ? localStorage.setItem(SESSION_KEY, data)
    : sessionStorage.setItem(SESSION_KEY, data);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  const ls = localStorage.getItem(SESSION_KEY);
  const ss = sessionStorage.getItem(SESSION_KEY);
  return ls ? JSON.parse(ls) : ss ? JSON.parse(ss) : null;
}

const Auth = (() => {

  // ── Inscription email/mot de passe ───────────────────
  async function register({ prenom, nom, email, password, newsletter }) {
    const res = await fetch('api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prenom, nom, email, password, newsletter })
    });
    const result = await res.json();
    if (result.ok) {
      saveSession(result.user, false);
      await syncCartFromServer(result.user.id);
    }
    return result;
  }

  // ── Connexion email/mot de passe ─────────────────────
  async function login({ email, password, remember }) {
    const res = await fetch('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await res.json();
    if (result.ok) {
      saveSession(result.user, remember);
      await syncCartFromServer(result.user.id);
    }
    return result;
  }

  // ── Connexion / Inscription via Google ───────────────
  async function loginWithGoogle({ email, prenom, nom, googleId, picture }) {
    const res = await fetch('api/google_auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, prenom, nom, googleId, picture })
    });
    const result = await res.json();
    if (result.ok) {
      saveSession(result.user, true); // Google → toujours "se souvenir"
      await syncCartFromServer(result.user.id);
    }
    return result;
  }

  // ── Déconnexion ──────────────────────────────────────
  async function logout() {
    const user = getCurrentUser();

    // Sauvegarde le panier sur le serveur avant déconnexion
    if (user?.id) {
      const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      try {
        await fetch('api/cart_save.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, items: cartItems })
        });
      } catch (e) {
        console.warn('Sauvegarde panier avant déconnexion échouée', e);
      }
    }

    // Déconnexion Google si connecté via Google
    if (user?.isGoogle && typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }

    // Vide le panier local
    localStorage.removeItem(CART_KEY);
    clearSession();

    // Remet le badge panier à 0
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = '0';
      el.classList.add('hidden');
    });

    window.location.href = 'index.html';
  }

  // ── Sync panier depuis le serveur ────────────────────
  async function syncCartFromServer(userId) {
    try {
      const res   = await fetch(`api/cart_load.php?userId=${userId}`);
      const items = await res.json();
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      if (typeof Cart !== 'undefined') Cart.updateUI();
    } catch (e) {
      console.warn('Chargement panier serveur échoué', e);
    }
  }

  // ── Mise à jour du header ────────────────────────────
  function updateHeaderUI() {
    const user = getCurrentUser();
    const tryUpdate = setInterval(() => {
      const accountBtn = document.querySelector('.account-btn, [href="login.html"], a[href*="login"]');
      if (!accountBtn) return;
      clearInterval(tryUpdate);

      if (user) {
        const initiales = ((user.prenom?.[0] || '') + (user.nom?.[0] || '')).toUpperCase() || '?';
        const avatarContent = user.picture
          ? `<img src="${user.picture}" alt="${user.prenom}" style="width:36px;height:36px;border-radius:50%;object-fit:cover">`
          : `<span>${initiales}</span>`;

        accountBtn.outerHTML = `
          <div class="user-menu-wrap" style="position:relative">
            <button class="user-avatar-btn" onclick="toggleUserMenu()" title="${user.prenom} ${user.nom}"
              style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#f97316);
                     color:#fff;font-weight:700;font-size:.85rem;border:none;cursor:pointer;
                     display:flex;align-items:center;justify-content:center;overflow:hidden;padding:0">
              ${avatarContent}
            </button>
            <div id="user-dropdown" style="display:none;position:absolute;right:0;top:calc(100% + 8px);
              background:#1a1f2e;border:1px solid rgba(255,255,255,.1);border-radius:12px;
              min-width:210px;padding:.5rem;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.4)">
              <div style="padding:.6rem .8rem .4rem;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:.3rem">
                <div style="display:flex;align-items:center;gap:.5rem">
                  ${user.picture ? `<img src="${user.picture}" style="width:32px;height:32px;border-radius:50%;object-fit:cover">` : ''}
                  <div>
                    <div style="font-weight:600;color:#fff;font-size:.9rem">${user.prenom} ${user.nom}</div>
                    <div style="color:#8892a4;font-size:.72rem">${user.email}</div>
                    ${user.isGoogle ? `<div style="font-size:.68rem;color:#4285F4;margin-top:.1rem">✓ Compte Google</div>` : ''}
                  </div>
                </div>
              </div>
              
              <a href="cart.html" style="display:flex;align-items:center;gap:.5rem;padding:.5rem .8rem;color:#cbd5e1;
                font-size:.85rem;text-decoration:none;border-radius:8px;transition:.2s"
                onmouseover="this.style.background='rgba(255,255,255,.06)'"
                onmouseout="this.style.background='transparent'">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Mes commandes
              </a>
              <button onclick="Auth.logout()" style="display:flex;align-items:center;gap:.5rem;padding:.5rem .8rem;
                color:#f87171;font-size:.85rem;background:none;border:none;cursor:pointer;width:100%;
                text-align:left;border-radius:8px;transition:.2s"
                onmouseover="this.style.background='rgba(248,113,113,.08)'"
                onmouseout="this.style.background='transparent'">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Se déconnecter
              </button>
            </div>
          </div>`;
      }
    }, 100);
  }

  return { register, login, loginWithGoogle, logout, getCurrentUser, updateHeaderUI };

})();

// ── Toggle menu utilisateur ────────────────────────────
function toggleUserMenu() {
  const dd = document.getElementById('user-dropdown');
  if (!dd) return;
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu-wrap')) {
    const dd = document.getElementById('user-dropdown');
    if (dd) dd.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => Auth.updateHeaderUI());
