import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  try {
    const newEmployee = await prisma.employee.create({
      data: { firstName, lastName, email, phone }
    });
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;