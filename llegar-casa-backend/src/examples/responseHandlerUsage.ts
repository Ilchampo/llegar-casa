// Example usage of ResponseHandler with ApiCaller and database operations

import { ApiCaller } from '../lib/utils/apiCaller';
import { ResponseHandler } from '../lib/utils/responseHandler';
import type { Response } from '../lib/interfaces/response.interface';

// Example: Using ResponseHandler with external API calls
export class ExternalApiService {
	private apiCaller: ApiCaller;

	constructor() {
		this.apiCaller = new ApiCaller('https://api.example.com');
	}

	async getUserData(userId: string): Promise<Response<any>> {
		return ResponseHandler.handleApiCall(async () => {
			const response = await this.apiCaller.get(`/users/${userId}`);
			return { data: response.data, status: response.status };
		}, 'User data retrieved successfully');
	}

	async createUser(userData: any): Promise<Response<any>> {
		return ResponseHandler.handleApiCall(async () => {
			const response = await this.apiCaller.post('/users', userData);
			return { data: response.data, status: response.status };
		}, 'User created successfully');
	}
}

// Example: Using ResponseHandler with database operations
export class UserDatabaseService {
	async findUserById(id: string): Promise<Response<any>> {
		return ResponseHandler.handleDbOperation(async () => {
			// Simulate database query
			const user = await this.queryDatabase(`SELECT * FROM users WHERE id = ?`, [id]);
			return user;
		}, 'User found successfully');
	}

	async createUser(userData: any): Promise<Response<any>> {
		return ResponseHandler.handleDbOperation(async () => {
			// Simulate database insert
			const result = await this.executeQuery(`INSERT INTO users (name, email) VALUES (?, ?)`, [
				userData.name,
				userData.email,
			]);
			return { id: result.insertId, ...userData };
		}, 'User created successfully');
	}

	// Mock database methods
	private async queryDatabase(_query: string, _params: any[]): Promise<any> {
		// Your actual database implementation here
		return { id: 1, name: 'John Doe', email: 'john@example.com' };
	}

	private async executeQuery(_query: string, _params: any[]): Promise<any> {
		// Your actual database implementation here
		return { insertId: 1 };
	}
}

// Example: Using the services in a controller
export class UserController {
	private externalApi: ExternalApiService;
	private database: UserDatabaseService;

	constructor() {
		this.externalApi = new ExternalApiService();
		this.database = new UserDatabaseService();
	}

	async getUser(id: string): Promise<Response<any>> {
		// Try database first
		const dbResponse = await this.database.findUserById(id);

		if (ResponseHandler.isSuccess(dbResponse)) {
			return dbResponse;
		}

		// Fallback to external API
		const apiResponse = await this.externalApi.getUserData(id);
		return apiResponse;
	}

	async createUser(userData: any): Promise<Response<any>> {
		// Create in database
		const dbResponse = await this.database.createUser(userData);

		if (ResponseHandler.isError(dbResponse)) {
			return dbResponse;
		}

		// Optionally sync with external API
		try {
			await this.externalApi.createUser(userData);
		} catch (error) {
			// Log error but don't fail the operation since DB succeeded
			console.warn('Failed to sync user with external API:', error);
		}

		return dbResponse;
	}
}
