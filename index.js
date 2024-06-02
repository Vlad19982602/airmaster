import 'colors'

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'; // Импортируем middleware CORS
import prisma from './prisma.js'; // Импортируем только один раз
import authRoutes from './routes/auth.js';
import clientsRoutes from './routes/clients.js';
import projectsRoutes from './routes/projects.js';
import materialsRoutes from './routes/materials.js';
import timeEntriesRoutes from './routes/timeEntries.js';
import reportsRoutes from './routes/reports.js';
import contractorsRoutes from './routes/contractors.js'; // Новый маршрут для подрядчиков
import { notFound, errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();

app.use(cors()); // Используем middleware CORS

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/timeEntries', timeEntriesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/contractors', contractorsRoutes); // Подключаем маршрут для подрядчиков

// Добавляем маршрут для калькулятора
app.post('/api/calculate', async (req, res) => {
  const { question1, question2, question3, question4, question5 } = req.body;
  
  try {
    const newEntry = await prisma.calculation.create({
      data: {
        question1:JSON.stringify(question1),
        question2,
        question3:JSON.stringify(question3),
        question4,
        question5
      }
    });

    // Выполните необходимые вычисления здесь
    const result = `Ответы: ${JSON.stringify(question1)}, ${question2}, ${question3}, ${question4}, ${question5}`;

    res.status(200).json(result);
  } catch (error) {
    console.error('Error calculating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold);
});

// Основная функция для запуска сервера и обработки маршрутов
async function main() {
  try {
    // Подключение к базе данных (если необходимо)
    await prisma.$connect();

    // Сервер уже запущен выше в app.listen, здесь можно выполнить другие задачи
    console.log('Connected to database successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
}

// Запуск сервера
main().catch(e => {
  console.error(e);
  process.exit(1);
});

// main().then(async () => {
// 	await prisma.$disconnect()
// })
// .catch(async e => {
// 	console.error(e)
// 	await prisma.$disconnect()
// 	process.exit(1)
// })