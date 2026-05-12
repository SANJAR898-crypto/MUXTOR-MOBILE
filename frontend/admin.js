'use strict';

// Mahsulotlarni localStorage dan o'qish
function getProducts() {
    return JSON.parse(localStorage.getItem('muxtorAdminProducts')) || [];
}

function saveProducts(products) {
    localStorage.setItem('muxtorAdminProducts', JSON.stringify(products));
    localStorage.setItem('muxtorSharedProducts', JSON.stringify(products));
    
    // JSON faylni ham yangilash (server orqali)
    updateJSONFile(products);
}

function updateJSONFile(products) {
    // Fetch orqali JSON faylga yozish uchun kichik server kerak
    // Hozircha localStorage ga saqlaymiz, bot shu yerdan o'qiydi
    console.log('✅ Mahsulotlar yangilandi:', products.length, 'ta');
}

// Default mahsulotlar
function initDefaultProducts() {
    if (getProducts().length === 0) {
        const defaults = [
            { id: 1, name: 'iPhone 15 Pro Max', brand: 'apple', brandName: 'Apple', price: 15000000, oldPrice: 16500000, memory: '256GB', color: 'Titanium Blue', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, isPopular: true, specs: '256GB, 8GB RAM, 48MP', description: 'iPhone 15 Pro Max — A17 Pro chip.', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg' },
            { id: 2, name: 'Samsung S24 Ultra', brand: 'samsung', brandName: 'Samsung', price: 14500000, oldPrice: null, memory: '512GB', color: 'Titanium Gray', condition: 'Yangi', category: 'smartfon', inStock: true, isNew: true, isPopular: true, specs: '512GB, 12GB RAM, 200MP', description: 'Samsung S24 Ultra.', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg' },
            { id: 3, name: 'Xiaomi 14 Pro', brand: 'xiaomi', brandName: 'Xiaomi', price: 9500000, oldPrice: 10500000, memory: '256GB', color: 'Black', condition: 'Yangi', category: 'smartfon', inStock: true, isPopular: true, specs: '256GB, 12GB RAM, 50MP Leica', description: 'Xiaomi 14 Pro.', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-pro.jpg' }
        ];
        saveProducts(defaults);
    }
}

let editingId = null;

// Toast
function toast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = '0.3s'; setTimeout(() => el.remove(), 300); }, 2500);
}

// Page switch
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    if (page === 'products') renderProductsTable();
    if (page === 'stats') updateStats();
    if (page === 'add-product' && !editingId) resetForm();
}

// Nav click
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage(this.dataset.page);
    });
});

// Menu toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

// Clock
function updateClock() {
    const now = new Date();
    document.getElementById('topbarTime').textContent = now.toLocaleString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// Render products table
function renderProductsTable(filter = 'all', search = '') {
    const products = getProducts();
    let filtered = products;
    if (filter !== 'all') filtered = filtered.filter(p => p.category === filter);
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td><img src="${p.image || '📱'}" alt="${p.name}" class="table-img" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22><text x=%2224%22 y=%2230%22 text-anchor=%22middle%22 font-size=%2220%22>📱</text></svg>'"></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.brandName}</td>
            <td>${p.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm</td>
            <td>${p.category === 'smartfon' ? 'Smartfon' : p.category === 'planshet' ? 'Planshet' : 'Aksessuar'}</td>
            <td><span class="badge-status ${p.inStock ? 'badge-yes' : 'badge-no'}">${p.inStock ? '✅ Bor' : '❌ Yo\'q'}</span></td>
            <td class="actions-cell">
                <button class="btn btn-sm btn-green" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-red" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`).join('');
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px;color:#9ca3af;">Mahsulot topilmadi</td></tr>';
    }
}

// Search & filter
document.getElementById('adminSearch').addEventListener('input', function() {
    renderProductsTable(document.getElementById('adminFilter').value, this.value);
});
document.getElementById('adminFilter').addEventListener('change', function() {
    renderProductsTable(this.value, document.getElementById('adminSearch').value);
});

// Image preview
document.getElementById('prodImage').addEventListener('input', function() {
    const preview = document.getElementById('imagePreview');
    if (this.value) preview.innerHTML = `<img src="${this.value}" alt="Preview">`;
    else preview.innerHTML = '';
});
document.getElementById('prodImageFile').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('prodImage').value = e.target.result;
            document.getElementById('imagePreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// Form submit
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const product = {
        id: editingId || Date.now(),
        name: document.getElementById('prodName').value,
        brand: document.getElementById('prodBrand').value,
        brandName: document.getElementById('prodBrand').selectedOptions[0].text,
        price: parseInt(document.getElementById('prodPrice').value),
        oldPrice: document.getElementById('prodOldPrice').value ? parseInt(document.getElementById('prodOldPrice').value) : null,
        memory: document.getElementById('prodMemory').value,
        color: document.getElementById('prodColor').value,
        category: document.getElementById('prodCategory').value,
        condition: document.getElementById('prodCondition').value,
        specs: document.getElementById('prodSpecs').value,
        description: document.getElementById('prodDescription').value,
        inStock: document.getElementById('prodInStock').checked,
        isNew: document.getElementById('prodIsNew').checked,
        isPopular: document.getElementById('prodIsPopular').checked,
        image: document.getElementById('prodImage').value || '📱'
    };
    
    let products = getProducts();
    
    if (editingId) {
        products = products.map(p => p.id === editingId ? product : p);
        toast('✅ Mahsulot yangilandi!');
    } else {
        products.push(product);
        toast('✅ Yangi mahsulot qo\'shildi!');
    }
    
    saveProducts(products);
    
    // Frontend products.json ni ham yangilash
    updateFrontendProducts(products);
    
    resetForm();
    switchPage('products');
    renderProductsTable();
    updateStats();
});

function resetForm() {
    editingId = null;
    document.getElementById('editId').value = '';
    document.getElementById('productForm').reset();
    document.getElementById('prodInStock').checked = true;
    document.getElementById('formTitle').textContent = '➕ Yangi mahsulot qo\'shish';
    document.getElementById('saveBtn').textContent = '💾 Saqlash';
    document.getElementById('imagePreview').innerHTML = '';
}

function editProduct(id) {
    const product = getProducts().find(p => p.id === id);
    if (!product) return;
    
    editingId = id;
    document.getElementById('editId').value = id;
    document.getElementById('prodName').value = product.name;
    document.getElementById('prodBrand').value = product.brand;
    document.getElementById('prodPrice').value = product.price;
    document.getElementById('prodOldPrice').value = product.oldPrice || '';
    document.getElementById('prodMemory').value = product.memory || '';
    document.getElementById('prodColor').value = product.color || '';
    document.getElementById('prodCategory').value = product.category;
    document.getElementById('prodCondition').value = product.condition;
    document.getElementById('prodSpecs').value = product.specs || '';
    document.getElementById('prodDescription').value = product.description || '';
    document.getElementById('prodInStock').checked = product.inStock;
    document.getElementById('prodIsNew').checked = product.isNew;
    document.getElementById('prodIsPopular').checked = product.isPopular;
    document.getElementById('prodImage').value = product.image || '';
    if (product.image) document.getElementById('imagePreview').innerHTML = `<img src="${product.image}" alt="Preview">`;
    
    document.getElementById('formTitle').textContent = '✏️ Mahsulotni tahrirlash';
    document.getElementById('saveBtn').textContent = '💾 Yangilash';
    
    switchPage('add-product');
}

function deleteProduct(id) {
    if (!confirm('Haqiqatan ham o\'chirmoqchimisiz?')) return;
    let products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    updateFrontendProducts(products);
    renderProductsTable();
    updateStats();
    toast('🗑 Mahsulot o\'chirildi!', 'error');
}

// Statistika
function updateStats() {
    const products = getProducts();
    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statInStock').textContent = products.filter(p => p.inStock).length;
    document.getElementById('statDiscount').textContent = products.filter(p => p.oldPrice).length;
    document.getElementById('statOrders').textContent = JSON.parse(localStorage.getItem('muxtorOrders') || '[]').length;
}

// Frontend bilan sinxronizatsiya
function updateFrontendProducts(products) {
    // LocalStorage orqali frontend ga mahsulotlarni uzatish
    localStorage.setItem('muxtorSharedProducts', JSON.stringify(products));
}

// Init
function init() {
    initDefaultProducts();
    renderProductsTable();
    updateStats();
}

init();
console.log('📱 Muxtor Mobile Admin Panel — Tayyor!');