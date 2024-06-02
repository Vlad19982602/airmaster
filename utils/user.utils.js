export const userFields = {
		id: true,
		faker: true,
		email: true,
		images: true,
		clients: {
			select: {
				id: true,
				faker: true,
				email: true,
				phone: true,
				createdAt: true,
				updatedAt: true,
			}
		}
}