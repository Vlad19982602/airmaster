import { prisma } from '../prisma.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from './generateToken.js';
import { hash, verify } from 'argon2';
import { faker } from '@faker-js/faker';
import { userFields } from '../utils/user.utils.js';

// Контроллер для регистрации пользователя
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration request:', { username, email, password });

  try {
    // Хеширование пароля с использованием Argon2
    const hashedPassword = await hash(password);
    console.log('Password hashed successfully');

    // Создание пользователя в базе данных
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created successfully:', newUser);

    // Генерация токена аутентификации
    const token = generateToken(newUser.id);

    res.status(201).json({ ...newUser, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Контроллер для входа пользователя
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Сравнение пароля с хешем, используя Argon2
    const isMatch = await verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: error.message });
  }
});


	// Маршрут для получения профиля пользователя.
export const getProfile = async (req, res) => {

  try {
    const userId = req.user.userId;
    const user = await prisma.client.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};