export type Environment = 'development' | 'production' | 'staging';

export interface AppConfig {
	port: number;
	env: Environment;
}

export interface ServicesConfig {
	complaints: {
		baseURL: string;
		timeout: number;
	};
}

export interface Config {
	app: AppConfig;
	services: ServicesConfig;
}
