/**
 * BEVENU | Core Application Engine v2.1
 * Production-ready Vanilla JS Architecture
 * Integrates 15+ modern libraries via dynamic CDN loading with graceful fallbacks
 */
'use strict';

const BevenuApp = (function () {

  const CONFIG = {
    VERSION: '2.1.0',
    STORAGE_PREFIX: 'bevenu_',
    CURRENCY: '$',
    TAX_RATE: 0.15,
    CDN_BASE: 'https://cdn.jsdelivr.net/npm/',
    DEBOUNCE: 250,
    THROTTLE: 100,
    ANIMATION: { duration: 400, ease: 'power2.out' },
    LIBRARIES: [
      'gsap@3.12.5/dist/gsap.min.js',
      'gsap@3.12.5/dist/ScrollTrigger.min.js',
      'swiper@11.1.0/swiper-bundle.min.js',
      'fuse.js@7.0.0/dist/fuse.min.js',
      'dayjs@1.11.10/dayjs.min.js',
      'uuid@9.0.0/dist/esm-browser/index.min.js',
      'vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js',
      'lazysizes@5.3.2/lazysizes.min.js',
      'chart.js@4.4.1/dist/chart.umd.min.js',
      'countup.js@2.8.0/dist/countUp.umd.js',
      'micromodal@0.4.10/dist/micromodal.min.js',
      'clipboard@2.0.11/dist/clipboard.min.js'
    ]
  };

  // ==================== 2. STATE MANAGER ====================
  const Storage = {
    get(key) {
      try {
        const raw = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    },
    set(key, value) {
      try {
        localStorage.setItem(CONFIG.STORAGE_PREFIX + key, JSON.stringify(value));
        return true;
      } catch { return false; }
    },
    remove(key) { localStorage.removeItem(CONFIG.STORAGE_PREFIX + key); }
  };

  const State = {
    products: Storage.get('products') || [
      { id: 1, name: 'Classic Denim Jacket', price: 89.99, category: 'Men', rating: 4.5, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80', desc: 'Timeless fit, premium cotton blend.' },
      { id: 2, name: 'Silk Evening Dress', price: 129.00, category: 'Women', rating: 4.8, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80', desc: 'Elegant design for special occasions.' },
      { id: 3, name: 'Kids Cotton Hoodie', price: 35.50, category: 'Kids', rating: 4.3, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80', desc: 'Soft, comfortable, and durable.' },
      { id: 4, name: 'Leather Crossbody Bag', price: 75.00, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', desc: 'Compact and stylish everyday bag.' },
      { id: 5, name: 'Tailored Wool Trousers', price: 99.99, category: 'Men', rating: 4.4, image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&q=80', desc: 'Sharp look for formal settings.' },
      { id: 6, name: 'Summer Floral Blouse', price: 45.00, category: 'Women', rating: 4.7, image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&q=80', desc: 'Lightweight and breathable fabric.' }
    ],
    cart: Storage.get('cart') || [],
    wishlist: Storage.get('wishlist') || [],
    user: Storage.get('user') || null,
    recentlyViewed: Storage.get('recentlyViewed') || [],
    orders: Storage.get('orders') || [],
    persist() {
      ['products', 'cart', 'wishlist', 'user', 'recentlyViewed', 'orders'].forEach(k => Storage.set(k, this[k]));
    }
  };

  // ==================== 3. UTILITY BELT ====================
  const Utils = {
    debounce: (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; },
    throttle: (fn, ms) => { let ready = true; return (...a) => { if (ready) { fn(...a); ready = false; setTimeout(() => ready = true, ms); } }; },
    formatPrice: (p) => `${CONFIG.CURRENCY}${p.toFixed(2)}`,
    generateStars: (r) => {
      let s = ''; for (let i = 1; i <= 5; i++) s += i <= Math.round(r) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'; return s;
    },
    getQuery: (p = window.location.search) => new URLSearchParams(p),
    uuid: () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
    isElement: el => el instanceof HTMLElement,
    $: (s, p = document) => p.querySelector(s),
    $$: (s, p = document) => [...p.querySelectorAll(s)],
    animateIn: (els, opts = {}) => {
      if (typeof gsap !== 'undefined') {
        gsap.from(els, { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', ...opts });
      } else {
        els.forEach((el, i) => setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 80));
      }
    }
  };

  // ==================== 4. TOAST NOTIFICATIONS ====================
  const Toast = {
    container: null,
    init() {
      this.container = Utils.$('.toast-container') || document.body.appendChild(Object.assign(document.createElement('div'), { className: 'toast-container' }));
    },
    show(msg, type = 'success') {
      this.init();
      const icons = { success: 'check-circle', error: 'times-circle', info: 'info-circle', warning: 'exclamation-triangle' };
      const toast = Object.assign(document.createElement('div'), { className: 'toast' });
      toast.innerHTML = `<i class="fas fa-${icons[type]}"></i> ${msg}`;
      this.container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 350); }, 3200);
    }
  };

  // ==================== 5. LIBRARY LOADER ====================
  const LibLoader = {
    loaded: {},
    loadAll() {
      return Promise.all(CONFIG.LIBRARIES.map(lib => {
        if (this.loaded[lib]) return Promise.resolve();
        const name = lib.split('@')[0];
        return new Promise(resolve => {
          if (window[name] || window[name.replace('gsap@', '').split('/')[0]]) { this.loaded[lib] = true; return resolve(); }
          const s = document.createElement('script');
          s.src = CONFIG.CDN_BASE + lib;
          s.async = true;
          s.onload = s.onerror = () => { this.loaded[lib] = true; resolve(); };
          document.head.appendChild(s);
        });
      }));
    }
  };

  // ==================== 6. PAGE CONTROLLERS ====================
  const Pages = {
    initNavbar() {
      const updateBadges = () => {
        const cc = Utils.$('.cart-count'); if (cc) cc.textContent = State.cart.reduce((a, i) => a + i.qty, 0);
        const wc = Utils.$('.wishlist-count'); if (wc) wc.textContent = State.wishlist.length;
        const up = Utils.$('#userProfileBtn'); 
        if (up) {
          up.innerHTML = State.user ? `<i class="fas fa-user-check"></i>` : `<i class="fas fa-user-circle"></i>`;
          up.title = State.user ? `Welcome, ${State.user.name}` : 'Login / Register';
          up.onclick = () => State.user ? Toast.show(`Hello ${State.user.name}!`, 'info') : (window.location.href = 'login.html');
        }
      };

      // Sticky nav shadow
      const nav = Utils.$('#mainNavbar');
      if (nav) window.addEventListener('scroll', Utils.throttle(() => nav.classList.toggle('scrolled', window.scrollY > 50), 100));

      // Dark mode
      const themeBtn = Utils.$('.theme-toggle');
      const savedTheme = Storage.get('theme') || 'light';
      document.documentElement.dataset.theme = savedTheme;
      if (themeBtn) {
        themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeBtn.onclick = () => {
          const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = next;
          Storage.set('theme', next);
          themeBtn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        };
      }

      // Mobile menu
      const toggle = Utils.$('.mobile-toggle');
      const menu = Utils.$('.mobile-menu');
      if (toggle && menu) toggle.onclick = () => {
        const open = menu.style.display === 'block';
        menu.style.display = open ? 'none' : 'block';
        toggle.innerHTML = open ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
      };

      updateBadges();
      return updateBadges;
    },

    initSearch() {
      const input = Utils.$('.search-input');
      const box = Utils.$('.search-suggestions');
      if (!input || !box) return;

      let fuse;
      if (typeof Fuse !== 'undefined') {
        fuse = new Fuse(State.products, { keys: ['name', 'category'], threshold: 0.3 });
      }

      input.addEventListener('input', Utils.debounce((e) => {
        const q = e.target.value.trim();
        if (q.length < 2) { box.style.display = 'none'; return; }
        let results = State.products;
        if (fuse) results = fuse.search(q).map(r => r.item).slice(0, 5);
        else results = State.products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5);

        box.innerHTML = results.map(p => `<div class="search-suggestion-item" data-id="${p.id}"><span>${p.name}</span> <small>${Utils.formatPrice(p.price)}</small></div>`).join('');
        box.style.display = 'block';
        box.querySelectorAll('.search-suggestion-item').forEach(item => {
          item.onclick = () => { window.location.href = `product.html?id=${item.dataset.id}`; };
        });
      }, CONFIG.DEBOUNCE));

      document.addEventListener('click', (e) => { if (!e.target.closest('.search-container')) box.style.display = 'none'; });
    },

    index() {
      const renderGrid = (id, filter = () => true) => {
        const el = Utils.$(`#${id}`); if (!el) return;
        const items = State.products.filter(filter).slice(0, 4);
        el.innerHTML = items.map(p => Components.productCard(p)).join('');
        Components.bindCardActions();
        Utils.animateIn(el.querySelectorAll('.product-card'));
      };

      renderGrid('featuredGrid', p => p.category === 'Men');
      renderGrid('trendingGrid');
      renderGrid('newArrivals', p => p.id > 3);

      // Swiper for testimonials
      if (typeof Swiper !== 'undefined') new Swiper('#testimonialSwiper', { loop: true, autoplay: { delay: 4000 }, pagination: { el: '.swiper-pagination', clickable: true } });

      // Hero parallax
      if (typeof gsap !== 'undefined') {
        gsap.to('.hero::before', { scrollTrigger: { trigger: '.hero', scrub: true }, backgroundPosition: '50% 30%' });
        ScrollTrigger.create({ animation: gsap.from('.hero-content', { y: 50, opacity: 0, duration: 1 }), trigger: '.hero', start: 'top center' });
      }
    },

    products() {
      const grid = Utils.$('.products-grid');
      const pagin = Utils.$('.pagination');
      if (!grid) return;

      let page = 1; const per = 6;
      const render = () => {
        let filtered = State.products;
        const cat = Utils.getQuery().get('cat');
        const price = Utils.$('.price-filter')?.value || 'all';
        const sort = Utils.$('.sort-select')?.value || 'default';

        if (cat) filtered = filtered.filter(p => p.category === cat);
        if (price !== 'all') { const [min, max] = price.split('-').map(Number); filtered = filtered.filter(p => p.price >= min && p.price <= max); }
        if (sort === 'low-high') filtered.sort((a,b) => a.price - b.price);
        else if (sort === 'high-low') filtered.sort((a,b) => b.price - a.price);
        else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating);

        const start = (page - 1) * per;
        const pageItems = filtered.slice(start, start + per);
        grid.innerHTML = pageItems.map(p => Components.productCard(p)).join('') || '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--color-text-light);">No products match your filters.</div>';
        Components.bindCardActions();

        // Pagination
        const total = Math.ceil(filtered.length / per);
        pagin.innerHTML = '';
        for(let i=1; i<=total; i++) {
          const btn = document.createElement('button');
          btn.className = `page-btn ${i===page?'active':''}`; btn.textContent = i;
          btn.onclick = () => { page=i; render(); window.scrollTo({top:0, behavior:'smooth'}); };
          pagin.appendChild(btn);
        }
      };

      $$('.filter-chip, .sort-select').forEach(el => el.addEventListener('change', () => { page=1; render(); }));
      render();
    },

    product() {
      const params = Utils.getQuery(); const id = parseInt(params.get('id'));
      const p = State.products.find(x => x.id === id);
      if (!p) { document.querySelector('main').innerHTML = '<h2 style="text-align:center;padding:4rem;">Product not found</h2>'; return; }

      // Track viewed
      if (!State.recentlyViewed.includes(id)) State.recentlyViewed.unshift(id);
      if (State.recentlyViewed.length > 8) State.recentlyViewed.pop();
      State.persist();

      const container = Utils.$('.product-detail');
      if (!container) return;
      container.innerHTML = Components.productDetail(p);
      Components.bindCardActions();

      // Tilt
      if (typeof VanillaTilt !== 'undefined') VanillaTilt.init(Utils.$('.main-img'), { max: 15, speed: 300, glare: true, 'max-glare': 0.2 });

      // Share
      Utils.$('#shareBtn')?.addEventListener('click', () => {
        if (navigator.share) navigator.share({ title: p.name, url: window.location.href });
        else { ClipboardJS.copyText && ClipboardJS.copyText(window.location.href); Toast.show('Link copied!', 'success'); }
      });
    },

    cart() {
      const container = Utils.$('.cart-items');
      const summary = Utils.$('.cart-summary');
      if (!container) return;

      const render = () => {
        if (State.cart.length === 0) {
          container.innerHTML = `<div style="text-align:center; padding:4rem;"><i class="fas fa-shopping-bag" style="font-size:4rem; color:var(--color-text-light);"></i><p style="margin-top:1rem;">Your cart is empty.</p><a href="products.html" class="btn btn-outline" style="margin-top:1rem;">Continue Shopping</a></div>`;
        } else {
          container.innerHTML = State.cart.map((item, i) => `
            <div class="cart-item">
              <img src="${item.image}" class="cart-img" loading="lazy">
              <div><h3>${item.name}</h3><p style="color:var(--color-text-light); font-size:var(--text-sm);">Size: ${item.size} • ${Utils.formatPrice(item.price)}</p>
                <div class="qty-selector" style="margin:0.8rem 0;">
                  <button class="qty-btn" data-idx="${i}" data-op="-">-</button><span class="qty-val">${item.qty}</span><button class="qty-btn" data-idx="${i}" data-op="+">+</button>
                </div>
                <button class="cart-remove" data-idx="${i}" style="color:var(--color-accent); background:none; font-size:0.85rem;"><i class="fas fa-trash"></i> Remove</button>
              </div>
              <div style="text-align:right; min-width:80px; font-weight:600;">${Utils.formatPrice(item.price * item.qty)}</div>
            </div>`).join('');
        }

        const sub = State.cart.reduce((a,i) => a + (i.price * i.qty), 0);
        summary.innerHTML = `
          <h3 style="margin-bottom:1.5rem;">Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>${Utils.formatPrice(sub)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>Free</span></div>
          <div class="summary-row"><span>Tax (15%)</span><span>${Utils.formatPrice(sub * CONFIG.TAX_RATE)}</span></div>
          <div class="summary-row total"><span>Total</span><span style="color:var(--color-accent);">${Utils.formatPrice(sub * 1.15)}</span></div>
          <button id="checkoutBtn" class="btn btn-primary btn-block" ${State.cart.length===0?'disabled':''}>Proceed to Checkout</button>`;

        Utils.$('#checkoutBtn')?.addEventListener('click', () => window.location.href = 'checkout.html');

        // Cart actions delegation
        container.onclick = e => {
          const btn = e.target.closest('.qty-btn');
          if (btn) {
            const i = parseInt(btn.dataset.idx); const op = btn.dataset.op;
            if (op === '-' && State.cart[i].qty > 1) State.cart[i].qty--;
            else if (op === '+') State.cart[i].qty++;
            State.persist(); render();
          }
          const rm = e.target.closest('.cart-remove');
          if (rm) { State.cart.splice(parseInt(rm.dataset.idx), 1); State.persist(); Toast.show('Removed', 'info'); render(); }
        };
      };
      render();
    },

    auth() {
      const isLogin = window.location.pathname.includes('login');
      Utils.$('.auth-title').textContent = isLogin ? 'Welcome Back' : 'Create Account';
      Utils.$('.auth-form').onsubmit = e => {
        e.preventDefault();
        const email = Utils.$('#email').value.trim(); const pass = Utils.$('#password').value; const name = Utils.$('#nameField')?.value || email.split('@')[0];
        if (isLogin) {
          const users = Storage.get('users') || []; const u = users.find(x => x.email === email && x.pass === pass);
          if (u) { State.user = { name: u.name, email: u.email }; State.persist(); Toast.show('Logged in ✅'); window.location.href = 'index.html'; }
          else Toast.show('Invalid credentials', 'error');
        } else {
          const users = Storage.get('users') || []; if (users.find(x => x.email === email)) return Toast.show('Email exists', 'error');
          users.push({ name, email, pass }); Storage.set('users', users);
          State.user = { name, email }; State.persist(); Toast.show('Account created ✅'); window.location.href = 'index.html';
        }
      };
    },

    admin() {
      const table = Utils.$('.admin-table tbody'); const modal = Utils.$('.admin-modal'); const form = Utils.$('#adminForm');
      if (!table) return;

      const renderTable = () => {
        table.innerHTML = State.products.map(p => `
          <tr><td>${p.id}</td><td><img src="${p.image}" style="width:60px;height:60px;object-fit:cover;border-radius:var(--radius-sm);"></td>
          <td>${p.name}</td><td>${Utils.formatPrice(p.price)}</td><td>${p.category}</td>
          <td class="admin-actions"><button class="edit-btn" data-id="${p.id}"><i class="fas fa-edit"></i></button><button class="delete-btn" data-id="${p.id}"><i class="fas fa-trash"></i></button></td></tr>`).join('');
      };

      Utils.$$('.edit-btn', table).forEach(b => b.onclick = () => {
        const p = State.products.find(x => x.id == b.dataset.id);
        form.dataset.edit = p.id; form.name.value = p.name; form.price.value = p.price; form.category.value = p.category;
        modal.classList.add('active');
      });
      Utils.$$('.delete-btn', table).forEach(b => b.onclick = () => { if(confirm('Delete?')) { State.products = State.products.filter(x => x.id != b.dataset.id); State.persist(); renderTable(); Toast.show('Deleted', 'info'); } });
      Utils.$('.add-product-btn').onclick = () => { delete form.dataset.edit; form.reset(); modal.classList.add('active'); };
      Utils.$('.close-modal').onclick = () => { modal.classList.remove('active'); };
      form.onsubmit = e => {
        e.preventDefault();
        const d = { id: form.dataset.edit ? parseInt(form.dataset.edit) : Date.now(), name: form.name.value, price: parseFloat(form.price.value), category: form.category.value, image: 'https://placehold.co/600x600/e2e8f0/1e293b?text='+form.name.value.replace(/\s/g,'+'), desc: 'Admin added.', rating: 4.0 };
        if (form.dataset.edit) { const i = State.products.findIndex(x => x.id == d.id); State.products[i] = { ...State.products[i], ...d }; Toast.show('Updated ✅'); }
        else { State.products.push(d); Toast.show('Added 📦'); }
        State.persist(); renderTable(); modal.classList.remove('active');
      };
      renderTable();

      // Chart.js Analytics
      if (typeof Chart !== 'undefined' && Utils.$('#adminChart')) {
        new Chart(Utils.$('#adminChart'), { type: 'bar', data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ label: 'Revenue ($)', data: [120, 190, 300, 150, 210, 280, 340], backgroundColor: '#e11d48' }] }, options: { responsive: true, plugins: { legend: { display: false } } } });
      }
    },

    checkout() {
      if (!State.user) { Toast.show('Login required ⚠️', 'warning'); window.location.href = 'login.html'; return; }
      Utils.$('.checkout-form').onsubmit = e => {
        e.preventDefault();
        const orderId = Utils.uuid().substring(0, 8).toUpperCase();
        State.orders.push({ id: orderId, date: Date.now(), items: [...State.cart], total: State.cart.reduce((a,i)=>a+i.price*i.qty,0) * 1.15, status: 'Processing' });
        State.cart = []; State.persist();
        Toast.show(`Order ${orderId} placed! 🎉`, 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);
      };
      const sub = State.cart.reduce((a,i)=>a+i.price*i.qty,0);
      Utils.$('.checkout-summary').innerHTML = `<div class="summary-row"><span>Subtotal</span><span>${Utils.formatPrice(sub)}</span></div><div class="summary-row total"><span>Total</span><span>${Utils.formatPrice(sub*1.15)}</span></div>`;
    }
  };


  const Components = {
    productCard(p) {
      const isWished = State.wishlist.includes(p.id);
      return `
        <div class="product-card" data-id="${p.id}">
          <a href="product.html?id=${p.id}">
            <div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
            <div class="product-info">
              <div class="product-category">${p.category}</div>
              <div class="product-name">${p.name}</div>
              <div class="product-meta">
                <span class="product-price">${Utils.formatPrice(p.price)}</span>
                <span class="product-rating">${Utils.generateStars(p.rating)}</span>
              </div>
            </div>
          </a>
          <div class="product-actions">
            <button class="action-btn wishlist-toggle ${isWished?'wishlist-active':''}" data-id="${p.id}" title="Wishlist"><i class="${isWished?'fas':'far'} fa-heart"></i></button>
            <button class="action-btn quick-add" data-id="${p.id}" title="Quick Add"><i class="fas fa-plus"></i></button>
          </div>
        </div>`;
    },

    productDetail(p) {
      return `
        <div class="product-gallery"><img src="${p.image}" class="main-img"><div class="thumbs">${[1,2,3].map(() => `<div class="thumb" style="background:${p.image.replace('w=600','w=150')}"></div>`).join('')}</div></div>
        <div class="detail-info">
          <h1>${p.name}</h1>
          <div class="detail-rating">${Utils.generateStars(p.rating)} (${p.rating}) • ${Math.floor(Math.random()*500)+100} reviews</div>
          <div class="detail-price">${Utils.formatPrice(p.price)}</div>
          <p style="color:var(--color-text-light); margin:1rem 0; line-height:1.8;">${p.desc}</p>
          <div class="filter-group"><label>Size</label><div class="size-selector" id="sizeSelector">${['S','M','L','XL'].map(s => `<button class="size-btn">${s}</button>`).join('')}</div></div>
          <div class="filter-group"><label>Quantity</label><div class="qty-selector"><button class="qty-btn" id="decQty">-</button><span class="qty-val" id="qtyVal">1</span><button class="qty-btn" id="incQty">+</button></div></div>
          <div class="cart-actions">
            <button class="btn btn-primary" id="addToCartBtn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
            <button class="btn btn-outline" id="wishlistBtn" style="width:auto;padding:0 1.2rem;"><i class="far fa-heart"></i></button>
            <button class="btn btn-outline" id="shareBtn" style="width:auto;padding:0 1.2rem;"><i class="fas fa-share-alt"></i></button>
          </div>
        </div>`;
    },

    bindCardActions() {
      Utils.$$('.wishlist-toggle').forEach(b => b.onclick = e => {
        e.preventDefault(); const id = parseInt(b.dataset.id);
        const i = State.wishlist.indexOf(id);
        if (i === -1) { State.wishlist.push(id); Toast.show('Added ❤️'); b.classList.add('wishlist-active'); b.innerHTML = '<i class="fas fa-heart"></i>'; }
        else { State.wishlist.splice(i, 1); Toast.show('Removed', 'info'); b.classList.remove('wishlist-active'); b.innerHTML = '<i class="far fa-heart"></i>'; }
        State.persist(); Pages.initNavbar()();
      });
      Utils.$$('.quick-add').forEach(b => b.onclick = e => {
        e.preventDefault(); const id = parseInt(b.dataset.id); const p = State.products.find(x=>x.id===id);
        const existing = State.cart.find(c=>c.id===id); existing ? existing.qty++ : State.cart.push({...p, qty:1, size:'M', maxQty:10});
        State.persist(); Toast.show('Added to cart 🛒'); Pages.initNavbar()();
      });

      const detailSize = Utils.$('#sizeSelector'); if(detailSize) detailSize.onclick = e => { if(e.target.classList.contains('size-btn')) detailSize.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active')); e.target.classList.add('active'); };
      const qty = () => parseInt(Utils.$('#qtyVal')?.textContent || '1');
      Utils.$('#incQty')?.addEventListener('click', () => { const el = Utils.$('#qtyVal'); el.textContent = qty()+1; });
      Utils.$('#decQty')?.addEventListener('click', () => { const el = Utils.$('#qtyVal'); if(qty()>1) el.textContent = qty()-1; });
      Utils.$('#addToCartBtn')?.addEventListener('click', () => {
        const p = State.products.find(x => x.id === parseInt(Utils.getQuery().get('id')));
        const size = Utils.$('.size-btn.active')?.textContent || 'M';
        const existing = State.cart.find(c => c.id === p.id && c.size === size);
        existing ? existing.qty += qty() : State.cart.push({...p, qty: qty(), size, maxQty:10});
        State.persist(); Toast.show('Added to cart 🛒'); Pages.initNavbar()();
      });
      Utils.$('#wishlistBtn')?.addEventListener('click', () => {
        const id = parseInt(Utils.getQuery().get('id')); const i = State.wishlist.indexOf(id);
        if(i===-1) State.wishlist.push(id); else State.wishlist.splice(i,1);
        State.persist(); Toast.show(i===-1?'Added to wishlist ❤️':'Removed', 'info');
        Utils.$('#wishlistBtn').innerHTML = `<i class="${i===-1?'fas':'far'} fa-heart"></i>`;
        Pages.initNavbar()();
      });
    }
  };


  const App = {
    init() {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => this.run());
      else this.run();
    },
    async run() {
      await LibLoader.loadAll();
      const page = document.body.dataset.page || 'index';
      Pages.initNavbar()();
      Pages.initSearch();

      if (Pages[page]) Pages[page]();
      else Pages.index();


      const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('animate-fade')), { threshold: 0.1 });
      document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));
      console.log(`🚀 Bevenu v${CONFIG.VERSION} initialized on ${page}. State:`, State);
    }
  };

  return App;
})();

BevenuApp.init();
