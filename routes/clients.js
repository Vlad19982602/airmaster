import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: { username, email, password, phone }
    });
    res.json(newClient);
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;