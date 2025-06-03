import type { Config, Environment } from './lib/interfaces/config.interface';

import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
	app: {
		port: parseInt(process.env.PORT ?? '3000'),
		env: (process.env.NODE_ENV as Environment) ?? 'development',
	},
	services: {
		complaints: {
			baseURL: process.env.COMPLAINTS_BASE_URL ?? 'http://localhost:8000',
			timeout: parseInt(process.env.COMPLAINTS_TIMEOUT ?? '20000'),
		},
	},
};

export default config;
