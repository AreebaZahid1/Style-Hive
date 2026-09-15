const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const connectDb = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            origin === 'https://style-hive-6qm9.vercel.app' ||
            origin.endsWith('-areeba-aee0.vercel.app')
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Ecommerce Backend is running'
    });
});

connectDb();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;