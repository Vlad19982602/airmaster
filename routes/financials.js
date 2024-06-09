import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const financialEntries = await prisma.financialEntry.findMany();
    res.json(financialEntries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { date, amount } = req.body;
  try {
    const newEntry = await prisma.financialEntry.create({
      data: { date, amount }
    });
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;