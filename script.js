// State & Config
const state = {
  products: JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Classic Denim Jacket", price: 89.99, category: "Men", rating: 4.5, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=60", desc: "Timeless fit, premium cotton blend." },
    { id: 2, name: "Silk Evening Dress", price: 129.00, category: "Women", rating: 4.8, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=60", desc: "Elegant design for special occasions." },
    { id: 3, name: "Kids Cotton Hoodie", price: 35.50, category: "Kids", rating: 4.3, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=60", desc: "Soft, comfortable, and durable." },
    { id: 4, name: "Leather Crossbody Bag", price: 75.00, category: "Accessories", rating: 4.6, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=60", desc: "Compact and stylish everyday bag." },
    { id: 5, name: "Tailored Wool Trousers", price: 99.99, category: "Men", rating: 4.4, image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&auto=format&fit=crop&q=60", desc: "Sharp look for formal settings." },
    { id: 6, name: "Summer Floral Blouse", price: 45.00, category: "Women", rating: 4.7, image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&auto=format&fit=crop&q=60", desc: "Lightweight and breathable fabric." }
  ],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed')) || []
};

// Core Utilities
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => parent.querySelectorAll(sel);
const saveState = () => {
  localStorage.setItem('products', JSON.stringify(state.products));
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('user', JSON.stringify(state.user));
  localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
};

const toast = (msg, type = 'info') => {
  const container = $('.toast-container') || document.body.appendChild(document.createElement('div')).classList.add('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
};

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
  const page = document.body.dataset.page;
  if (page === 'index') initHome();
  else if (page === 'products') initProducts();
  else if (page === 'product') initProductDetail();
  else if (page === 'cart') initCart();
  else if (page === 'auth') initAuth();
  else if (page === 'admin') initAdmin();
  else if (page === 'checkout') initCheckout();
});

// Navbar Logic
function initNavbar() {
  const countEl = $('.cart-count');
  if (countEl) countEl.textContent = state.cart.reduce((acc, item) => acc + item.qty, 0);
  
  const wishlistCountEl = $('.wishlist-count');
  if (wishlistCountEl) wishlistCountEl.textContent = state.wishlist.length;

  const userBtn = $('#userProfileBtn');
  if (userBtn) {
    userBtn.innerHTML = state.user ? `<i class="fas fa-user"></i>` : `<i class="fas fa-user-circle"></i>`;
    userBtn.title = state.user ? `Welcome, ${state.user.name}` : 'Login';
    if (state.user) userBtn.onclick = () => window.location.href = '/';
  }

  $('.mobile-toggle')?.addEventListener('click', () => {
    $$('.mobile-menu').forEach(el => el.classList.toggle('active'));
  });

  // Search Suggestions
  const searchInput = $('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      const suggestions = $('.search-suggestions');
      if (val.length < 2) { suggestions.style.display = 'none'; return; }
      const filtered = state.products.filter(p => p.name.toLowerCase().includes(val)).slice(0, 5);
      suggestions.innerHTML = filtered.map(p => `<div class="search-suggestion-item" data-id="${p.id}">${p.name} <small>$${p.price}</small></div>`).join('');
      suggestions.style.display = 'block';
      $$('.search-suggestion-item', suggestions).forEach(item => {
        item.onclick = () => { window.location.href = `/product.html?id=${item.dataset.id}`; };
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) $('.search-suggestions').style.display = 'none';
    });
  }

  // Dark Mode Toggle
  $('.theme-toggle')?.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;
  if (savedTheme === 'dark') $('.theme-toggle')?.classList.add('active');
}

// Page Initializers
function initHome() {
  const renderGrid = (containerId, limit, filterFn) => {
    const container = $(`#${containerId}`);
    const items = state.products.filter(filterFn || (() => true)).slice(0, limit);
    container.innerHTML = items.map(productCard).join('');
    initProductCards();
  };

  renderGrid('featuredGrid', 4, p => p.category === 'Men');
  renderGrid('trendingGrid', 4, () => Math.random() > 0.3);
  renderGrid('newArrivals', 4, () => true);
  renderRecentlyViewed();
}

function initProducts() {
  let currentPage = 1;
  const perPage = 6;
  const grid = $('.products-grid');
  const pagin = $('.pagination');
  const renderProducts = () => {
    const priceFilter = $('.price-filter')?.value || 'all';
    const catFilter = $('.category-filter')?.value || 'all';
    const ratingFilter = $('.rating-filter')?.value || 'all';
    const sortVal = $('.sort-select')?.value || 'default';

    let filtered = state.products.filter(p => {
      if (catFilter !== 'all' && p.category !== catFilter) return false;
      if (ratingFilter !== 'all' && Math.floor(p.rating) < parseInt(ratingFilter)) return false;
      if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });

    if (sortVal === 'low-high') filtered.sort((a, b) => a.price - b.price);
    else if (sortVal === 'high-low') filtered.sort((a, b) => b.price - a.price);
    else if (sortVal === 'popularity') filtered.sort((a, b) => b.rating - a.rating);

    const total = filtered.length;
    const start = (currentPage - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);

    grid.innerHTML = pageItems.map(productCard).join('');
    initProductCards();

    pagin.innerHTML = '';
    const pages = Math.ceil(total / perPage);
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.onclick = () => { currentPage = i; renderProducts(); };
      pagin.appendChild(btn);
    }
  };

  $$('.filter-chip, .sort-select').forEach(el => {
    el.addEventListener('change', () => { currentPage = 1; renderProducts(); });
    el.addEventListener('click', (e) => {
      $$('.filter-chip', el.closest('.filter-options') || el).forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      $('.filter-input', el.closest('.filter-group'))?.value = e.target.dataset.value || e.target.textContent;
      currentPage = 1; renderProducts();
    });
  });

  renderProducts();
}

function initProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = state.products.find(p => p.id === id);
  if (!product) { $('main').innerHTML = '<h2 class="animate-fade" style="text-align:center; padding:3rem;">Product not found</h2>'; return; }

  // Update Recently Viewed
  if (!state.recentlyViewed.includes(id)) {
    state.recentlyViewed.unshift(id);
    if (state.recentlyViewed.length > 6) state.recentlyViewed.pop();
    saveState();
  }

  const detail = $('.product-detail-container');
  if (!detail) return;

  const img = product.image.includes('http') ? product.image : `https://placehold.co/600x600/e2e8f0/1e293b?text=${product.name}`;
  detail.innerHTML = `
    <div class="product-gallery">
      <img src="${img}" class="main-img animate-fade" id="mainImg">
      <div class="thumbs">
        <div class="thumb active" style="background:${img.replace('w=600', 'w=150')}"></div>
        <div class="thumb" style="background:${img.replace('w=600', 'w=150')}"></div>
        <div class="thumb" style="background:${img.replace('w=600', 'w=150')}"></div>
      </div>
    </div>
    <div class="product-meta animate-fade">
      <h1>${product.name}</h1>
      <div class="detail-rating">
        ${generateStars(product.rating)} (${product.rating}) • ${Math.floor(Math.random()*500)+50} sold
      </div>
      <p style="color:var(--text-light); margin-bottom:1.5rem; line-height:1.8;">${product.desc}</p>
      <div class="detail-price">$${product.price.toFixed(2)}</div>
      <div class="filter-group">
        <label>Size</label>
        <div class="size-selector" id="sizeSelector">
          ${['S','M','L','XL'].map(s => `<button class="size-btn">${s}</button>`).join('')}
        </div>
      </div>
      <div class="filter-group">
        <label>Quantity</label>
        <div class="qty-selector">
          <button class="qty-btn" id="decQty">-</button>
          <span class="qty-val" id="qtyVal">1</span>
          <button class="qty-btn" id="incQty">+</button>
        </div>
      </div>
      <div class="cart-actions">
        <button class="btn btn-primary btn-block" id="addToCartBtn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
        <button class="btn btn-outline" id="wishlistBtn"><i class="far fa-heart"></i></button>
      </div>
      <div style="margin-top:2rem; border-top:1px solid var(--border); padding-top:1.5rem;">
        <h4 style="margin-bottom:1rem;">Recently Viewed</h4>
        <div class="grid-4" id="recentlyViewedGrid"></div>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyVal = $('#qtyVal');
  $('#incQty').onclick = () => { qtyVal.textContent = ++qty; };
  $('#decQty').onclick = () => { if(qty > 1) qtyVal.textContent = --qty; };
  $$('.size-btn').forEach(btn => btn.onclick = (e) => { $$('.size-btn').forEach(b => b.classList.remove('active')); e.target.classList.add('active'); });
  
  const isWished = state.wishlist.includes(id);
  $('#wishlistBtn').innerHTML = `<i class="fas fa-heart" style="color:${isWished ? 'var(--accent)' : 'inherit'}"></i>`;
  $('#wishlistBtn').onclick = () => {
    const idx = state.wishlist.indexOf(id);
    if (idx === -1) { state.wishlist.push(id); toast('Added to wishlist ❤️'); }
    else { state.wishlist.splice(idx, 1); toast('Removed from wishlist 💔'); }
    saveState(); initNavbar();
    $('#wishlistBtn').innerHTML = `<i class="fas fa-heart" style="color:${idx === -1 ? 'var(--accent)' : 'inherit'}"></i>`;
  };

  $('#addToCartBtn').onclick = () => {
    const size = $('.size-btn.active')?.textContent || 'M';
    const existing = state.cart.find(c => c.id === id && c.size === size);
    if (existing) { existing.qty += qty; toast('Quantity updated in cart 🛒'); }
    else { state.cart.push({ id, name: product.name, price: product.price, image: img, size, qty, maxQty: 10 }); toast('Added to cart 🛒'); }
    saveState(); initNavbar();
  };

  renderRecentlyViewed('#recentlyViewedGrid');
}

function initCart() {
  const container = $('.cart-items');
  const summary = $('.cart-summary');
  if (!container) return;

  const render = () => {
    container.innerHTML = state.cart.length === 0 ? `<div style="text-align:center; padding:3rem;"><i class="fas fa-shopping-bag" style="font-size:4rem; color:var(--text-light);"></i><p style="margin-top:1rem;">Your cart is empty.</p><a href="/products.html" class="btn btn-outline" style="margin-top:1rem;">Continue Shopping</a></div>` :
    state.cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img">
        <div>
          <h3 style="margin-bottom:0.3rem;">${item.name}</h3>
          <p style="color:var(--text-light); font-size:0.9rem;">Size: ${item.size}</p>
          <div class="qty-selector" style="margin:0.8rem 0;">
            <button class="qty-btn cart-dec" data-idx="${idx}">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn cart-inc" data-idx="${idx}">+</button>
          </div>
          <button class="cart-remove" data-idx="${idx}" style="color:var(--accent); font-size:0.85rem; background:none; padding:0;"><i class="fas fa-trash"></i> Remove</button>
        </div>
        <div style="text-align:right; min-width:80px;">
          <strong style="font-size:1.1rem;">$${(item.price * item.qty).toFixed(2)}</strong>
        </div>
      </div>
    `).join('');

    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.15;
    summary.innerHTML = `
      <h3 style="margin-bottom:1.5rem;">Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>Free</span></div>
      <div class="summary-row"><span>Tax (15%)</span><span>$${tax.toFixed(2)}</span></div>
      <div class="summary-row" style="border:none; padding-bottom:0;">
        <span class="total">Total</span><span class="total" style="color:var(--accent);">$${(subtotal + tax).toFixed(2)}</span>
      </div>
      <button id="checkoutBtn" class="btn btn-primary btn-block" ${state.cart.length === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
    `;

    $$('.cart-dec').forEach(btn => btn.onclick = (e) => { updateQty(e.target.dataset.idx, -1); });
    $$('.cart-inc').forEach(btn => btn.onclick = (e) => { updateQty(e.target.dataset.idx, 1); });
    $$('.cart-remove').forEach(btn => btn.onclick = (e) => { removeItem(e.target.dataset.idx); });
    $('#checkoutBtn')?.addEventListener('click', () => window.location.href = '/checkout.html');
  };

  const updateQty = (idx, delta) => {
    if (state.cart[idx].qty + delta <= 0) removeItem(idx);
    else { state.cart[idx].qty += delta; saveState(); render(); }
  };

  const removeItem = (idx) => { state.cart.splice(idx, 1); saveState(); render(); toast('Item removed 🗑️'); };
  render();
}

function initAuth() {
  const path = window.location.pathname;
  const isLogin = path.includes('login');
  $('.auth-title').textContent = isLogin ? 'Welcome Back' : 'Create Account';
  
  $('.auth-form').onsubmit = (e) => {
    e.preventDefault();
    const name = $('#nameField')?.value || 'User';
    const email = $('#email').value;
    const pass = $('#password').value;
    
    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === pass);
      if (user) { state.user = { name: user.name, email: user.email }; saveState(); toast('Logged in successfully ✅'); window.location.href = '/'; }
      else toast('Invalid credentials ❌', 'error');
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === email)) return toast('Email already exists ❌', 'error');
      users.push({ name, email, password: pass });
      localStorage.setItem('users', JSON.stringify(users));
      state.user = { name, email }; saveState(); toast('Account created ✅'); window.location.href = '/';
    }
  };
}

function initAdmin() {
  const table = $('.admin-table tbody');
  const modal = $('.admin-modal');
  const form = $('#adminForm');
  const close = $('.close-modal');

  const renderTable = () => {
    table.innerHTML = state.products.map(p => `
      <tr>
        <td>${p.id}</td>
        <td><img src="${p.image}" style="width:50px; height:50px; border-radius:6px; object-fit:cover;"></td>
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.category}</td>
        <td class="admin-actions">
          <button class="edit-btn" data-id="${p.id}"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" data-id="${p.id}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

    $$('.edit-btn').forEach(btn => {
      btn.onclick = () => {
        const p = state.products.find(x => x.id == btn.dataset.id);
        form.name.value = p.name; form.price.value = p.price; form.category.value = p.category;
        form.dataset.editId = p.id;
        modal.classList.add('active');
      };
    });
    $$('.delete-btn').forEach(btn => {
      btn.onclick = () => {
        if(confirm('Delete product?')) {
          state.products = state.products.filter(p => p.id != btn.dataset.id);
          saveState(); renderTable(); toast('Product deleted 🗑️');
        }
      };
    });
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const data = {
      id: form.dataset.editId ? parseInt(form.dataset.editId) : state.products.length + 1,
      name: form.name.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      image: 'https://placehold.co/600x600/e2e8f0/1e293b?text=Product',
      desc: 'Added via admin panel.',
      rating: 4.0
    };
    
    if (form.dataset.editId) {
      const idx = state.products.findIndex(p => p.id == data.id);
      state.products[idx] = { ...state.products[idx], ...data };
      delete form.dataset.editId;
      toast('Product updated ✅');
    } else {
      state.products.push(data);
      toast('Product added 📦');
    }
    saveState(); renderTable();
    modal.classList.remove('active'); form.reset();
  };

  close.onclick = () => { modal.classList.remove('active'); form.reset(); delete form.dataset.editId; };
  $('.add-product-btn').onclick = () => modal.classList.add('active');
  renderTable();
}

function initCheckout() {
  if (!state.user) { toast('Please login to checkout ⚠️', 'warning'); window.location.href = '/login.html'; return; }
  $('.checkout-form').onsubmit = (e) => {
    e.preventDefault();
    state.cart = []; state.recentlyViewed = []; saveState();
    toast('Order placed successfully! 🎉');
    setTimeout(() => window.location.href = '/', 1500);
  };
  const summary = $('.checkout-summary');
  const total = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  summary.innerHTML = `
    <div class="summary-row"><span>Subtotal (${state.cart.reduce((a,i)=>a+i.qty,0)} items)</span><span>$${total.toFixed(2)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>Free</span></div>
    <div class="summary-row total"><span>Total</span><span>$${(total*1.15).toFixed(2)}</span></div>
  `;
}

// Shared Components
function productCard(p) {
  return `
    <div class="product-card" data-id="${p.id}">
      <a href="/product.html?id=${p.id}">
        <div class="product-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">
            <span class="product-price">$${p.price.toFixed(2)}</span>
            <span class="product-rating">${generateStars(p.rating)} <small style="color:var(--text-light);">(${p.rating})</small></span>
          </div>
        </div>
      </a>
      <div class="product-actions">
        <button class="action-btn wishlist-toggle ${state.wishlist.includes(p.id) ? 'wishlist-active' : ''}" data-id="${p.id}"><i class="fas fa-heart"></i></button>
        <button class="action-btn quick-add" data-id="${p.id}"><i class="fas fa-plus"></i></button>
      </div>
    </div>
  `;
}

function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) stars += i <= Math.round(rating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
  return stars;
}

function initProductCards() {
  $$('.wishlist-toggle').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const idx = state.wishlist.indexOf(id);
      if (idx === -1) { state.wishlist.push(id); toast('Added to wishlist ❤️'); btn.classList.add('wishlist-active'); }
      else { state.wishlist.splice(idx, 1); toast('Removed from wishlist 💔'); btn.classList.remove('wishlist-active'); }
      saveState(); initNavbar();
    };
  });

  $$('.quick-add').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const p = state.products.find(x => x.id === id);
      const existing = state.cart.find(c => c.id === id);
      if (existing) existing.qty += 1; else state.cart.push({ ...p, qty: 1, size: 'M', maxQty: 10 });
      saveState(); initNavbar(); toast('Added to cart 🛒');
    };
  });
}

function renderRecentlyViewed(selector = '#recentlyViewed') {
  const el = $(selector);
  if (!el || state.recentlyViewed.length === 0) return;
  const items = state.recentlyViewed.map(id => state.products.find(p => p.id === id)).filter(Boolean).slice(0, 4);
  el.innerHTML = items.map(productCard).join('');
  initProductCards();
}
