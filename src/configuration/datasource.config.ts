import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export function getConfig() {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    schema: process.env.SB_SCHEMA,
    logging: true,
    synchronize: false,
    migrations: [__dirname + '/../migration/*.{ts,js}'],
    entities: [__dirname + '/../entities/*.{ts,js}'],
  } as DataSourceOptions;
}
