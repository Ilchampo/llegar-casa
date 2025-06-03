export type Environment = 'development' | 'production' | 'staging';

export interface AppConfig {
	port: number;
	env: Environment;
}

export interface ServiceParams {
	baseURL: string;
	timeout: number;
}

export interface ServicesConfig {
	complaints: ServiceParams;
	vehicles: ServiceParams;
}

export interface Config {
	app: AppConfig;
	services: ServicesConfig;
}
