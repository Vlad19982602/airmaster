import 'colors'
// modules and libraries
// import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
// prisma
import prisma from './prisma.js'; // Импортируем только один раз
// routes
import authRoutes from './routes/auth.js'
import registerRoutes from './routes/register.js'
import clientsRoutes from './routes/clients.js'
import projectsRoutes from './routes/projects.js'
import materialsRoutes from './routes/materials.js'
import timeEntriesRoutes from './routes/timeEntries.js'
import contractorsRoutes from './routes/contractors.js' // Новый маршрут для подрядчиков
import financialsRoutes from './routes/financials.js'
import employeesRoutes from './routes/employees.js'
import equipmentRoutes from './routes/equipment.js'
import reportsRoutes from './routes/reports.js'; // Импортируем маршруты для отчетов


// middleware routes
import cors from 'cors'; // Импортируем middleware CORS
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

// Определение __filename и __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
app.use('/api/login', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/timeEntries', timeEntriesRoutes);
app.use('/api/contractors', contractorsRoutes); // Подключаем маршрут для подрядчиков
app.use('/api/financials', financialsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/reports', reportsRoutes); // Подключаем маршруты для отчетов


// Добавляем маршрут для калькулятора
app.post('/api/calculate', async (req, res) => {
  const { question1, question2, question3, question4, question5 } = req.body;

  try {
    let newEntry = await prisma.calculation.create({
      data: {
        question1: JSON.stringify(question1),
        question2,
        question3: JSON.stringify(question3),
        question4: JSON.stringify(question4),
        question5: JSON.stringify(question5)
      }
    });

    // Выполните необходимые вычисления здесь
    newEntry = {
      question1: question1 || [],
      question2: question2 || '',
      question3: question3 || [],
      question4: question4 || [],
      question5: question5 || { method: '', contact: '' }
    };

    res.status(200).json(newEntry); // Возвращаем объект newEntry напрямую
  } catch (error) {
    console.error('Error calculating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Настройка статической папки для клиентской части
// app.use(express.static(path.join(__dirname, '../client/build')));

// Обработка всех остальных маршрутов и возврат index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold);
});

// Основная функция для запуска сервера и обработки маршрутов
async function main() {
  try {
    // Подключение к базе данных
    await prisma.$connect();

    // Сервер уже запущен выше в app.listen
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