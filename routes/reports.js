import express from 'express'

import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const reports = await prisma.report.findMany();
  res.json(reports);
});

router.post('/', async (req, res) => {
  const newReport = await prisma.report.create({
    data: req.body,
  });
  res.json(newReport);
});

router.get('/:id', async (req, res) => {
  const report = await prisma.report.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(report);
});

router.put('/:id', async (req, res) => {
  const updatedReport = await prisma.report.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(updatedReport);
});

router.delete('/:id', async (req, res) => {
  const deletedReport = await prisma.report.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedReport);
});

export default router