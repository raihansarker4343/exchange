const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { prisma, initDB } = require('./db'); // Import centralized DB control

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-123';


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://frontend-1zcq.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

// --- Middleware ---
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// --- Auth Routes ---

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    if (!user.isActive) return res.status(403).json({ error: 'Account deactivated' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Config Routes (Public for reading) ---

app.get('/api/config/rates', async (req, res) => {
  const rates = await prisma.giftCardRate.findMany({ orderBy: { type: 'asc' } });
  res.json(rates);
});

app.put('/api/config/rates', authenticate, isAdmin, async (req, res) => {
  const rates = req.body; 
  try {
    for (const r of rates) {
      await prisma.giftCardRate.update({
        where: { id: r.id },
        data: { rate: r.rate, isEnabled: r.isEnabled }
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rates' });
  }
});

app.get('/api/config/methods', async (req, res) => {
  const methods = await prisma.paymentMethod.findMany({ orderBy: { name: 'asc' } });
  res.json(methods);
});

// --- Transaction Routes ---

app.post('/api/transactions/submit', authenticate, async (req, res) => {
  try {
    const { cardType, cardLink, cardAmountUsd, exchangeRate, payoutAmountBdt, payoutMethod, payoutNumber } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const trx = await prisma.transaction.create({
      data: {
        userId: req.user.id,
        userName: user.name,
        cardType,
        cardLink,
        cardAmountUsd,
        exchangeRate,
        payoutAmountBdt,
        payoutMethod,
        payoutNumber
      }
    });

    res.json(trx);
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});

app.get('/api/transactions/my', authenticate, async (req, res) => {
  const trx = await prisma.transaction.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(trx);
});

// --- Admin Routes ---

app.get('/api/admin/transactions', authenticate, isAdmin, async (req, res) => {
  const trx = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(trx);
});

app.put('/api/admin/transactions/:id/status', authenticate, isAdmin, async (req, res) => {
  const { status, note } = req.body;
  const trx = await prisma.transaction.update({
    where: { id: req.params.id },
    data: { status, adminNote: note }
  });
  res.json(trx);
});

app.get('/api/admin/users', authenticate, isAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, balance: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(users);
});

app.put('/api/admin/users/:id/toggle', authenticate, isAdmin, async (req, res) => {
  const { isActive } = req.body;
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { isActive }
  });
  res.json(user);
});

app.get('/api/admin/stats', authenticate, isAdmin, async (req, res) => {
  const totalUsers = await prisma.user.count();
  const totalTransactions = await prisma.transaction.count();
  const pendingCount = await prisma.transaction.count({ where: { status: 'PENDING' } });
  
  const volumeAgg = await prisma.transaction.aggregate({
    where: { status: 'APPROVED' },
    _sum: { payoutAmountBdt: true }
  });

  res.json({
    totalUsers,
    totalTransactions,
    totalVolumeBdt: volumeAgg._sum.payoutAmountBdt || 0,
    pendingCount
  });
});

// --- Start Server ---
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDB(); // Run DB initialization/seeding
});
