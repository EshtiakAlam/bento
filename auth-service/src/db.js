const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = async () => {
    try {
        mongoose.connection;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });
}

module.exports = connectDB;