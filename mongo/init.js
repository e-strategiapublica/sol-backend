db.createUser(
	{
		user: "sol",
		pwd: process.env.MONGO_PASSWORD,
		roles: [
			{
				role: "readWrite",
				db: "sol"
			}
		]
	}
)
