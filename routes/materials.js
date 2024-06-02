import express from 'express'

import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const materials = await prisma.material.findMany();
  res.json(materials);
});

router.post('/', async (req, res) => {
  const newMaterial = await prisma.material.create({
    data: req.body,
  });
  res.json(newMaterial);
});

router.get('/:id', async (req, res) => {
  const material = await prisma.material.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(material);
});

router.put('/:id', async (req, res) => {
  const updatedMaterial = await prisma.material.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(updatedMaterial);
});

router.delete('/:id', async (req, res) => {
  const deletedMaterial = await prisma.material.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedMaterial);
});

export default router