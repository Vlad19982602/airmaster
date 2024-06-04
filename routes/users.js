import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;