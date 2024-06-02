import jwt from 'jsonwebtoken';

export const generateToken = userId =>
	jwt.sign(
		{
			userId,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '10d'
		}
	)

export const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

	  return { accessToken, refreshToken };
};