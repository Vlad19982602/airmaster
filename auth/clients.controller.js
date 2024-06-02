import prisma from '../prisma.js';

export const createClient = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    // Проверка на существование клиента с таким же email
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return res.status(400).json({ error: 'Client with this email already exists' });
    }

    // Создание нового клиента
    const newClient = await prisma.client.create({
      data: { name, email, phone }
    });

    console.log('New client created:', newClient);
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};