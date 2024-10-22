// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express
const app = express();

// Set a port (You can use 3000 or any other port)
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/foodDeliveryApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Models (Schemas for User, Menu, Order)
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    isAdmin: Boolean,
});

const MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const OrderSchema = new mongoose.Schema({
    user: String,
    item: String,
    status: String,
});

const User = mongoose.model('User', UserSchema);
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
const Order = mongoose.model('Order', OrderSchema);

// API Routes
app.post('/api/register', async (req, res) => {
    const { email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, isAdmin });
    await newUser.save();

    res.status(201).send('User registered successfully');
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
