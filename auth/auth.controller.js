import { prisma } from '../prisma.js';

import asyncHandler from "express-async-handler";

import { generateToken } from './generateToken.js';

import { hash, verify } from 'argon2';

import { faker } from '@faker-js/faker'

import { userFields } from '../utils/user.utils.js';

// @desc Auth User
// @route POST/user/login
// @access Public

export const authUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body

	if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

	const user = await prisma.client.findUnique({
		where: {
      email
    }
	})

	const isValidPassword = await verify(user.password, password)

	if(user && isValidPassword) {
		const token = generateToken(user.id)
		res.json({user, token})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}

	res.json(user)
})

// @desc Register User
// @route POST/user/Register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body

	const isHaveUser = await prisma.client.findUnique({
		where: {
      email
    }
	})

	if(isHaveUser) {
		res.status(400)
    throw new Error('User already exists')
  }
	try {
	// Создание пользователя в базе данных
	const user = await prisma.client.create({
		data: {
	  username,
      email,
      password: await hash(password),
			name: faker.name.fullName(),
			images
    },
		select: userFields
  })

	const token = generateToken(user.id)

	res.json({user, token})
	res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})