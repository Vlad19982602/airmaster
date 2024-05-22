import { prisma } from '../prisma.js';

import asyncHandler from "express-async-handler";

import { generateToken } from './generateToken.js';

import { hash } from 'argon2';

import { faker } from '@faker-js/faker'

// @desc Auth User
// @route POST/users/login
// @access Public

export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany()

	res.json(user)
})

// @desc Register User
// @route POST/users/Register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body 

	const isHaveUser = await prisma.user.findUnique({
		where: {
      email
    }
	})

	if(isHaveUser) {
		res.status(400)
    throw new Error('User already exists')
  }
	
	const user = await prisma.user.create({
		data: {
      email,
      password: await hash(password),
			name: faker.name.fullName()
    }
  })

	const token = generateToken(user.id)

	res.json(user, token)
})