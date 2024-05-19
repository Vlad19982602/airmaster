import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import  morgan from 'morgan'

import authRoutes from './auth/auth.routes.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV == 'development') 
		app.use(morgan ('dev'))

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.green
				.bold
		)
	)

	app.use(express.json())
	app.use('./auth', authRoutes)
}

main()