import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, clientId } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { name, description, clientId: parseInt(clientId) }
    });
    res.json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;