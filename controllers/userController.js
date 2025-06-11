const db = require('../config/db');

// Create user
exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional: Get all users)
exports.getAllUsers = async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM users');
  res.json(rows);
};
