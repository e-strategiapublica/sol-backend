db.createUser(
	{
		user: "sol",
		pwd: process.env.MONGO_SOL_PASSWORD,
		roles: [
			{
				role: "readWrite",
				db: "sol"
			}
		]
	}
)
