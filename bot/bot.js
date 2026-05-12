require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// CORS — HAMMA SO'ROVLAR UCHUN OCHIQ
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// OPTIONS so'rovlar uchun

app.use(express.json());

// Health check
app.get('/health', function(req, res) {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Buyurtma qabul qilish
app.post('/api/order', async function(req, res) {
    try {
        var orderData = req.body;
        console.log('📦 Yangi buyurtma keldi!');
        console.log('👤', orderData.customer?.name);
        console.log('📞', orderData.customer?.phone);
        
        var dataDir = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        var ordersFile = path.join(dataDir, 'orders.json');
        var orders = [];
        if (fs.existsSync(ordersFile)) {
            orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
        }
        
        orders.push({
            id: Date.now(),
            ...orderData,
            status: 'yangi',
            date: new Date().toISOString()
        });
        
        fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
        console.log('✅ Buyurtma saqlandi!');
        
        res.json({ success: true, message: 'Buyurtma qabul qilindi!' });
    } catch(e) {
        console.error('❌ Xatolik:', e.message);
        res.status(500).json({ success: false, message: e.message });
    }
});

// Serverni ishga tushirish
app.listen(PORT, function() {
    console.log('========================================');
    console.log('   🤖 Muxtor Mobile API Server');
    console.log('========================================');
    console.log('✅ Server ishga tushdi!');
    console.log('🌐 Port: ' + PORT);
    console.log('📦 API: http://localhost:' + PORT + '/api/order');
    console.log('🩺 Health: http://localhost:' + PORT + '/health');
    console.log('========================================');
});