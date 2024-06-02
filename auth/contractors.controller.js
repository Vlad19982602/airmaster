import prisma from '../prisma.js';

export const createContractor = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    // Проверка на существование подрядчика с таким же email
    const existingContractor = await prisma.contractor.findUnique({
      where: { email }
    });

    if (existingContractor) {
      return res.status(400).json({ error: 'Contractor with this email already exists' });
    }

    // Создание нового подрядчика
    const newContractor = await prisma.contractor.create({
      data: { name, email, phone }
    });

    console.log('New contractor created:', newContractor);
    res.status(201).json(newContractor);
  } catch (error) {
    console.error('Error creating contractor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getContractors = async (req, res) => {
  try {
    const contractors = await prisma.contractor.findMany();
    res.status(200).json(contractors);
  } catch (error) {
    console.error('Error fetching contractors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};