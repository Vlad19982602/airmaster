import jwt from 'jsonwebtoken';

export const generateToken = useId =>
	jwt.sign(
		{
			useId,
		},
		process.env.ACCESS_TOKEN,
		{
			expiresIn: '10d'
		}
	)