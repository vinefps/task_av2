const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Validação de entrada
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    console.error(error); // Log detalhado para debug
    res.status(400).json({ error: 'Could not create user.' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validação de entrada
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = await prisma.users.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error); // Log detalhado para debug
    res.status(500).json({ error: 'Internal server error.' });
  }
};
