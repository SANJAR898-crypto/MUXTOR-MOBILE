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

app.get('/health', function(req, res) {
    res.json({ status: 'ok' });
});

app.post('/api/order', function(req, res) {
    var orderData = req.body;
    console.log('📦 Yangi buyurtma!');
    console.log('👤', orderData.customer?.name);
    console.log('📞', orderData.customer?.phone);

    // Faylga saqlash
    var dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    var ordersFile = path.join(dataDir, 'orders.json');
    var orders = [];
    if (fs.existsSync(ordersFile)) orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    orders.push({ id: Date.now(), ...orderData, date: new Date().toISOString() });
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    // Telegramga yuborish
    var msg = '📦 YANGI BUYURTMA!\n\n';
    msg += '👤 Mijoz: ' + (orderData.customer?.name || '-') + '\n';
    msg += '📞 Tel: ' + (orderData.customer?.phone || '-') + '\n';
    msg += '📍 Manzil: ' + (orderData.customer?.address || '-') + '\n\n';
    
    var total = 0;
    (orderData.items || []).forEach(function(item) {
        msg += '• ' + item.name + ' × ' + item.quantity + ' — ' + (item.price * item.quantity).toLocaleString('uz-UZ') + ' so\'m\n';
        total += item.price * item.quantity;
    });
    
    msg += '\n💰 Jami: ' + total.toLocaleString('uz-UZ') + ' so\'m';
    msg += '\n🕐 ' + new Date().toLocaleString('uz-UZ');
    msg += '\n🌐 Saytdan buyurtma';

    var apiUrl = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage?chat_id=' + ADMIN_CHAT_ID + '&text=' + encodeURIComponent(msg);

    https.get(apiUrl, function(response) {
        var data = '';
        response.on('data', function(chunk) { data += chunk; });
        response.on('end', function() {
            console.log('TG:', data);
        });
    }).on('error', function(e) {
        console.log('TG xatolik:', e.message);
    });

    res.json({ success: true, message: 'OK' });
});

app.listen(PORT, function() {
    console.log('✅ Server port ' + PORT + ' da ishlamoqda');
});