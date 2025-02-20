db.createUser(
	{
		user: "sol",
		pwd: "password",  // Senha direta ou variável de ambiente se necessário
		roles: [
			{
				role: "readWrite",
				db: "sol"
			},
			{
				role: "readWrite",
				db: "test"  // Adicionando permissão para o banco 'test'
			}
		]
	}
)
