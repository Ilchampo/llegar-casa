import React, { useState } from 'react';

import { Search, Loader2 } from 'lucide-react';

interface ConsultationFormProps {
	onSubmit: (plate: string, country: string) => void;
	isLoading?: boolean;
}

export function ConsultationForm({ onSubmit, isLoading = false }: ConsultationFormProps) {
	const [plate, setPlate] = useState('');
	const [country, setCountry] = useState('ecuador');
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (plate.trim()) {
			onSubmit(plate.trim().toUpperCase(), country);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
			<div className="mb-6">
				<label htmlFor="country" className="block text-gray-700 font-medium mb-2">
					País
				</label>
				<select
					id="country"
					value={country}
					onChange={e => setCountry(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled={isLoading}
				>
					<option value="ecuador">Ecuador</option>
					<option value="colombia" disabled>
						Colombia (Próximamente)
					</option>
					<option value="peru" disabled>
						Perú (Próximamente)
					</option>
				</select>
			</div>
			<div className="mb-6">
				<label htmlFor="plate" className="block text-gray-700 font-medium mb-2">
					Placa Vehicular
				</label>
				<input
					id="plate"
					type="text"
					value={plate}
					onChange={e => setPlate(e.target.value)}
					placeholder="Ej: ABC-1234"
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					maxLength={8}
					disabled={isLoading}
				/>
			</div>
			<button
				type="submit"
				disabled={!plate.trim() || isLoading}
				className={`w-full flex items-center justify-center py-3 rounded-md text-white font-medium 
          ${plate.trim() && !isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} 
          transition duration-300`}
			>
				{isLoading ? (
					<>
						<Loader2 className="h-5 w-5 mr-2 animate-spin" />
						Consultando...
					</>
				) : (
					<>
						<Search className="h-5 w-5 mr-2" />
						Consultar
					</>
				)}
			</button>
		</form>
	);
}
