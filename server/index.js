import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Database from 'better-sqlite3';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database('rivaaj.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Setup DB Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT,
    price INTEGER,
    originalPrice INTEGER,
    image TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    razorpay_order_id TEXT,
    amount INTEGER,
    currency TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Initial Products if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM products');
if (countStmt.get().count === 0) {
  const insertProduct = db.prepare('INSERT INTO products (id, title, price, originalPrice, image, category) VALUES (?, ?, ?, ?, ?, ?)');
  const seedProducts = [
    ['p1', 'Magenta Pure Cotton', 1699, 4439, '/kurti_1.png', 'new_arrivals'],
    ['p2', 'Green Cotton Kurti', 1399, 4249, '/kurti_2.png', 'new_arrivals'],
    ['p3', 'White Floral Kurti', 1799, 4799, '/kurti_3.png', 'new_arrivals'],
    ['p4', 'Blue Jacket Set', 1899, 5299, '/kurti_4.png', 'new_arrivals'],
    ['w1', 'Magenta Pure Cotton', 1699, 4439, '/kurti_1.png', 'watch_buy'],
    ['w2', 'Green Cotton Kurti', 1399, 4249, '/kurti_2.png', 'watch_buy'],
    ['w3', 'White Floral Kurti', 1799, 4799, '/kurti_3.png', 'watch_buy'],
  ];
  const seedTransaction = db.transaction((products) => {
    for (const p of products) insertProduct.run(p);
  });
  seedTransaction(seedProducts);
  console.log('Seeded database with initial products');
}

// Razorpay Instance
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_YOUR_KEY_HERE') {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// API Routes
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let stmt;
  if (category) {
    stmt = db.prepare('SELECT * FROM products WHERE category = ?');
    res.json(stmt.all(category));
  } else {
    stmt = db.prepare('SELECT * FROM products');
    res.json(stmt.all());
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    if (!razorpay) {
      return res.status(400).json({ error: 'Razorpay keys not configured' });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    const insertOrder = db.prepare('INSERT INTO orders (id, razorpay_order_id, amount, currency, status) VALUES (?, ?, ?, ?, ?)');
    insertOrder.run(`order_${Date.now()}`, order.id, amount, currency, 'created');

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(400).json({ error: 'Secret key missing' });
  }

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (razorpay_signature === expectedSign) {
    // Update order status
    const updateOrder = db.prepare("UPDATE orders SET status = 'paid' WHERE razorpay_order_id = ?");
    updateOrder.run(razorpay_order_id);
    return res.json({ message: 'Payment verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid signature sent!' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
