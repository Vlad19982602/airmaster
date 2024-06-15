import { prisma } from '../prisma.js';
import asyncHandler from 'express-async-handler';

// Контроллер для создания отчета
export const createReport = asyncHandler(async (req, res) => {
  const { date, description, projectId, materialCost, laborCost, totalCost } = req.body;

  try {
    const newReport = await prisma.report.create({
      data: {
        date: new Date(date),
        description,
        projectId: parseInt(projectId),
        materialCost: parseFloat(materialCost),
        laborCost: parseFloat(laborCost),
        totalCost: parseFloat(totalCost),
      },
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: error.message });
  }
});

// Контроллер для получения отчетов
export const getReports = asyncHandler(async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: error.message });
  }
});