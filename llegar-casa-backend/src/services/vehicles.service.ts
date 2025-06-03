import type { Response } from '../lib/interfaces/response.interface';
import type { Vehicle } from '../lib/interfaces/vehicle.interface';

import { ResponseHandler } from '../lib/utils/responseHandler';
import { ApiCaller } from '../lib/utils/apiCaller';
import { parseHtmlVehice } from '../lib/utils/htmlParser';

import FormData from 'form-data';

import config from '../config';

export class VehicleService {
	private readonly apiCaller: ApiCaller;

	constructor() {
		this.apiCaller = new ApiCaller(config.services.vehicles.baseURL);
	}

	async getVehicle(licensePlate: string): Promise<Response<Vehicle>> {
		return ResponseHandler.handleApiCall<Vehicle>(async () => {
			const form = new FormData();

			form.append('placa_vehiculo', licensePlate);

			const response = await this.apiCaller.post<string, FormData>('/', form, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.data.length === 0 || response.status !== 200) {
				throw new Error('No vehicle found');
			}

			const vehicle = parseHtmlVehice(response.data);

			return {
				data: vehicle,
				status: response.status,
			};
		}, 'Vehicle retrieved successfully');
	}
}
