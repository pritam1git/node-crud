const db = require('../config/db');

// Create user
exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required.' });
  }

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

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required.' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
