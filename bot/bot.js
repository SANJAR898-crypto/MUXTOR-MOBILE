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

        // Telegramga professional formatda yuborish
    var date = new Date();
    var sana = date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    var vaqt = date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    
    var msg = '🛒 <b>YANGI BUYURTMA!</b>\n';
    msg += '━━━━━━━━━━━━━━━━━━\n\n';
    msg += '👤 <b>Mijoz:</b> ' + (o.customer?.name || 'Anonim') + '\n';
    msg += '📞 <b>Telefon:</b> <code>' + (o.customer?.phone || '-') + '</code>\n';
    msg += '📍 <b>Manzil:</b> ' + (o.customer?.address || 'Ko\'rsatilmagan') + '\n';
    msg += '💳 <b>To\'lov:</b> ' + (o.payment === 'click' ? '📱 Click' : o.payment === 'payme' ? '💳 Payme' : '💵 Naqd pul') + '\n\n';
    
    msg += '━━━━━━━━━━━━━━━━━━\n';
    msg += '📱 <b>MAHSULOTLAR:</b>\n\n';
    
    var total = 0;
    (o.items || []).forEach(function(i, index) {
        var sum = i.price * i.quantity;
        total += sum;
        msg += (index + 1) + '. ' + i.name + '\n';
        msg += '   ' + i.price.toLocaleString('uz-UZ') + ' so\'m × ' + i.quantity + ' = <b>' + sum.toLocaleString('uz-UZ') + ' so\'m</b>\n';
    });
    
    msg += '\n━━━━━━━━━━━━━━━━━━\n';
    msg += '💰 <b>JAMI:</b> <b>' + total.toLocaleString('uz-UZ') + ' so\'m</b>\n';
    msg += '📅 <b>Sana:</b> ' + sana + '\n';
    msg += '🕐 <b>Vaqt:</b> ' + vaqt + '\n';
    msg += '🌐 <b>Manba:</b> Saytdan buyurtma\n\n';
    msg += '#buyurtma #muxtor_mobile';

    var url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';
    
    var https = require('https');
    var postData = JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: msg,
        parse_mode: 'HTML'
    });
    
    var options = {
        hostname: 'api.telegram.org',
        path: '/bot' + BOT_TOKEN + '/sendMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    var req = https.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) { data += chunk; });
        res.on('end', function() {
            console.log('📨 Telegram javobi:', data);
        });
    });
    
    req.on('error', function(e) {
        console.log('❌ Telegram xatolik:', e.message);
    });
    
    req.write(postData);
    req.end();

    res.json({ success: true });
});

app.listen(PORT, function() {
    console.log('✅ Server ' + PORT + ' portda');
});