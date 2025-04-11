import { EnviromentVariablesEnum as Env } from "../enums/enviroment.variables.enum";

const enviroments: Record<Env, string | number | boolean> = {
  [Env.PORT]: parseInt(process.env[Env.PORT] || "3000", 10),
  [Env.ENABLE_CORS]: process.env[Env.ENABLE_CORS] || true,
  [Env.ENABLE_DOCS]: process.env[Env.ENABLE_DOCS] || false,

  [Env.NOSQL_CONNECTION_STRING]:
    process.env[Env.NOSQL_CONNECTION_STRING] ||
    "mongodb://root:example@localhost:151515/mydatabase?authSource=admin",

  [Env.JWT_KEY]: process.env[Env.JWT_KEY] || "default_jwt_key",
  [Env.JWT_REFRESH_TOKEN_KEY]:
    process.env[Env.JWT_REFRESH_TOKEN_KEY] || "default_refresh_key",
  [Env.JWT_REFRESH_TOKEN_EXPIRATION]:
    process.env[Env.JWT_REFRESH_TOKEN_EXPIRATION] || "7d",
  [Env.JWT_ACCESS_TOKEN_EXPIRATION]:
    process.env[Env.JWT_ACCESS_TOKEN_EXPIRATION] || "15m",

  [Env.ENCRYPT_KEY]: process.env[Env.ENCRYPT_KEY] || "default_encrypt_key",

  [Env.SENDGRID_EMAIL_SENDER]:
    process.env[Env.SENDGRID_EMAIL_SENDER] || "noreply@example.com",
  [Env.SENDGRID_API_KEY]: process.env[Env.SENDGRID_API_KEY] || "",

  [Env.LACCHAIN_NETWORK]:
    process.env[Env.LACCHAIN_NETWORK] || "lacchain-testnet",
  [Env.PROJECT_ID]: process.env[Env.PROJECT_ID] || "",
  [Env.BUCKET]: process.env[Env.BUCKET] || "",

  [Env.PROVIDER]: process.env[Env.PROVIDER] || "",
  [Env.REGISTRY_CONTRACT_ADDRESS]:
    process.env[Env.REGISTRY_CONTRACT_ADDRESS] || "",
  [Env.OWNER_ADDRESS]: process.env[Env.OWNER_ADDRESS] || "",
  [Env.ADMIN_PRIVATE_KEY]: process.env[Env.ADMIN_PRIVATE_KEY] || "",

  [Env.BLOCKCHAIN_ACTIVE]: process.env[Env.BLOCKCHAIN_ACTIVE] === "true",

  [Env.PASSWORD_SALT]: parseInt(process.env[Env.PASSWORD_SALT] || "10", 10),
  [Env.ADMIN_DEFAULT_EMAIL]:
    process.env[Env.ADMIN_DEFAULT_EMAIL] || "admin@example.com",
  [Env.ADMIN_DEFAULT_PASSWORD]:
    process.env[Env.ADMIN_DEFAULT_PASSWORD] || "admin123",
};

export default () => enviroments;
