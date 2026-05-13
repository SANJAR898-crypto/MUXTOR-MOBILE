'use strict';

// ========== MAHSULOTLAR ==========
const defaultProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', brand: 'apple', brandName: 'Apple', price: 15000000, oldPrice: 16500000, memory: '256GB', color: 'Titanium Blue', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, isPopular: true, specs: ['256GB', '8GB RAM', '48MP', 'A17 Pro'], description: 'iPhone 15 Pro Max — titanium korpus, A17 Pro chip.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg' },
    { id: 2, name: 'Samsung S24 Ultra', brand: 'samsung', brandName: 'Samsung', price: 14500000, memory: '512GB', color: 'Titanium Gray', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, isPopular: true, specs: ['512GB', '12GB RAM', '200MP'], description: 'Samsung Galaxy S24 Ultra — Galaxy AI.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg' },
    { id: 3, name: 'Xiaomi 14 Pro', brand: 'xiaomi', brandName: 'Xiaomi', price: 9500000, oldPrice: 10500000, memory: '256GB', color: 'Black', condition: 'Yangi', category: 'smartfon', inStock: true, isPopular: true, specs: ['256GB', '12GB RAM', '50MP Leica'], description: 'Xiaomi 14 Pro — Leica optikasi.', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-pro.jpg' },
    { id: 4, name: 'iPhone 14 Pro', brand: 'apple', brandName: 'Apple', price: 10000000, oldPrice: 12000000, memory: '128GB', color: 'Deep Purple', condition: 'Yangi', category: 'smartfon', inStock: true, specs: ['128GB', '6GB RAM', '48MP'], description: 'iPhone 14 Pro — Dynamic Island.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg' },
    { id: 5, name: 'Samsung A55', brand: 'samsung', brandName: 'Samsung', price: 4500000, memory: '256GB', color: 'Iceblue', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, specs: ['256GB', '8GB RAM', '50MP'], description: 'Samsung A55.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg' },
    { id: 6, name: 'Redmi Note 13 Pro', brand: 'xiaomi', brandName: 'Xiaomi', price: 3800000, oldPrice: 4200000, memory: '512GB', color: 'Black', condition: 'Yangi', category: 'smartfon', inStock: true, specs: ['512GB', '12GB RAM', '200MP'], description: 'Redmi Note 13 Pro — 200MP.', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro.jpg' },
    { id: 7, name: 'Redmi Note 12', brand: 'xiaomi', brandName: 'Xiaomi', price: 2500000, oldPrice: 2800000, memory: '128GB', color: 'Blue', condition: 'Yangi', category: 'smartfon', inStock: true, specs: ['128GB', '6GB RAM', '50MP'], description: 'Redmi Note 12.', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-12.jpg' },
    { id: 8, name: 'Redmi 12C', brand: 'xiaomi', brandName: 'Xiaomi', price: 1500000, memory: '64GB', color: 'Gray', condition: 'Yangi', category: 'smartfon', inStock: true, specs: ['64GB', '4GB RAM', '50MP'], description: 'Redmi 12C.', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-12c.jpg' },
    { id: 9, name: 'OnePlus 12', brand: 'oneplus', brandName: 'OnePlus', price: 11000000, memory: '256GB', color: 'Emerald Green', condition: 'Yangi', category: 'smartfon', inStock: true, specs: ['256GB', '16GB RAM', '50MP'], description: 'OnePlus 12.', image: 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg' },
    { id: 10, name: 'Pixel 8 Pro', brand: 'google', brandName: 'Google', price: 12000000, oldPrice: 13000000, memory: '128GB', color: 'Bay Blue', condition: 'Yangi', category: 'smartfon', inStock: false, specs: ['128GB', '12GB RAM', '50MP'], description: 'Pixel 8 Pro.', image: 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg' },
    { id: 11, name: 'iPhone 15', brand: 'apple', brandName: 'Apple', price: 9500000, memory: '128GB', color: 'Pink', condition: 'Yangi', category: 'smartfon', inStock: true, isPopular: true, specs: ['128GB', '6GB RAM', '48MP'], description: 'iPhone 15.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg' },
    { id: 12, name: 'Samsung Z Flip 5', brand: 'samsung', brandName: 'Samsung', price: 13500000, memory: '256GB', color: 'Mint', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, specs: ['256GB', '8GB RAM'], description: 'Z Flip 5.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip5.jpg' },
    { id: 13, name: 'AirPods Pro 2', brand: 'apple', brandName: 'Apple', price: 2500000, oldPrice: 2800000, memory: '-', color: 'White', condition: 'Yangi', category: 'aksesuar', inStock: true, specs: ['H2 chip', 'ANC', 'USB-C'], description: 'AirPods Pro 2.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2.jpg' },
    { id: 14, name: 'Galaxy Buds2 Pro', brand: 'samsung', brandName: 'Samsung', price: 1800000, memory: '-', color: 'Graphite', condition: 'Yangi', category: 'aksesuar', inStock: true, isNew: true, specs: ['ANC', '360 Audio'], description: 'Galaxy Buds2 Pro.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds2-pro.jpg' },
    { id: 15, name: 'Galaxy Tab S9', brand: 'samsung', brandName: 'Samsung', price: 8500000, memory: '128GB', color: 'Graphite', condition: 'Yangi', category: 'planshet', inStock: true, specs: ['128GB', '8GB RAM', '11"'], description: 'Galaxy Tab S9.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg' },
    { id: 16, name: 'iPad Air 5', brand: 'apple', brandName: 'Apple', price: 7500000, oldPrice: 8200000, memory: '64GB', color: 'Space Gray', condition: 'Yangi', category: 'planshet', inStock: true, specs: ['64GB', '8GB RAM', '10.9"'], description: 'iPad Air 5.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-5.jpg' }
];

// ========== STATE ==========
let products = [];
let cart = JSON.parse(localStorage.getItem('muxtorCart')) || [];
let currentFilter = 'all', currentBrand = 'all', currentSort = 'default';
let wishlist = JSON.parse(localStorage.getItem('muxtorWishlist')) || [];

// ========== UTILS ==========
const g = id => document.getElementById(id);
const q = sel => document.querySelector(sel);
const qa = sel => document.querySelectorAll(sel);
const formatPrice = p => (p || 0).toLocaleString('uz-UZ') + ' so\'m';

function calcDiscount(price, oldPrice) {
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round((1 - price / oldPrice) * 100);
}

// ========== TOAST ==========
function toast(msg, type = 'success') {
    const cont = g('toastContainer');
    if (!cont) return;
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i><span>${msg}</span>`;
    cont.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
        t.classList.add('hide');
        setTimeout(() => t.remove(), 400);
    }, 3000);
}

// ========== LOADER (BUG FIX: standalone funksiya sifatida) ==========
function hideLoader() {
    const l = g('pageLoader');
    if (!l) return;
    l.style.opacity = '0';
    l.style.visibility = 'hidden';
    setTimeout(() => { l.style.display = 'none'; }, 500);
}

// ========== COUNT UP ==========
function countUp(el, target, suffix = '+') {
    const duration = 1500, start = Date.now();
    const run = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
}

// ========== MAHSULOTLARNI YUKLASH (BUG FIX: ta'riflangan) ==========
function loadProducts() {
    const shared = localStorage.getItem('muxtorSharedProducts');
    if (shared) {
        try {
            const parsed = JSON.parse(shared);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // specs maydonini massivga aylantirish (admin panel string sifatida saqlaydi)
                return parsed.map(p => ({
                    ...p,
                    specs: typeof p.specs === 'string'
                        ? p.specs.split(',').map(s => s.trim()).filter(Boolean)
                        : (p.specs || [])
                }));
            }
        } catch (e) {
            console.warn('LocalStorage parse xatolik:', e);
        }
    }
    return defaultProducts;
}

// ========== RENDER ==========
function getImgHTML(p) {
    const src = p.image || '';
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('images/')) {
        return `<img src="${src}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=\\'font-size:65px\\'>📱</span>';">`;
    }
    return `<span style="font-size:65px">📱</span>`;
}

function getBadge(p) {
    if (!p.inStock) return '<span class="product-badge badge-out">Tugagan</span>';
    if (p.isNew) return '<span class="product-badge badge-new">Yangi</span>';
    if (p.oldPrice) return `<span class="product-badge badge-sale">-${calcDiscount(p.price, p.oldPrice)}%</span>`;
    if (p.isPopular) return '<span class="product-badge badge-hot">TOP</span>';
    return '';
}

function renderProducts(list) {
    const grid = g('productGrid');
    if (!grid) return;
    if (!list || list.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px;">
            <div style="font-size:48px;margin-bottom:16px;">🔍</div>
            <h3>Mahsulot topilmadi</h3>
            <button onclick="resetAll()" class="btn btn-gold" style="margin-top:16px">🔄 Tozalash</button>
        </div>`;
        return;
    }
    grid.innerHTML = list.map((p, i) => `
        <div class="product-card" style="animation-delay:${i * 0.05}s" onclick="openDetail(${p.id})">
            ${getBadge(p)}
            <div class="product-img">${getImgHTML(p)}</div>
            <div class="product-info">
                <div class="product-brand">${p.brandName}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-specs">${(Array.isArray(p.specs) ? p.specs : (typeof p.specs === 'string' ? p.specs.split(',').map(s => s.trim()) : [])).slice(0, 3).map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
                <div class="product-price">
                    <span class="price-now">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-cart" onclick="addToCart(${p.id})" ${!p.inStock ? 'disabled' : ''}>
                        ${p.inStock ? '🛒 Savatga' : '❌ Yo\'q'}
                    </button>
                    <button class="btn-view" onclick="openDetail(${p.id})">👁</button>
                </div>
            </div>
        </div>`).join('');
}

// ========== FILTER ==========
function applyFilters() {
    // Har safar serverdan eng so'nggi mahsulotlarni olish
    fetch('https://muxtor-mobile.onrender.com/api/products')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data && data.length > 0) {
                products = data;
            }
            doFilter();
        })
        .catch(function() {
            doFilter();
        });
}

function doFilter() {
    var r = products.slice();
    if (currentFilter === 'yangi') r = r.filter(p => p.isNew);
    else if (currentFilter === 'chegirma') r = r.filter(p => p.oldPrice);
    else if (currentFilter !== 'all') r = r.filter(p => p.category === currentFilter);
    if (currentBrand !== 'all') r = r.filter(p => p.brand === currentBrand);
    if (currentSort === 'price-asc') r.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price-desc') r.sort((a, b) => b.price - a.price);
    else if (currentSort === 'name-asc') r.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(r);
}

function resetAll() {
    currentFilter = 'all'; currentBrand = 'all'; currentSort = 'default';
    const si = g('searchInput'); if (si) si.value = '';
    const ss = g('sortSelect'); if (ss) ss.value = 'default';
    qa('.nav-link').forEach(l => l.classList.remove('active'));
    q('.nav-link[data-filter="all"]')?.classList.add('active');
    qa('.brand-btn').forEach(b => b.classList.remove('active'));
    q('.brand-btn[data-brand="all"]')?.classList.add('active');
    applyFilters();
}

// ========== SEARCH ==========
function doSearch(query) {
    const qText = (query || g('searchInput')?.value || '').trim().toLowerCase();
    if (!qText) { resetAll(); return; }
    currentFilter = 'all'; currentBrand = 'all';
    const r = products.filter(p =>
        p.name.toLowerCase().includes(qText) ||
        (p.brandName || '').toLowerCase().includes(qText) ||
        (p.specs || []).some(s => s.toLowerCase().includes(qText))
    );
    renderProducts(r);
    g('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    toast(r.length ? `"${qText}" bo'yicha ${r.length} ta topildi` : 'Topilmadi', r.length ? 'success' : 'error');
}

// ========== CART ==========
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p || !p.inStock) return;
    const ex = cart.find(x => x.productId === id);
    ex ? ex.quantity++ : cart.push({ productId: id, name: p.name, price: p.price, image: p.image || '📱', quantity: 1 });
    saveCart(); updateCartUI();
    toast(`"${p.name}" savatga qo'shildi!`);
}

function removeFromCart(id) {
    const it = cart.find(x => x.productId === id);
    cart = cart.filter(x => x.productId !== id);
    saveCart(); updateCartUI(); renderCartItems();
    if (it) toast(`"${it.name}" olindi`, 'error');
}

function updateQty(id, d) {
    const it = cart.find(x => x.productId === id);
    if (!it) return;
    it.quantity += d;
    if (it.quantity <= 0) { removeFromCart(id); return; }
    saveCart(); updateCartUI(); renderCartItems();
}

function saveCart() { localStorage.setItem('muxtorCart', JSON.stringify(cart)); }
function getTotal() { return cart.reduce((s, i) => s + i.price * i.quantity, 0); }
function updateCartUI() {
    const cc = g('cartCount');
    if (cc) { const t = cart.reduce((s, i) => s + i.quantity, 0); cc.textContent = t; }
}

function renderCartItems() {
    const ci = g('cartItems'), cf = g('cartFooter'), ct = g('cartTotal');
    if (!ci || !cf) return;
    if (cart.length === 0) {
        ci.innerHTML = '<div class="cart-empty"><p>Savatingiz bo\'sh 🛒</p></div>';
        cf.style.display = 'none';
        return;
    }
    cf.style.display = 'block';
    ci.innerHTML = cart.map(i => {
        const img = (i.image && (i.image.startsWith('http') || i.image.startsWith('images/')))
            ? `<img src="${i.image}" style="width:56px;height:56px;object-fit:contain;border-radius:8px;" onerror="this.style.display='none';">`
            : '📱';
        return `<div style="display:flex;align-items:center;gap:15px;padding:15px 0;border-bottom:1px solid rgba(255,255,255,.07);">
            <span style="font-size:36px;width:56px;text-align:center;">${img}</span>
            <div style="flex:1;">
                <strong>${i.name}</strong>
                <br>
                <span style="color:#c9a84c;">${formatPrice(i.price)} × ${i.quantity}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <button onclick="updateQty(${i.productId},-1)" style="width:28px;height:28px;border-radius:8px;border:1px solid #333;background:#1a1a1a;color:#fff;cursor:pointer;">−</button>
                <span style="font-weight:700">${i.quantity}</span>
                <button onclick="updateQty(${i.productId},1)" style="width:28px;height:28px;border-radius:8px;border:1px solid #333;background:#1a1a1a;color:#fff;cursor:pointer;">+</button>
            </div>
            <button onclick="removeFromCart(${i.productId})" style="color:#ff4d4f;background:none;border:none;cursor:pointer;font-size:18px;">🗑</button>
        </div>`;
    }).join('');
    if (ct) ct.textContent = formatPrice(getTotal());
}

// ========== MODALS ==========
function openModal(m) { if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
function closeModal(m) { if (m) { m.style.display = 'none'; document.body.style.overflow = ''; } }
function closeAllModals() { qa('.modal').forEach(m => closeModal(m)); }

function openDetail(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const mb = g('modalBody');
    if (!mb) return;
    const discount = calcDiscount(p.price, p.oldPrice);
    mb.innerHTML = `
        <div style="text-align:center;margin-bottom:20px;padding:20px;background:#111;border-radius:16px;">
            ${getImgHTML(p)}
        </div>
        <div class="product-brand" style="text-align:center;margin-bottom:8px;">${p.brandName}</div>
        <h2 style="margin-bottom:12px;">${p.name}</h2>
        ${p.memory ? `<p style="color:#7e7e7e;margin-bottom:12px;">💾 ${p.memory} ${p.color ? '| 🎨 ' + p.color : ''}</p>` : ''}
        <div style="margin-bottom:16px;">${(p.specs || []).map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
        <div style="margin:15px 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
            <span style="font-size:24px;font-weight:700;color:#f7c948;">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span style="text-decoration:line-through;color:#666;">${formatPrice(p.oldPrice)}</span>` : ''}
            ${discount ? `<span style="background:rgba(255,77,79,.15);color:#ff4d4f;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:700">-${discount}%</span>` : ''}
        </div>
        ${p.description ? `<p style="color:#b8b8b8;line-height:1.6;margin-bottom:20px;">${p.description}</p>` : ''}
        <button class="btn btn-gold btn-block" onclick="addToCart(${p.id});closeAllModals();" ${!p.inStock ? 'disabled' : ''} style="width:100%;padding:16px;">
            ${p.inStock ? '🛒 Savatga qo\'shish' : '❌ Mahsulot tugagan'}
        </button>`;
    openModal(g('productModal'));
}

// ========== ORDER ==========
function submitOrderNow() {
    const name = (g('customerName')?.value || '').trim();
    const phone = (g('customerPhone')?.value || '').trim();
    const address = (g('customerAddress')?.value || '').trim();
    const payment = g('paymentMethod')?.value || 'naqd';

    if (!name) { toast('Ismingizni kiriting!', 'error'); return; }
    if (!phone) { toast('Telefon raqamingizni kiriting!', 'error'); return; }
    if (!phone.startsWith('+998') || phone.length < 13) { toast('+998XXXXXXXXX formatida kiriting!', 'error'); return; }
    if (cart.length === 0) { toast('Savatingiz bo\'sh!', 'error'); return; }

    var order = {
        customer: { name: name, phone: phone, address: address },
        payment: payment,
        items: cart.map(function(item) {
            return {
                name: item.name,
                price: item.price,
                quantity: item.quantity
            };
        }),
        total: getTotal()
    };

    console.log('Yuborilgan buyurtma:', JSON.stringify(order));

    // localStorage ga saqlash
    try {
        var orders = JSON.parse(localStorage.getItem('muxtorOrders') || '[]');
        orders.push(order);
        localStorage.setItem('muxtorOrders', JSON.stringify(orders.slice(-50)));
    } catch (e) {}

    // RENDER ga yuborish
    fetch('https://muxtor-mobile.onrender.com/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        console.log('✅ Buyurtma yuborildi:', data);
    })
    .catch(function(err) {
        console.log('⚠️ Xatolik:', err.message);
    });

    toast('🎉 Buyurtmangiz qabul qilindi! Tez orada bog\'lanamiz.');
    cart = []; saveCart(); updateCartUI();
    g('orderForm')?.reset();
    closeAllModals();
}
// ========== SCROLL OBSERVER (BUG FIX: ta'riflangan) ==========
function initObserver() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    qa('.product-card, .stat-card, .feature-card').forEach(el => observer.observe(el));
}

// ========== EVENTS ==========
function initEvents() {
    const si = g('searchInput');
    if (si) {
        si.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
        si.addEventListener('input', function () {
            const dropdown = g('searchDropdown');
            if (!dropdown) return;
            const q = this.value.trim().toLowerCase();
            if (!q) { dropdown.style.display = 'none'; return; }
            const matches = products.filter(p => p.name.toLowerCase().includes(q) || (p.brandName || '').toLowerCase().includes(q)).slice(0, 5);
            if (!matches.length) { dropdown.style.display = 'none'; return; }
            dropdown.innerHTML = matches.map(p => `
                <div onclick="doSearch('${p.name.replace(/'/g, "\\'")}');this.parentElement.style.display='none';"
                    style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:.2s"
                    onmouseover="this.style.background='rgba(247,201,72,.1)'" onmouseout="this.style.background=''">
                    <span style="font-size:22px">📱</span>
                    <div>
                        <div style="font-weight:600">${p.name}</div>
                        <div style="font-size:12px;color:#7e7e7e">${formatPrice(p.price)}</div>
                    </div>
                </div>`).join('');
            dropdown.style.display = 'block';
        });
    }

    g('searchBtn')?.addEventListener('click', () => doSearch());
    g('sortSelect')?.addEventListener('change', function () { currentSort = this.value; applyFilters(); });

    qa('.nav-link[data-filter]').forEach(l => {
        l.addEventListener('click', function (e) {
            e.preventDefault();
            qa('.nav-link').forEach(x => x.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter; currentBrand = 'all';
            qa('.brand-btn').forEach(b => b.classList.remove('active'));
            q('.brand-btn[data-brand="all"]')?.classList.add('active');
            if (si) si.value = '';
            applyFilters();
            g('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    qa('.brand-btn').forEach(b => {
        b.addEventListener('click', function () {
            qa('.brand-btn').forEach(x => x.classList.remove('active'));
            this.classList.add('active');
            currentBrand = this.dataset.brand;
            if (si) si.value = '';
            applyFilters();
            g('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    g('cartBtn')?.addEventListener('click', () => {
        renderCartItems();
        openModal(g('cartModal'));
    });

    g('cartModalClose')?.addEventListener('click', () => closeModal(g('cartModal')));
    g('modalClose')?.addEventListener('click', () => closeModal(g('productModal')));
    g('orderModalClose')?.addEventListener('click', () => closeModal(g('orderModal')));

    g('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) { toast('Savatingiz bo\'sh!', 'error'); return; }
        closeModal(g('cartModal'));
        openModal(g('orderModal'));
    });

    g('submitOrderBtn')?.addEventListener('click', function (e) {
        e.preventDefault();
        submitOrderNow();
    });

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-overlay')) closeAllModals();
        // Search dropdown yopish
        const dd = g('searchDropdown');
        if (dd && !e.target.closest('.search-box')) dd.style.display = 'none';
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

    g('mobileMenuBtn')?.addEventListener('click', function () {
        g('mainNav')?.classList.toggle('active');
        this.classList.toggle('active');
    });

    g('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Back to top ko'rsatish
    window.addEventListener('scroll', () => {
        const btn = g('backToTop');
        if (btn) btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    });
}

// ========== ADMIN SYNC ==========
let lastSync = '';
setInterval(() => {
    const cur = localStorage.getItem('muxtorSharedProducts') || '';
    if (cur !== lastSync && cur) {
        lastSync = cur;
        try {
            const parsed = JSON.parse(cur);
            if (Array.isArray(parsed)) {
                products = parsed.map(p => ({
                    ...p,
                    specs: typeof p.specs === 'string'
                        ? p.specs.split(',').map(s => s.trim()).filter(Boolean)
                        : (p.specs || [])
                }));
                applyFilters();
            }
        } catch (e) {}
    }
}, 5000);

// ========== INIT (BUG FIX: faqat bitta init, barcha funksiyalar ta'riflangan) ==========
function init() {
    var loader = document.getElementById('pageLoader');
    
    // Mahsulotlarni serverdan olish
    fetch('https://muxtor-mobile.onrender.com/api/products')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data && data.length > 0) {
                products = data;
            }
            // Saytni ko'rsatish
            renderProducts(products);
            updateCartUI();
            initEvents();
            // Loaderni yashirish
            if (loader) {
                loader.style.display = 'none';
            }
            console.log('✅ Sayt tayyor');
        })
        .catch(function(err) {
            // Xatolik bo'lsa ham saytni ko'rsatish
            renderProducts(products);
            updateCartUI();
            initEvents();
            if (loader) {
                loader.style.display = 'none';
            }
            console.log('⚠️ Server offline:', err.message);
        });
}
window.addEventListener('load', function () {
    setTimeout(init, 800);
});