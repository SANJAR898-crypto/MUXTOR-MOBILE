require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Mahsulotlarni JSON fayldan o'qish
function loadProducts() {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'products.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch(e) {
        console.log('Mahsulotlar yuklanmadi, default ishlatilmoqda');
        return [
            { id: 1, name: 'iPhone 15 Pro Max', brand: 'Apple', price: 15000000, oldPrice: 16500000, memory: '256GB', color: 'Titanium Blue', inStock: true, isNew: true, specs: '256GB, 8GB RAM, 48MP', description: 'A17 Pro chip.' },
            { id: 2, name: 'Samsung S24 Ultra', brand: 'Samsung', price: 14500000, memory: '512GB', color: 'Titanium Gray', inStock: true, isNew: true, specs: '512GB, 12GB RAM, 200MP', description: 'Galaxy AI.' },
            { id: 3, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', price: 9500000, oldPrice: 10500000, memory: '256GB', color: 'Black', inStock: true, specs: '256GB, 12GB RAM, 50MP Leica', description: 'Leica optikasi.' }
        ];
    }
}

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN || '8737216441:AAF2BRqg5Ynsg6rPsDYPKbQv2J7uafXfp8M',
    ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID || '8638170982',
    CHANNEL_ID: process.env.CHANNEL_ID || '@muhtor_mobile55',
    SHOP_NAME: 'Muxtor Mobile',
    SHOP_PHONE: '+998958371010',
    SHOP_INSTAGRAM: 'https://instagram.com/muhtor_mobile55',
    SHOP_LOCATION: 'https://yandex.ru/maps/org/235393576647',
    products: loadProducts()
};