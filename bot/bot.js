require('dotenv').config();

var express = require('express');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var https = require('https');
var app = express();

var PORT = process.env.PORT || 3000;
var BOT_TOKEN = process.env.BOT_TOKEN || '8737216441:AAF2BRqg5Ynsg6rPsDYPKbQv2J7uafXfp8M';
var ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '8638170982';

app.use(cors());
app.use(express.json());

// Health
app.get('/health', function(req, res) {
    res.json({ status: 'ok' });
});

// Mahsulotlarni olish
app.get('/api/products', function(req, res) {
    var f = path.join(__dirname, '..', 'data', 'products.json');
    if (fs.existsSync(f)) {
        res.json(JSON.parse(fs.readFileSync(f, 'utf8')));
    } else {
        res.json([]);
    }
});

// Mahsulotlarni saqlash
app.post('/api/products', function(req, res) {
    var dir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'products.json'), JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

// Buyurtma
app.post('/api/order', function(req, res) {
    var o = req.body;
    console.log('📦 Buyurtma:', o.customer?.name);

    var dir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    var f = path.join(dir, 'orders.json');
    var orders = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
    orders.push({ id: Date.now(), ...o, date: new Date().toISOString() });
    fs.writeFileSync(f, JSON.stringify(orders, null, 2));

    // Telegramga
    var msg = '📦 YANGI BUYURTMA!\n\n';
    msg += '👤 ' + (o.customer?.name || '-') + '\n';
    msg += '📞 ' + (o.customer?.phone || '-') + '\n';
    msg += '📍 ' + (o.customer?.address || '-') + '\n\n';
    var total = 0;
    (o.items || []).forEach(function(i) {
        msg += '• ' + i.name + ' ×' + i.quantity + '\n';
        total += i.price * i.quantity;
    });
    msg += '\n💰 ' + total.toLocaleString('uz-UZ') + ' so\'m';

    https.get('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage?chat_id=' + ADMIN_CHAT_ID + '&text=' + encodeURIComponent(msg), function(r) {
        console.log('TG: yuborildi');
    });

    res.json({ success: true });
});

app.listen(PORT, function() {
    console.log('✅ Server ' + PORT + ' portda');
});