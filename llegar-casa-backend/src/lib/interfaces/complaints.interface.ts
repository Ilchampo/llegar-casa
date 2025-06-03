export interface ComplaintData {
	crime_report_number: string;
	lugar: string;
	fecha: string;
	delito: string;
	procesados: string[];
	name_match_found: boolean;
	search_successful: boolean;
	error_message: string;
	searched_plate: string;
	searched_driver: string;
}

export interface ComplaintResponse {
	location: string;
	date: string;
	offense: string;
	nameMatchFound: boolean;
}
