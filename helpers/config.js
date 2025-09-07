import 'dotenv/config.js';

export const {
    PORT = 3000,
    DB_NAME = 'db_multifamiliar',
    DB_HOST = 'localhost',
    DB_USER = 'postgres',
    DB_PORT = 5432,
    DB_PASSWORD = 1234,
    JWT_SECRET_RESIDENTE = 'facil1',
    JWT_SECRET_ADMIN = 'facil2',
    FRONT_PORT = 5173
} = process.env;