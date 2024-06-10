import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany();
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, quantity, projectId } = req.body;
  try {
    const newEquipment = await prisma.equipment.create({
      data: { name, quantity: parseFloat(quantity), projectId: parseInt(projectId) }
    });
    res.json(newEquipment);
  } catch (error) {
    console.error('Error adding equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;