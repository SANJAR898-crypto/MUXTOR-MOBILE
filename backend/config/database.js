const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/muxtor-mobile');
        console.log(`✅ MongoDB ulanildi: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB xatolik: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;