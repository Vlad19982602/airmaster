import prisma from '../prisma.js';

export const createProject = async (req, res) => {
  const { name, description, clientId } = req.body;

  if (!name || !description || !clientId) {
    return res.status(400).json({ error: 'Name, description, and clientId are required' });
  }

  try {
    // Проверка на существование клиента
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Создание нового проекта
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        client: {
          connect: { id: clientId },
        },
      },
    });

    console.log('New project created:', newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);

    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Project with this name already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};