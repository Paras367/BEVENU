/* ============================================================
   BEVENU - E-Commerce JavaScript
   ============================================================ */


const AUTH_CONFIG = {
  WORKER_URL: 'https://bevenu-auth.dhimanparas605.workers.dev', 
  COOKIE_NAME: 'bevenu_token',
  SESSION_KEY: 'bevenu_session'
};

// ============================================================
// PRODUCT DATA
// ============================================================
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Floral Wrap Dress', category: 'women', price: 1299, originalPrice: 1999, rating: 4.8, reviews: 324, color: '#fce7f3', sizes: ['XS','S','M','L','XL'], trending: true, newArrival: false, description: 'Elegant floral wrap dress crafted from breathable chiffon fabric. Perfect for summer evenings and casual outings.' },
  { id: 2, name: 'Linen Wide-Leg Pants', category: 'women', price: 1599, originalPrice: 2499, rating: 4.6, reviews: 218, color: '#fef3c7', sizes: ['S','M','L','XL'], trending: true, newArrival: true, description: 'Relaxed linen wide-leg trousers with an elastic waistband for all-day comfort.' },
  { id: 3, name: 'Silk Camisole Top', category: 'women', price: 899, originalPrice: null, rating: 4.5, reviews: 156, color: '#ffe4e6', sizes: ['XS','S','M','L'], trending: false, newArrival: true, description: 'Luxurious silk-satin camisole with adjustable straps. Versatile for day or night styling.' },
  { id: 4, name: 'Embroidered Kurti Set', category: 'women', price: 2199, originalPrice: 3499, rating: 4.9, reviews: 442, color: '#f0fdf4', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: false, description: 'Intricately embroidered ethnic kurti with matching palazzo. A festive favourite.' },
  { id: 5, name: 'Blazer & Trouser Set', category: 'women', price: 3499, originalPrice: 5999, rating: 4.7, reviews: 187, color: '#f5f3ff', sizes: ['S','M','L','XL'], trending: false, newArrival: true, description: 'Tailored blazer and straight-cut trouser co-ord set in premium crepe fabric.' },
  { id: 6, name: 'Ruched Bodycon Dress', category: 'women', price: 1099, originalPrice: 1599, rating: 4.4, reviews: 293, color: '#fce7f3', sizes: ['XS','S','M','L'], trending: true, newArrival: false, description: 'Figure-flattering ruched bodycon dress in a stretchy jersey fabric.' },
  { id: 7, name: 'Slim Fit Oxford Shirt', category: 'men', price: 999, originalPrice: 1499, rating: 4.6, reviews: 389, color: '#dbeafe', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: false, description: 'Classic slim-fit Oxford shirt in breathable 100% cotton. A wardrobe staple.' },
  { id: 8, name: 'Cargo Jogger Pants', category: 'men', price: 1399, originalPrice: 1999, rating: 4.5, reviews: 267, color: '#f0fdf4', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: true, description: 'Functional cargo joggers with multiple pockets and an adjustable waistband.' },
  { id: 9, name: 'Premium Polo T-Shirt', category: 'men', price: 799, originalPrice: null, rating: 4.7, reviews: 512, color: '#fef9c3', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: false, description: 'Pique cotton polo with ribbed collar and cuffs. Available in 8 colours.' },
  { id: 10, name: 'Denim Jacket Classic', category: 'men', price: 2499, originalPrice: 3499, rating: 4.8, reviews: 203, color: '#dbeafe', sizes: ['S','M','L','XL'], trending: true, newArrival: true, description: 'Vintage-washed denim jacket with button closures and front pockets.' },
  { id: 11, name: 'Formal Blazer Navy', category: 'men', price: 4999, originalPrice: 7999, rating: 4.9, reviews: 128, color: '#e0e7ff', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: false, description: 'Single-breasted formal blazer in wool-blend fabric. Perfect for boardroom looks.' },
  { id: 12, name: 'Linen Kurta Set', category: 'men', price: 1799, originalPrice: 2499, rating: 4.5, reviews: 334, color: '#fef3c7', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: true, description: 'Relaxed linen kurta and pyjama set, ideal for festive and casual occasions.' },
  { id: 13, name: 'Dinosaur Print Tee', category: 'kids', price: 399, originalPrice: 599, rating: 4.8, reviews: 678, color: '#dcfce7', sizes: ['XS','S','M'], trending: true, newArrival: false, description: 'Fun dinosaur print t-shirt in soft organic cotton, available in sizes 2–12 years.' },
  { id: 14, name: 'Floral Frock Dress', category: 'kids', price: 699, originalPrice: 999, rating: 4.7, reviews: 421, color: '#fce7f3', sizes: ['XS','S','M','L'], trending: false, newArrival: true, description: 'Adorable floral frock in breathable cotton blend. Features a back bow tie.' },
  { id: 15, name: 'Denim Dungaree Set', category: 'kids', price: 899, originalPrice: 1299, rating: 4.6, reviews: 289, color: '#dbeafe', sizes: ['XS','S','M'], trending: true, newArrival: false, description: 'Comfortable denim dungaree with adjustable straps. Ideal for playful toddlers.' },
  { id: 16, name: 'Ethnic Sherwani Set', category: 'kids', price: 1499, originalPrice: 2199, rating: 4.9, reviews: 156, color: '#fef9c3', sizes: ['S','M','L'], trending: false, newArrival: true, description: 'Traditional sherwani with matching churidaar. Perfect for weddings and festivities.' },
  { id: 17, name: 'Leather Tote Bag', category: 'accessories', price: 2999, originalPrice: 4999, rating: 4.8, reviews: 342, color: '#fef3c7', sizes: ['one-size'], trending: true, newArrival: false, description: 'Handcrafted genuine leather tote bag with a spacious interior and gold-tone hardware.' },
  { id: 18, name: 'Silk Printed Scarf', category: 'accessories', price: 899, originalPrice: null, rating: 4.6, reviews: 189, color: '#fce7f3', sizes: ['one-size'], trending: false, newArrival: true, description: 'Lightweight silk scarf with vibrant abstract print. Versatile as head wrap or neck scarf.' },
  { id: 19, name: 'Minimalist Watch', category: 'accessories', price: 3499, originalPrice: 4999, rating: 4.9, reviews: 267, color: '#e0e7ff', sizes: ['one-size'], trending: true, newArrival: false, description: 'Slim-profile quartz watch with a stainless steel case and leather strap.' },
  { id: 20, name: 'Boho Earring Set', category: 'accessories', price: 599, originalPrice: 899, rating: 4.5, reviews: 421, color: '#f0fdf4', sizes: ['one-size'], trending: false, newArrival: true, description: 'Set of 3 pairs of bohemian-style earrings with feather and bead detailing.' },
];

function getProducts() {
  const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
  return [...DEFAULT_PRODUCTS, ...customProducts];
}

// ============================================================
// STAR RATING HTML 
// ============================================================
function getStarHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ============================================================
// PRODUCT CARD RENDER
// ============================================================
function renderProductCard(p) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isWishlisted = wishlist.some(i => i.id === p.id);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const stars = getStarHTML(p.rating);

  return `
    <div class="product-card animate-in" data-id="${p.id}">
      <div class="product-img-wrapper">
        <div class="product-img-placeholder" style="background: linear-gradient(135deg, ${p.color || '#f5f5f5'}, ${lightenColor(p.color, 20)})">
          <i class="fas fa-tshirt"></i>
          <span>${p.category}</span>
        </div>
        ${discount ? `<span class="product-badge sale">-${discount}%</span>` : ''}
        ${p.newArrival && !discount ? `<span class="product-badge new-badge">New</span>` : ''}
        <div class="product-card-actions">
          <button class="card-action-btn wishlist-btn-card ${isWishlisted ? 'wishlisted' : ''}"
            onclick="event.stopPropagation(); toggleWishlist(getProducts().find(p => p.id === ${p.id})); this.classList.toggle('wishlisted');"
            title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <i class="fas fa-heart"></i>
          </button>
          <button class="card-action-btn" onclick="event.stopPropagation(); quickView(${p.id});" title="Quick View">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <p class="product-card-cat">${p.category}</p>
        <h3 class="product-card-name">${p.name}</h3>
        <div class="product-card-rating">
          <div class="stars">${stars}</div>
          <span class="rating-text">${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-card-price">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString()}</span>` : ''}
          ${discount ? `<span class="price-discount">${discount}% off</span>` : ''}
        </div>
        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(getProducts().find(p => p.id === ${p.id}), 1, '')">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

function attachCardEvents() {
  document.querySelectorAll('.product-card[data-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const id = card.dataset.id;
      window.location.href = `product.html?id=${id}`;
    });
  });

  document.querySelectorAll('.animate-in').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.05}s`;
  });
}

function renderProductGrid(containerId, products, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = limit ? products.slice(0, limit) : products;
  if (!items.length) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1">No products found.</p>';
    return;
  }
  container.innerHTML = items.map(p => renderProductCard(p)).join('');
  attachCardEvents();
}

function lightenColor(hex, amount) {
  if (!hex || !hex.startsWith('#')) return '#f0f0f0';
  return hex;
}

// ============================================================
// CART SYSTEM (UNCHANGED)
// ============================================================
function addToCart(product, quantity = 1, size = '') {
  if (!product) return;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingIdx = cart.findIndex(i => i.id === product.id && i.size === size);

  if (existingIdx >= 0) {
    cart[existingIdx].quantity = Math.min(10, cart[existingIdx].quantity + quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      color: product.color,
      size: size,
      quantity: quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateNavCounts();
  showToast(`"${product.name}" added to cart! 🛍️`, 'success');
}

function updateNavCounts() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll('#cart-count').forEach(el => { el.textContent = totalItems; });
  document.querySelectorAll('#wishlist-count').forEach(el => { el.textContent = wishlist.length; });
  document.querySelectorAll('#wishlist-count-sidebar').forEach(el => { el.textContent = wishlist.length; });
}

// ============================================================
// WISHLIST SYSTEM (UNCHANGED)
// ============================================================
function toggleWishlist(product) {
  if (!product) return;
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const idx = wishlist.findIndex(i => i.id === product.id);

  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    wishlist.push({ id: product.id, name: product.name, price: product.price, category: product.category, color: product.color });
    showToast(`"${product.name}" added to wishlist! ❤️`, 'success');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateNavCounts();
  renderWishlistSidebar();
}

function renderWishlistSidebar() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (!wishlist.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
        <i class="fas fa-heart" style="font-size:3rem;margin-bottom:12px;opacity:0.3"></i>
        <p>Your wishlist is empty</p>
        <a href="products.html" style="color:var(--accent);font-size:14px">Browse Products</a>
      </div>`;
    return;
  }

  container.innerHTML = wishlist.map(item => `
    <div class="wishlist-item">
      <div class="product-img-placeholder small" style="background:${item.color || '#eee'}">
        <i class="fas fa-tshirt"></i>
      </div>
      <div class="wishlist-item-info">
        <a href="product.html?id=${item.id}">${item.name}</a>
        <p>₹${item.price.toLocaleString()}</p>
      </div>
      <button class="wishlist-remove-btn" onclick="toggleWishlist(getProducts().find(p => p.id === ${item.id}))">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

function openWishlist() {
  renderWishlistSidebar();
  document.getElementById('wishlist-sidebar')?.classList.add('open');
  document.getElementById('wishlist-overlay')?.classList.add('active');
}

function closeWishlist() {
  document.getElementById('wishlist-sidebar')?.classList.remove('open');
  document.getElementById('wishlist-overlay')?.classList.remove('active');
}

// ============================================================
// RECENTLY VIEWED (UNCHANGED)
// ============================================================
function addToRecentlyViewed(product) {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const filtered = viewed.filter(i => i.id !== product.id);
  filtered.unshift({ id: product.id, name: product.name, price: product.price, category: product.category, color: product.color, rating: product.rating, reviews: product.reviews });
  localStorage.setItem('recentlyViewed', JSON.stringify(filtered.slice(0, 8)));
}

function renderRecentlyViewed() {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const section = document.getElementById('recently-viewed-section');
  const grid = document.getElementById('recently-viewed-grid');
  if (!viewed.length || !section || !grid) return;

  section.style.display = 'block';
  const products = getProducts();
  const items = viewed.map(v => products.find(p => p.id === v.id)).filter(Boolean);
  renderProductGrid('recently-viewed-grid', items, 4);
}

// ============================================================
// TOAST NOTIFICATIONS (UNCHANGED)
// ============================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

// ============================================================
// THEME TOGGLE (UNCHANGED)
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// 🔐 AUTH HELPERS (NEW - ONLY FOR WORKER AUTH)
async function fetchWithAuth(endpoint, options = {}) {
  return fetch(`${AUTH_CONFIG.WORKER_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include'
  });
}

async function validateSession() {
  try {
    const res = await fetchWithAuth('/auth/me', { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.user : null;
  } catch { return null; }
}

async function logout() {
  try {
    await fetchWithAuth('/auth/logout', { method: 'POST' });
  } catch (e) { console.warn('Logout request failed', e); }
  document.getElementById('user-display')?.textContent = 'Login';
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) { loginBtn.href = 'login.html'; loginBtn.onclick = null; }
  Toast.show('Logged out successfully', 'info');
  setTimeout(() => window.location.href = 'index.html', 800);
}

// 🔐 REPLACED: Session check via Worker cookie validation (ONLY CHANGE HERE)
async function checkUserSession() {
  const display = document.getElementById('user-display');
  const loginBtn = document.getElementById('login-btn');
  
  const user = await validateSession();
  
  if (user && display) {
    display.textContent = user.name.split(' ')[0];
    if (loginBtn) {
      loginBtn.href = '#';
      loginBtn.onclick = (e) => {
        e.preventDefault();
        if (confirm(`Logout as ${user.name}?`)) logout();
      };
    }
    localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  } else {
    if (display) display.textContent = 'Login';
    if (loginBtn) { loginBtn.href = 'login.html'; loginBtn.onclick = null; }
    localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
  }
}

// ============================================================
// SEARCH & SUGGESTIONS (UNCHANGED)
// ============================================================
function initSearchSuggestions() {
  const input = document.getElementById('search-input');
  const suggestionsEl = document.getElementById('search-suggestions');
  if (!input || !suggestionsEl) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { suggestionsEl.classList.remove('active'); return; }

    const products = getProducts();
    const matches = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!matches.length) { suggestionsEl.classList.remove('active'); return; }

    suggestionsEl.innerHTML = matches.map(p => `
      <div class="suggestion-item" onclick="window.location.href='product.html?id=${p.id}'">
        <i class="fas fa-search"></i>
        <span>${p.name}</span>
        <small style="margin-left:auto;color:var(--text-muted);font-size:11px">₹${p.price.toLocaleString()}</small>
      </div>
    `).join('');

    suggestionsEl.classList.add('active');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      suggestionsEl.classList.remove('active');
    }
  });
}

// ============================================================
// HAMBURGER MENU (UNCHANGED)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const wishlistBtn = document.getElementById('wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWishlist();
    });
  }

  const wishlistOverlay = document.getElementById('wishlist-overlay');
  if (wishlistOverlay) {
    wishlistOverlay.addEventListener('click', closeWishlist);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in, .cat-card, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ✅ Auth check via Worker (async)
  checkUserSession();
});

// ============================================================
// QUICK VIEW (UNCHANGED)
// ============================================================
function quickView(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = document.getElementById('quick-view-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'quick-view-modal';
  overlay.className = 'modal-overlay active';
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  overlay.innerHTML = `
    <div class="modal" style="max-width:600px;width:90%">
      <div class="modal-header">
        <h3>Quick View</h3>
        <button onclick="document.getElementById('quick-view-modal').remove()"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body" style="flex-direction:row;gap:24px;flex-wrap:wrap">
        <div style="width:160px;flex-shrink:0">
          <div class="product-img-placeholder large" style="background:${product.color||'#f5f5f5'};min-height:200px;border-radius:12px">
            <i class="fas fa-tshirt"></i>
          </div>
        </div>
        <div style="flex:1;min-width:200px">
          <p style="font-size:11px;color:var(--accent);letter-spacing:2px;font-weight:700;text-transform:uppercase">${product.category}</p>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.3rem;margin:8px 0">${product.name}</h3>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <span style="color:#f59e0b">${getStarHTML(product.rating)}</span>
            <span style="font-size:13px;color:var(--text-muted)">${product.rating} (${product.reviews})</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <span style="font-size:1.5rem;font-weight:800">₹${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span style="text-decoration:line-through;color:var(--text-muted)">₹${product.originalPrice.toLocaleString()}</span>` : ''}
            ${discount ? `<span style="background:#dcfce7;color:#16a34a;padding:2px 8px;border-radius:999px;font-size:12px;font-weight:700">${discount}% OFF</span>` : ''}
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;line-height:1.6">${product.description || ''}</p>
          <div style="display:flex;gap:10px">
            <a href="product.html?id=${product.id}" class="btn btn-outline" style="flex:1;justify-content:center">View Details</a>
            <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="addToCart(getProducts().find(p => p.id === ${product.id}), 1, ''); document.getElementById('quick-view-modal').remove();">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// ============================================================
// PAGE CONTROLLERS (UNCHANGED EXCEPT auth() FUNCTION)
// ============================================================
const Pages = {
  initNavbar() {
    const updateBadges = () => {
      const cc = document.querySelector('.cart-count'); if (cc) cc.textContent = JSON.parse(localStorage.getItem('cart') || '[]').reduce((a, i) => a + i.qty, 0);
      const wc = document.querySelector('.wishlist-count'); if (wc) wc.textContent = JSON.parse(localStorage.getItem('wishlist') || '[]').length;
      const up = document.getElementById('userProfileBtn'); 
      if (up) {
        up.innerHTML = JSON.parse(localStorage.getItem('bevenu_session') || 'null') ? `<i class="fas fa-user-check"></i>` : `<i class="fas fa-user-circle"></i>`;
        up.title = JSON.parse(localStorage.getItem('bevenu_session') || 'null') ? `Welcome, ${JSON.parse(localStorage.getItem('bevenu_session')).name}` : 'Login';
      }
    };
    const nav = document.getElementById('mainNavbar');
    if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
    updateBadges();
    return updateBadges;
  },

  initSearch() {
    const input = document.querySelector('.search-input');
    const box = document.querySelector('.search-suggestions');
    if (!input || !box) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { box.style.display = 'none'; return; }
      const filtered = getProducts().filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
      box.innerHTML = filtered.map(p => `<div class="search-suggestion-item" data-id="${p.id}"><span>${p.name}</span> <small>₹${p.price.toLocaleString()}</small></div>`).join('');
      box.style.display = 'block';
      box.querySelectorAll('.search-suggestion-item').forEach(item => {
        item.onclick = () => { window.location.href = `product.html?id=${item.dataset.id}`; };
      });
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search-container')) box.style.display = 'none'; });
  },

  index() {
    const renderGrid = (id, filter = () => true) => {
      const el = document.getElementById(id); if (!el) return;
      const items = getProducts().filter(filter).slice(0, 4);
      el.innerHTML = items.map(p => renderProductCard(p)).join('');
      attachCardEvents();
    };
    renderGrid('featuredGrid', p => p.category === 'men');
    renderGrid('trendingGrid');
    renderGrid('newArrivals', p => p.id > 10);
    renderRecentlyViewed();
  },

  products() {
    const grid = document.querySelector('.products-grid');
    const pagin = document.querySelector('.pagination');
    if (!grid) return;
    let page = 1; const per = 6;
    const render = () => {
      let filtered = getProducts();
      const cat = new URLSearchParams(window.location.search).get('cat');
      if (cat) filtered = filtered.filter(p => p.category === cat);
      const start = (page - 1) * per;
      const pageItems = filtered.slice(start, start + per);
      grid.innerHTML = pageItems.map(p => renderProductCard(p)).join('') || '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No products match your filters.</div>';
      attachCardEvents();
      const total = Math.ceil(filtered.length / per);
      pagin.innerHTML = '';
      for(let i=1; i<=total; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i===page?'active':''}`; btn.textContent = i;
        btn.onclick = () => { page=i; render(); window.scrollTo({top:0, behavior:'smooth'}); };
        pagin.appendChild(btn);
      }
    };
    document.querySelectorAll('.filter-chip, .sort-select').forEach(el => el.addEventListener('change', () => { page=1; render(); }));
    render();
  },

  product() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const p = getProducts().find(x => x.id === id);
    if (!p) { document.querySelector('main').innerHTML = '<h2 style="text-align:center;padding:4rem;">Product not found</h2>'; return; }
    if (!JSON.parse(localStorage.getItem('recentlyViewed') || '[]').includes(id)) {
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      viewed.unshift(id);
      localStorage.setItem('recentlyViewed', JSON.stringify(viewed.slice(0, 8)));
    }
    const container = document.querySelector('.product-detail');
    if (!container) return;
    container.innerHTML = `
      <div class="product-gallery"><img src="https://placehold.co/600x600/${p.color?.replace('#','')||'e2e8f0'}/1e293b?text=${encodeURIComponent(p.name)}" class="main-img"><div class="thumbs">${[1,2,3].map(() => `<div class="thumb" style="background:linear-gradient(135deg,${p.color||'#f5f5f5'},#fff)"></div>`).join('')}</div></div>
      <div class="detail-info">
        <h1>${p.name}</h1>
        <div class="detail-rating">${getStarHTML(p.rating)} (${p.rating}) • ${p.reviews} reviews</div>
        <div class="detail-price">₹${p.price.toLocaleString()}</div>
        <p style="color:var(--text-secondary); margin:1rem 0; line-height:1.8;">${p.description}</p>
        <div class="filter-group"><label>Size</label><div class="size-selector" id="sizeSelector">${['S','M','L','XL'].map(s => `<button class="size-btn">${s}</button>`).join('')}</div></div>
        <div class="filter-group"><label>Quantity</label><div class="qty-selector"><button class="qty-btn" id="decQty">-</button><span class="qty-val" id="qtyVal">1</span><button class="qty-btn" id="incQty">+</button></div></div>
        <div class="cart-actions">
          <button class="btn btn-primary" id="addToCartBtn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
          <button class="btn btn-outline" id="wishlistBtn" style="width:auto;padding:0 1.2rem;"><i class="far fa-heart"></i></button>
        </div>
      </div>`;
    document.querySelectorAll('.size-btn').forEach(btn => btn.onclick = (e) => { document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active')); e.target.classList.add('active'); });
    let qty = 1;
    document.getElementById('incQty').onclick = () => { document.getElementById('qtyVal').textContent = ++qty; };
    document.getElementById('decQty').onclick = () => { const el = document.getElementById('qtyVal'); if(parseInt(el.textContent)>1) el.textContent = --qty; };
    document.getElementById('addToCartBtn').onclick = () => {
      const size = document.querySelector('.size-btn.active')?.textContent || 'M';
      addToCart(p, qty, size);
    };
    const isWished = JSON.parse(localStorage.getItem('wishlist')||'[]').some(i=>i.id===p.id);
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.innerHTML = `<i class="${isWished?'fas':'far'} fa-heart"></i>`;
    wishlistBtn.onclick = () => { toggleWishlist(p); wishlistBtn.innerHTML = `<i class="${JSON.parse(localStorage.getItem('wishlist')||'[]').some(i=>i.id===p.id)?'fas':'far'} fa-heart"></i>`; };
  },

  cart() {
    const container = document.querySelector('.cart-items');
    const summary = document.querySelector('.cart-summary');
    if (!container) return;
    const render = () => {
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:4rem;"><i class="fas fa-shopping-bag" style="font-size:4rem; color:var(--text-muted);"></i><p style="margin-top:1rem;">Your cart is empty.</p><a href="products.html" class="btn btn-outline" style="margin-top:1rem;">Continue Shopping</a></div>`;
      } else {
        container.innerHTML = cart.map((item, i) => `
          <div class="cart-item">
            <img src="https://placehold.co/100x100/${item.color?.replace('#','')||'e2e8f0'}/1e293b?text=${encodeURIComponent(item.name)}" class="cart-img">
            <div><h3>${item.name}</h3><p style="color:var(--text-muted); font-size:var(--text-sm);">Size: ${item.size||'M'} • ₹${item.price.toLocaleString()}</p>
              <div class="qty-selector" style="margin:0.8rem 0;">
                <button class="qty-btn" data-idx="${i}" data-op="-">-</button><span class="qty-val">${item.quantity}</span><button class="qty-btn" data-idx="${i}" data-op="+">+</button>
              </div>
              <button class="cart-remove" data-idx="${i}" style="color:var(--accent); background:none; font-size:0.85rem;"><i class="fas fa-trash"></i> Remove</button>
            </div>
            <div style="text-align:right; min-width:80px; font-weight:600;">₹${(item.price * item.quantity).toLocaleString()}</div>
          </div>`).join('');
      }
      const sub = cart.reduce((a,i)=>a+(i.price*i.quantity),0);
      summary.innerHTML = `
        <h3 style="margin-bottom:1.5rem;">Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>₹${sub.toLocaleString()}</span></div>
        <div class="summary-row"><span>Shipping</span><span>Free</span></div>
        <div class="summary-row"><span>Tax (15%)</span><span>₹${Math.round(sub*0.15).toLocaleString()}</span></div>
        <div class="summary-row total"><span>Total</span><span style="color:var(--accent);">₹${Math.round(sub*1.15).toLocaleString()}</span></div>
        <button id="checkoutBtn" class="btn btn-primary btn-block" ${cart.length===0?'disabled':''}>Proceed to Checkout</button>`;
      document.getElementById('checkoutBtn')?.addEventListener('click', () => window.location.href = 'checkout.html');
      container.onclick = e => {
        const btn = e.target.closest('.qty-btn');
        if (btn) {
          const i = parseInt(btn.dataset.idx); const op = btn.dataset.op;
          const cart = JSON.parse(localStorage.getItem('cart')||'[]');
          if (op === '-' && cart[i].quantity > 1) cart[i].quantity--;
          else if (op === '+') cart[i].quantity++;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateNavCounts(); render();
        }
        const rm = e.target.closest('.cart-remove');
        if (rm) { 
          const cart = JSON.parse(localStorage.getItem('cart')||'[]');
          cart.splice(parseInt(rm.dataset.idx), 1); 
          localStorage.setItem('cart', JSON.stringify(cart)); 
          showToast('Removed', 'info'); 
          updateNavCounts(); render(); 
        }
      };
    };
    render();
  },

  // 🔐 ONLY CHANGE: Auth function now uses Worker
  auth() {
    const isLogin = window.location.pathname.includes('login');
    const title = document.querySelector('.auth-title');
    const form = document.querySelector('.auth-form');
    const submitBtn = form?.querySelector('button[type="submit"]');

    if (title) title.textContent = isLogin ? 'Welcome Back' : 'Create Account';
    if (submitBtn) submitBtn.textContent = isLogin ? 'Login' : 'Create Account';

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Processing...';

      try {
        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        const res = await fetchWithAuth(endpoint, {
          method: 'POST',
          body: JSON.stringify({
            name: document.getElementById('nameField')?.value || '',
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');

        form.reset();
        showToast(data.message, 'success');
        
        if (data.user) {
          localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify({ name: data.user.name, email: data.user.email }));
        }

        setTimeout(() => {
          window.location.href = isLogin ? 'index.html' : 'login.html';
        }, 800);

      } catch (err) {
        showToast(err.message, 'error');
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  },

  admin() {
    const table = document.querySelector('.admin-table tbody');
    const modal = document.querySelector('.admin-modal');
    const form = document.getElementById('adminForm');
    if (!table) return;
    const renderTable = () => {
      table.innerHTML = getProducts().map(p => `
        <tr><td>${p.id}</td><td><img src="https://placehold.co/60x60/${p.color?.replace('#','')||'e2e8f0'}/1e293b?text=${encodeURIComponent(p.name)}" style="width:60px;height:60px;object-fit:cover;border-radius:var(--radius-sm);"></td>
        <td>${p.name}</td><td>₹${p.price.toLocaleString()}</td><td>${p.category}</td>
        <td class="admin-actions"><button class="edit-btn" data-id="${p.id}"><i class="fas fa-edit"></i></button><button class="delete-btn" data-id="${p.id}"><i class="fas fa-trash"></i></button></td></tr>`).join('');
    };
    document.querySelectorAll('.edit-btn').forEach(b => b.onclick = () => {
      const p = getProducts().find(x => x.id == b.dataset.id);
      form.dataset.edit = p.id; form.name.value = p.name; form.price.value = p.price; form.category.value = p.category;
      modal.classList.add('active');
    });
    document.querySelectorAll('.delete-btn').forEach(b => b.onclick = () => { if(confirm('Delete?')) { 
      const custom = JSON.parse(localStorage.getItem('customProducts')||'[]').filter(x => x.id != b.dataset.id);
      localStorage.setItem('customProducts', JSON.stringify(custom)); 
      renderTable(); showToast('Deleted', 'info'); 
    }});
    document.querySelector('.add-product-btn').onclick = () => { delete form.dataset.edit; form.reset(); modal.classList.add('active'); };
    document.querySelector('.close-modal').onclick = () => { modal.classList.remove('active'); };
    form.onsubmit = e => {
      e.preventDefault();
      const d = { id: form.dataset.edit ? parseInt(form.dataset.edit) : Date.now(), name: form.name.value, price: parseFloat(form.price.value), category: form.category.value, color: '#e2e8f0', description: 'Admin added.', rating: 4.0, reviews: 0, trending: false, newArrival: true, sizes: ['S','M','L','XL'], originalPrice: null };
      if (form.dataset.edit) { 
        const custom = JSON.parse(localStorage.getItem('customProducts')||'[]');
        const i = custom.findIndex(x => x.id == d.id);
        if(i>=0) custom[i] = { ...custom[i], ...d };
        localStorage.setItem('customProducts', JSON.stringify(custom));
        showToast('Updated ✅'); 
      } else { 
        const custom = JSON.parse(localStorage.getItem('customProducts')||'[]');
        custom.push(d);
        localStorage.setItem('customProducts', JSON.stringify(custom));
        showToast('Added 📦'); 
      }
      renderTable(); modal.classList.remove('active');
    };
    renderTable();
  },

  checkout() {
    const session = JSON.parse(localStorage.getItem(AUTH_CONFIG.SESSION_KEY) || 'null');
    if (!session) { showToast('Login required ⚠️', 'warning'); window.location.href = 'login.html'; return; }
    document.querySelector('.checkout-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      const orders = JSON.parse(localStorage.getItem('orders')||'[]');
      orders.push({ id: orderId, date: Date.now(), items: [...cart], total: cart.reduce((a,i)=>a+i.price*i.quantity,0)*1.15, status: 'Processing' });
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('cart', JSON.stringify([]));
      updateNavCounts();
      showToast(`Order ${orderId} placed! 🎉`, 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    });
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const sub = cart.reduce((a,i)=>a+i.price*i.quantity,0);
    document.querySelector('.checkout-summary').innerHTML = `<div class="summary-row"><span>Subtotal</span><span>₹${sub.toLocaleString()}</span></div><div class="summary-row total"><span>Total</span><span>₹${Math.round(sub*1.15).toLocaleString()}</span></div>`;
  }
};


if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage);
else initPage();

function initPage() {
  const page = document.body.dataset.page || 'index';
  Pages.initNavbar();
  Pages.initSearch();
  if (Pages[page]) Pages[page]();
  else Pages.index();
}
