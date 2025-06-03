import type { ComplaintResponse, ComplaintData } from '../lib/interfaces/complaints.interface';
import type { Response } from '../lib/interfaces/response.interface';

import { ResponseHandler } from '../lib/utils/responseHandler';
import { ApiCaller } from '../lib/utils/apiCaller';

import config from '../config';

export class ComplaintsService {
	private readonly apiCaller: ApiCaller;

	constructor() {
		this.apiCaller = new ApiCaller(config.services.complaints.baseURL);
	}

	async getComplaints(licensePlate: string): Promise<Response<ComplaintResponse>> {
		return ResponseHandler.handleApiCall<ComplaintResponse>(async () => {
			const response = await this.apiCaller.get<ComplaintData>('/scraper/complaints', {
				params: {
					license_plate: licensePlate.replace('-', ''),
				},
			});

			const transformedData: ComplaintResponse = {
				location: response.data.lugar,
				date: response.data.fecha,
				offense: response.data.delito,
			};

			return {
				data: transformedData,
				status: response.status,
			};
		}, 'Complaints retrieved successfully');
	}
}
