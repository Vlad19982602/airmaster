import express from 'express'

import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const timeEntries = await prisma.timeEntry.findMany();
  res.json(timeEntries);
});

router.post('/', async (req, res) => {
  const newTimeEntry = await prisma.timeEntry.create({
    data: req.body,
  });
  res.json(newTimeEntry);
});

router.get('/:id', async (req, res) => {
  const timeEntry = await prisma.timeEntry.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(timeEntry);
});

router.put('/:id', async (req, res) => {
  const updatedTimeEntry = await prisma.timeEntry.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(updatedTimeEntry);
});

router.delete('/:id', async (req, res) => {
  const deletedTimeEntry = await prisma.timeEntry.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedTimeEntry);
});

export default router