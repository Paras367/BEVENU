/* ============================================================
   BEVENU - E-Commerce JavaScript
   ============================================================ */

// ============================================================
// PRODUCT DATA
// ============================================================
const DEFAULT_PRODUCTS = [
  // WOMEN
  { id: 1, name: 'Floral Wrap Dress', category: 'women', price: 1299, originalPrice: 1999, rating: 4.8, reviews: 324, color: '#fce7f3', sizes: ['XS','S','M','L','XL'], trending: true, newArrival: false, description: 'Elegant floral wrap dress crafted from breathable chiffon fabric. Perfect for summer evenings and casual outings.' },
  { id: 2, name: 'Linen Wide-Leg Pants', category: 'women', price: 1599, originalPrice: 2499, rating: 4.6, reviews: 218, color: '#fef3c7', sizes: ['S','M','L','XL'], trending: true, newArrival: true, description: 'Relaxed linen wide-leg trousers with an elastic waistband for all-day comfort.' },
  { id: 3, name: 'Silk Camisole Top', category: 'women', price: 899, originalPrice: null, rating: 4.5, reviews: 156, color: '#ffe4e6', sizes: ['XS','S','M','L'], trending: false, newArrival: true, description: 'Luxurious silk-satin camisole with adjustable straps. Versatile for day or night styling.' },
  { id: 4, name: 'Embroidered Kurti Set', category: 'women', price: 2199, originalPrice: 3499, rating: 4.9, reviews: 442, color: '#f0fdf4', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: false, description: 'Intricately embroidered ethnic kurti with matching palazzo. A festive favourite.' },
  { id: 5, name: 'Blazer & Trouser Set', category: 'women', price: 3499, originalPrice: 5999, rating: 4.7, reviews: 187, color: '#f5f3ff', sizes: ['S','M','L','XL'], trending: false, newArrival: true, description: 'Tailored blazer and straight-cut trouser co-ord set in premium crepe fabric.' },
  { id: 6, name: 'Ruched Bodycon Dress', category: 'women', price: 1099, originalPrice: 1599, rating: 4.4, reviews: 293, color: '#fce7f3', sizes: ['XS','S','M','L'], trending: true, newArrival: false, description: 'Figure-flattering ruched bodycon dress in a stretchy jersey fabric.' },

  // MEN
  { id: 7, name: 'Slim Fit Oxford Shirt', category: 'men', price: 999, originalPrice: 1499, rating: 4.6, reviews: 389, color: '#dbeafe', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: false, description: 'Classic slim-fit Oxford shirt in breathable 100% cotton. A wardrobe staple.' },
  { id: 8, name: 'Cargo Jogger Pants', category: 'men', price: 1399, originalPrice: 1999, rating: 4.5, reviews: 267, color: '#f0fdf4', sizes: ['S','M','L','XL','XXL'], trending: true, newArrival: true, description: 'Functional cargo joggers with multiple pockets and an adjustable waistband.' },
  { id: 9, name: 'Premium Polo T-Shirt', category: 'men', price: 799, originalPrice: null, rating: 4.7, reviews: 512, color: '#fef9c3', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: false, description: 'Pique cotton polo with ribbed collar and cuffs. Available in 8 colours.' },
  { id: 10, name: 'Denim Jacket Classic', category: 'men', price: 2499, originalPrice: 3499, rating: 4.8, reviews: 203, color: '#dbeafe', sizes: ['S','M','L','XL'], trending: true, newArrival: true, description: 'Vintage-washed denim jacket with button closures and front pockets.' },
  { id: 11, name: 'Formal Blazer Navy', category: 'men', price: 4999, originalPrice: 7999, rating: 4.9, reviews: 128, color: '#e0e7ff', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: false, description: 'Single-breasted formal blazer in wool-blend fabric. Perfect for boardroom looks.' },
  { id: 12, name: 'Linen Kurta Set', category: 'men', price: 1799, originalPrice: 2499, rating: 4.5, reviews: 334, color: '#fef3c7', sizes: ['S','M','L','XL','XXL'], trending: false, newArrival: true, description: 'Relaxed linen kurta and pyjama set, ideal for festive and casual occasions.' },

  // KIDS
  { id: 13, name: 'Dinosaur Print Tee', category: 'kids', price: 399, originalPrice: 599, rating: 4.8, reviews: 678, color: '#dcfce7', sizes: ['XS','S','M'], trending: true, newArrival: false, description: 'Fun dinosaur print t-shirt in soft organic cotton, available in sizes 2–12 years.' },
  { id: 14, name: 'Floral Frock Dress', category: 'kids', price: 699, originalPrice: 999, rating: 4.7, reviews: 421, color: '#fce7f3', sizes: ['XS','S','M','L'], trending: false, newArrival: true, description: 'Adorable floral frock in breathable cotton blend. Features a back bow tie.' },
  { id: 15, name: 'Denim Dungaree Set', category: 'kids', price: 899, originalPrice: 1299, rating: 4.6, reviews: 289, color: '#dbeafe', sizes: ['XS','S','M'], trending: true, newArrival: false, description: 'Comfortable denim dungaree with adjustable straps. Ideal for playful toddlers.' },
  { id: 16, name: 'Ethnic Sherwani Set', category: 'kids', price: 1499, originalPrice: 2199, rating: 4.9, reviews: 156, color: '#fef9c3', sizes: ['S','M','L'], trending: false, newArrival: true, description: 'Traditional sherwani with matching churidaar. Perfect for weddings and festivities.' },

  // ACCESSORIES
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

  // Stagger animation
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
// CART SYSTEM
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
// WISHLIST SYSTEM
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
// RECENTLY VIEWED
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
// TOAST NOTIFICATIONS
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
// THEME TOGGLE (DARK MODE)
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

// ============================================================
// USER SESSION
// ============================================================
function checkUserSession() {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const display = document.getElementById('user-display');
  const loginBtn = document.getElementById('login-btn');

  if (user && display) {
    display.textContent = user.name.split(' ')[0];
    if (loginBtn) {
      loginBtn.href = '#';
      loginBtn.onclick = () => {
        if (confirm(`Logout as ${user.name}?`)) {
          localStorage.removeItem('currentUser');
          window.location.reload();
        }
      };
    }
  }
}

// ============================================================
// SEARCH & SUGGESTIONS
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
// HAMBURGER MENU
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

  // Sticky navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Wishlist button
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

  // Intersection Observer for animations
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
});

// ============================================================
// QUICK VIEW (Simple modal)
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
