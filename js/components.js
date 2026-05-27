/* ============================================================
   ELECTRONOVA - Shared HTML Components
   ============================================================ */

const NAVBAR_HTML = `
<!-- Page Loader -->
<div id="page-loader" class="page-loader">
  <div class="loader-logo">Electro<span>Nova</span></div>
  <div class="loader-bar"><div class="loader-bar-fill"></div></div>
</div>

<!-- Top Bar -->
<div class="top-bar">
  <div class="container">
    <div class="top-bar-inner">
      <div class="top-bar-promo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
        <strong>Livraison gratuite</strong> dès 99€ d'achat — Paiement sécurisé 🔒
      </div>
      <div class="top-bar-links">
        <a href="shipping.html">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
          Livraison
        </a>
        <a href="faq.html">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Aide
        </a>
        <a href="contact.html">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          +33 1 23 45 67 89
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Main Navbar -->
<nav class="navbar">
  <div class="container">
    <div class="nav-main">
      <button id="hamburger" class="hamburger" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      <a href="index.html" class="logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span class="logo-text">ElectroNova</span>
      </a>

      <div class="search-wrapper">
        <form id="search-form" class="search-form" autocomplete="off">
          <select id="search-cat" class="search-cat">
            <option value="all">Tout</option>
            <option value="electronique">Électronique</option>
            <option value="electromenager">Électroménager</option>
            <option value="cuisine">Cuisine</option>
            <option value="audio">Audio</option>
            <option value="accessoires">Accessoires</option>
          </select>
          <input id="search-input" type="search" class="search-input" placeholder="Rechercher un produit...">
          <button type="submit" class="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </form>
        <div id="search-dropdown" class="search-dropdown"></div>
      </div>

      <div class="nav-actions">
        <a href="login.html" class="nav-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span class="nav-btn-label">Compte</span>
        </a>
        <a href="wishlist.html" class="nav-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span class="nav-badge wish-count hidden">0</span>
          <span class="nav-btn-label">Favoris</span>
        </a>
        <button class="nav-btn cart-open-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <span class="nav-badge cart-count hidden">0</span>
          <span class="nav-btn-label">Panier</span>
        </button>
      </div>

      <!-- Language Switcher
      <div class="lang-switcher" id="lang-switcher">
        <button class="lang-btn" id="lang-btn" aria-haspopup="listbox" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="lang-globe"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span id="lang-current-label">FR</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="lang-chevron"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="lang-dropdown" id="lang-dropdown" role="listbox">
          <button class="lang-option active" data-lang="fr" data-label="FR" role="option">🇫🇷 <span>Français</span></button>
          <button class="lang-option" data-lang="en" data-label="EN" role="option">🇬🇧 <span>English</span></button>
          <button class="lang-option" data-lang="es" data-label="ES" role="option">🇪🇸 <span>Español</span></button>
          <button class="lang-option" data-lang="it" data-label="IT" role="option">🇮🇹 <span>Italiano</span></button>
        </div>
      </div> -->
    </div>
  </div>

  <!-- Category Bar -->
  <div class="cat-bar">
    <div class="container">
      <ul class="cat-list">
        <li class="cat-item">
          <a href="shop.html" class="cat-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            Tous les produits
          </a>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=electromenager" class="cat-link" data-cat="electromenager">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Électroménager
          </a>
          <div class="mega-menu">
            <div class="mega-col">
              <div class="mega-col-title">Froid</div>
              <a href="shop.html?category=electromenager">Réfrigérateurs</a>
              <a href="shop.html?category=electromenager">Congélateurs</a>
              <a href="shop.html?category=electromenager">Cave à vin</a>
            </div>
            <div class="mega-col">
              <div class="mega-col-title">Lavage</div>
              <a href="shop.html?category=electromenager">Lave-linge</a>
              <a href="shop.html?category=electromenager">Lave-vaisselle</a>
              <a href="shop.html?category=electromenager">Sèche-linge</a>
            </div>
            <div class="mega-col">
              <div class="mega-col-title">Nettoyage</div>
              <a href="shop.html?category=electromenager">Aspirateurs</a>
              <a href="shop.html?category=electromenager">Robots aspirateurs</a>
              <a href="shop.html?category=electromenager">Climatiseurs</a>
            </div>
          </div>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=electronique" class="cat-link" data-cat="electronique">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            Électronique
          </a>
          <div class="mega-menu">
            <div class="mega-col">
              <div class="mega-col-title">Image</div>
              <a href="shop.html?category=electronique">Téléviseurs</a>
              <a href="shop.html?category=electronique">Vidéoprojecteurs</a>
              <a href="shop.html?category=electronique">Moniteurs</a>
            </div>
            <div class="mega-col">
              <div class="mega-col-title">Mobile</div>
              <a href="shop.html?category=electronique">Smartphones</a>
              <a href="shop.html?category=electronique">Tablettes</a>
              <a href="shop.html?category=electronique">Montres connectées</a>
            </div>
            <div class="mega-col">
              <div class="mega-col-title">Informatique</div>
              <a href="shop.html?category=electronique">Laptops</a>
              <a href="shop.html?category=electronique">Appareils photo</a>
              <a href="shop.html?category=electronique">Consoles</a>
            </div>
          </div>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=cuisine" class="cat-link" data-cat="cuisine">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            Cuisine
          </a>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=audio" class="cat-link" data-cat="audio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
            Audio & Son
          </a>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=smart-home" class="cat-link" data-cat="smart-home">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            Maison Connectée
          </a>
        </li>
        <li class="cat-item">
          <a href="shop.html?category=accessoires" class="cat-link" data-cat="accessoires">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Accessoires
          </a>
        </li>
        <li style="margin-left:auto">
          <a href="shop.html?badge=promo" class="cat-link" style="color:var(--danger);font-weight:700">
            🔥 Promotions
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<!-- Newsletter -->
<section class="newsletter">
  <div class="container">
    <div class="newsletter-inner reveal">
      <h2>Restez Connecté aux <span style="color:var(--accent)">Meilleures Offres</span></h2>
      <p>Inscrivez-vous et recevez en avant-première nos promos exclusives, nouveautés et conseils tech.</p>
      <form id="newsletter-form" class="newsletter-form">
        <input type="email" class="newsletter-input" placeholder="Votre adresse email" required>
        <button type="submit" class="newsletter-btn">S'inscrire</button>
      </form>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-main">
      <div>
        <a href="index.html" class="footer-logo">ElectroNova</a>
        <p class="footer-desc">Votre destination premium pour l'électronique, l'électroménager et les accessoires tech. Qualité garantie, service d'exception.</p>
        <div class="footer-socials">
          <a href="#" class="social-link" title="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="#" class="social-link" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#" class="social-link" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
          <a href="#" class="social-link" title="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#000" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
        </div>
      </div>
      <div>
        <h4 class="footer-col-title">Boutique</h4>
        <ul class="footer-links">
          <li><a href="shop.html?category=electronique"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Électronique</a></li>
          <li><a href="shop.html?category=electromenager"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Électroménager</a></li>
          <li><a href="shop.html?category=cuisine"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Cuisine</a></li>
          <li><a href="shop.html?category=audio"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Audio & Son</a></li>
          <li><a href="shop.html?badge=promo"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Promotions</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Informations</h4>
        <ul class="footer-links">
          <li><a href="about.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>À propos</a></li>
          <li><a href="contact.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Contact</a></li>
          <li><a href="faq.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>FAQ</a></li>
          <li><a href="shipping.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Livraison & Retours</a></li>
          <li><a href="legal.html#cgv"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>CGV</a></li>
          <li><a href="legal.html#privacy"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Confidentialité</a></li>
          <li><a href="legal.html#legal"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Contact</h4>
        <ul class="footer-links">
          <li><a href="tel:+33123456789"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>+33 1 23 45 67 89</a></li>
          <li><a href="mailto:contact@electronova.fr"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>contact@electronova.fr</a></li>
          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>12 Rue de la Tech, Paris</a></li>
          <li style="padding-top:.4rem;font-size:.8rem;color:rgba(255,255,255,.4)">Lun-Sam : 9h-19h</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 ElectroNova. Tous droits réservés.</span>
      <div class="payment-methods">
        <span class="pay-badge">VISA</span>
        <span class="pay-badge">MC</span>
        <span class="pay-badge">PayPal</span>
        <span class="pay-badge">Apple Pay</span>
        <span class="pay-badge">CB</span>
      </div>
    </div>
  </div>
</footer>

<!-- Cart Drawer -->
<div id="cart-drawer" class="cart-drawer">
  <div id="cart-drawer-backdrop" class="cart-drawer-backdrop"></div>
  <div class="cart-drawer-panel">
    <div class="cart-drawer-head">
      <h3>Mon Panier <span id="cart-drawer-count" class="cart-count" style="font-size:.85rem;font-weight:600;color:var(--gray)"></span></h3>
      <button id="cart-drawer-close" class="cart-drawer-close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body">
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.962-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
        <h4>Votre panier est vide</h4>
        <p>Ajoutez des produits pour commencer vos achats</p>
        <a href="shop.html" class="btn btn-primary btn-sm" onclick="Cart.close()">Découvrir les produits</a>
      </div>
    </div>
    <div class="cart-drawer-foot" style="display:none" id="cart-drawer-foot">

      <!-- Free shipping progress -->
      <div id="drawer-ship-bar" style="padding:.875rem 1.25rem .5rem;border-bottom:1px solid rgba(0,0,0,.07)">
        <div id="drawer-ship-msg" style="font-size:.75rem;color:#6b7280;margin-bottom:.4rem;text-align:center"></div>
        <div style="height:4px;background:#f3f4f6;border-radius:100px;overflow:hidden">
          <div id="drawer-ship-fill" style="height:100%;background:linear-gradient(90deg,#1a56db,#ff6b35);border-radius:100px;transition:width .4s;width:0%"></div>
        </div>
      </div>

      <!-- Totals -->
      <div style="padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.35rem">
        <div style="display:flex;justify-content:space-between;font-size:.82rem;color:#6b7280">
          <span>Sous-total</span>
          <span class="cart-subtotal-val" style="font-weight:600;color:#111827">0,00 €</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.82rem;color:#6b7280">
          <span>Livraison</span>
          <span class="cart-shipping-val" style="font-weight:600;color:#10b981">—</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding-top:.6rem;margin-top:.25rem;border-top:1.5px solid #f3f4f6;font-size:1rem;font-weight:800">
          <span style="color:#111827">Total TTC</span>
          <span class="cart-total-val" style="color:#1a56db">0,00 €</span>
        </div>
      </div>

      <!-- Actions -->
      <div style="padding:.25rem 1.25rem 1rem;display:flex;flex-direction:column;gap:.6rem">

        <!-- Primary CTA — Payer -->
        <a href="cart.html" onclick="Cart.close()"
           style="display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.9rem 1rem;border-radius:10px;background:linear-gradient(135deg,#1a56db,#1e3a8a);color:white;font-size:.95rem;font-weight:800;text-decoration:none;box-shadow:0 4px 14px rgba(26,86,219,.4);transition:transform .15s,box-shadow .15s"
           onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 20px rgba(26,86,219,.5)'"
           onmouseout="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(26,86,219,.4)'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Payer ma commande
        </a>

        <!-- Secondary — Voir panier -->
        <a href="cart.html" onclick="Cart.close()"
           style="display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.7rem 1rem;border-radius:10px;background:#f3f4f6;color:#374151;font-size:.85rem;font-weight:600;text-decoration:none;transition:background .15s"
           onmouseover="this.style.background='#e5e7eb'"
           onmouseout="this.style.background='#f3f4f6'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Voir le détail du panier
        </a>

        <!-- Security & payment badges -->
        <div style="display:flex;align-items:center;justify-content:center;gap:.3rem;flex-wrap:wrap;margin-top:.2rem">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="11" height="11" style="color:#10b981"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span style="font-size:.68rem;color:#9ca3af">Paiement sécurisé SSL</span>
          <span style="font-size:.68rem;color:#d1d5db">·</span>
          <span style="font-size:.68rem;color:#9ca3af;font-weight:700">VISA</span>
          <span style="font-size:.68rem;color:#9ca3af;font-weight:700">MC</span>
          <span style="font-size:.68rem;color:#9ca3af;font-weight:700">PayPal</span>
          <span style="font-size:.68rem;color:#9ca3af;font-weight:700">Apple Pay</span>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- Quick View Modal -->
<div id="quick-view-modal" class="modal">
  <div id="quick-view-bg" class="modal-bg"></div>
  <div class="modal-box">
    <button id="quick-view-close" class="modal-close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <div class="quick-view-inner"></div>
  </div>
</div>

<!-- Mobile Nav -->
<div id="mobile-nav" class="mobile-nav">
  <div id="mobile-nav-backdrop" class="mobile-nav-backdrop"></div>
  <div class="mobile-nav-panel">
    <div class="mobile-nav-head">
      <span class="logo-text" style="font-size:1.3rem">ElectroNova</span>
      <button id="mobile-nav-close" class="mobile-nav-close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <ul class="mobile-nav-list">
      <li><a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Accueil</a></li>
      <li><a href="shop.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Boutique</a></li>
      <div class="mobile-nav-divider"></div>
      <li><a href="shop.html?category=electromenager">🏠 Électroménager</a></li>
      <li><a href="shop.html?category=electronique">📱 Électronique</a></li>
      <li><a href="shop.html?category=cuisine">🍳 Cuisine</a></li>
      <li><a href="shop.html?category=audio">🎧 Audio & Son</a></li>
      <li><a href="shop.html?category=smart-home">💡 Maison Connectée</a></li>
      <li><a href="shop.html?category=accessoires">🔌 Accessoires</a></li>
      <div class="mobile-nav-divider"></div>
      <li><a href="wishlist.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>Favoris</a></li>
      <li><a href="login.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>Mon Compte</a></li>
      <li><a href="contact.html"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Contact</a></li>
    </ul>
  </div>
</div>

<!-- Back to Top -->
<button id="back-top" class="back-top" aria-label="Retour en haut">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
</button>

<!-- Toast Container -->
<div id="toast-container" class="toast-wrap"></div>

<!-- Cookie Consent Banner -->
<div id="cookie-banner" role="dialog" aria-label="Consentement aux cookies" aria-live="polite">
  <div class="cookie-banner-inner">
    <div class="cookie-banner-icon">🍪</div>
    <div class="cookie-banner-text">
      <h4>Ce site utilise des cookies</h4>
      <p>Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre accord, des cookies analytiques pour améliorer votre expérience. Consultez notre <a href="legal.html#cookies">politique de cookies</a> et notre <a href="legal.html#privacy">politique de confidentialité</a>.</p>
    </div>
    <div class="cookie-banner-actions">
      <button class="cookie-btn-accept" id="cookie-accept">Accepter</button>
      <button class="cookie-btn-decline" id="cookie-decline">Continuer sans accepter</button>
    </div>
  </div>
</div>`;

// Inject components into DOM
document.addEventListener('DOMContentLoaded', () => {
  // Insert navbar before the main content
  const header = document.getElementById('site-header');
  if (header) header.innerHTML = NAVBAR_HTML;

  // Insert footer
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = FOOTER_HTML;

  // Render drawer on init to apply correct footer state
  Cart.renderDrawer();

  // Init search after navbar is injected
  if (typeof initSearch === 'function') initSearch();

  // Re-observe any .reveal elements on page
  document.querySelectorAll('.reveal').forEach(el => {
    if (typeof revealObserver !== 'undefined') revealObserver.observe(el);
  });

  // Mark active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.cat-link[data-cat]').forEach(link => {
    const urlCat = new URLSearchParams(window.location.search).get('category');
    if (urlCat && link.dataset.cat === urlCat) link.classList.add('active');
  });

  Cart.updateUI();
  Wishlist.updateUI();

  // ── Cookie consent banner ────────────────────────────────
  const COOKIE_KEY = 'electronova_cookies';

  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // No decision yet — show after short delay
      setTimeout(() => banner.classList.add('cookie-visible'), 800);
    }

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      banner.classList.remove('cookie-visible');
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'declined');
      banner.classList.remove('cookie-visible');
    });
  }

  // ── Language Switcher ────────────────────────────────────
  (function() {
    const LANG_KEY = 'electronova_lang';
    const btn = document.getElementById('lang-btn');
    const dropdown = document.getElementById('lang-dropdown');
    const currentLabel = document.getElementById('lang-current-label');
    if (!btn) return;

    const stored = localStorage.getItem(LANG_KEY) || 'fr';
    function applyLang(lang) {
      const option = dropdown.querySelector(`[data-lang="${lang}"]`);
      if (!option) return;
      currentLabel.textContent = option.dataset.label;
      dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
      localStorage.setItem(LANG_KEY, lang);
      document.documentElement.lang = lang;
    }
    applyLang(stored);

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.classList.toggle('active', open);
    });
    dropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        applyLang(opt.dataset.lang);
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('active');
      });
    });
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('active');
    });
  })();

  initCookieBanner();

  // Expose reset API for the legal/cookies page
  window.ElectroNovaCookies = {
    getConsent() { return localStorage.getItem(COOKIE_KEY); },
    reset() {
      localStorage.removeItem(COOKIE_KEY);
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        setTimeout(() => banner.classList.add('cookie-visible'), 200);
      }
    }
  };
});
