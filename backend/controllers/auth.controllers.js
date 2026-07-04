const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const memoryUsers = global.__trTravelUsers || [];
global.__trTravelUsers = memoryUsers;

const JWT_SECRET = process.env.JWT_SECRET || 'tr-travel-secret';

// Helper function to seed default admin if collection is empty
const ensureDefaultAdmin = async () => {
  if (process.env.MONGO_URI) {
    try {
      const count = await UserModel.countDocuments();
      if (count === 0) {
        const hashedPassword = await bcrypt.hash('admin1234', 10);
        await UserModel.create({
          name: 'TR Travel Admin',
          email: 'admin@trtravel.com',
          password: hashedPassword,
          role: 'admin'
        });
        console.log('Default Admin user seeded successfully (admin@trtravel.com)');
      }
    } catch (err) {
      console.error('Error seeding default admin:', err.message);
    }
  } else {
    // In-memory seed
    const adminExists = memoryUsers.some((u) => u.email.toLowerCase() === 'admin@trtravel.com');
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin1234', 10);
      memoryUsers.push({
        id: 'admin-default',
        name: 'TR Travel Admin',
        email: 'admin@trtravel.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      console.log('Default memory Admin seeded successfully (admin@trtravel.com)');
    }
  }
};

// Seed immediately on script import
ensureDefaultAdmin();

const registerUser = async (req, res) => {
  try {
    await ensureDefaultAdmin(); // Double check
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    let existing;
    if (process.env.MONGO_URI) {
      existing = await UserModel.findOne({ email: email.toLowerCase() });
    } else {
      existing = memoryUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
    }

    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (process.env.MONGO_URI) {
      newUser = await UserModel.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin' // By default make them admin for travel portal management
      });
    } else {
      newUser = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      memoryUsers.push(newUser);
    }

    const token = jwt.sign(
      { id: newUser.id || newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: { id: newUser.id || newUser._id, name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    await ensureDefaultAdmin(); // Double check
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    let user;
    if (process.env.MONGO_URI) {
      user = await UserModel.findOne({ email: email.toLowerCase() });
    } else {
      user = memoryUsers.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user.id || user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: { id: user.id || user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
