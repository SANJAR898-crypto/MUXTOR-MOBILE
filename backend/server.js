const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Muhit o'zgaruvchilarni yuklash
dotenv.config();

// Express app yaratish
const app = express();

// Middleware'lar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik fayllar (rasmlar uchun)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Bosh sahifa
app.get('/', (req, res) => {
    res.json({
        success: true,
        dokon: 'Muxtor Mobile 📱',
        xabar: 'Assalomu alaykum! API ishlamoqda! ✅',
        vaqt: new Date().toLocaleString('uz-UZ')
    });
});

// API haqida ma'lumot
app.get('/api', (req, res) => {
    res.json({
        dokon: 'Muxtor Mobile',
        versiya: '1.0.0',
        manzil: process.env.SHOP_ADDRESS || 'Toshkent',
        telefon: process.env.SHOP_PHONE,
        ish_vaqti: 'Dushanba - Yakshanba: 09:00 - 20:00'
    });
});

// 404 - Topilmadi
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Sahifa topilmadi! ❌'
    });
});

// Xatolik handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Server xatoligi!',
        error: err.message
    });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('═══════════════════════════════════');
    console.log('   📱 MUXTOR MOBILE');
    console.log('═══════════════════════════════════');
    console.log(`✅ Server ishga tushdi!`);
    console.log(`🌐 Port: ${PORT}`);
    console.log(`📂 URL: http://localhost:${PORT}`);
    console.log(`⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`);
    console.log('═══════════════════════════════════');
});