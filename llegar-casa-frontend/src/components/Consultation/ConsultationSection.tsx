import { useState } from 'react';
import { ConsultationForm } from './ConsultationForm';
import { ConsultationResult } from './ConsultationResult';
interface ConsultationSectionProps {
	id?: string;
}
export function ConsultationSection({ id }: ConsultationSectionProps) {
	const [searchResult, setSearchResult] = useState<{
		plate: string;
		type: 'safe' | 'warning';
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleSubmit = (plate: string, _country: string) => {
		setIsLoading(true);
		setSearchResult(null);
		// Simulated API call
		setTimeout(() => {
			// For demo purposes, plates ending with odd numbers will show warnings
			const lastChar = plate.charAt(plate.length - 1);
			const hasIssue = !isNaN(parseInt(lastChar)) && parseInt(lastChar) % 2 === 1;
			if (hasIssue) {
				setSearchResult({
					plate,
					type: 'warning',
					data: {
						name: 'Juan Pérez',
						description: 'Demanda por transporte ilegal de pasajeros',
						date: '12/03/2023',
						location: 'Guayaquil, Guayas',
						isStolen: true,
					},
				});
			} else {
				setSearchResult({
					plate,
					type: 'safe',
					data: {
						lastUpdate: new Date().toLocaleDateString('es-ES'),
					},
				});
			}
			setIsLoading(false);
		}, 1000);
	};
	return (
		<section id={id} className="py-16 px-4 md:px-8 bg-gray-50">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Consulta de placa</h2>
				<p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
					Ingresa el número de placa para consultar si el vehículo tiene reportes legales o ha sido robado.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<ConsultationForm onSubmit={handleSubmit} isLoading={isLoading} />
						{searchResult && (
							<div className="mt-4 p-3 bg-blue-100 rounded-md text-center">
								<p className="text-blue-800">
									Resultados para la placa: <strong>{searchResult.plate}</strong>
								</p>
							</div>
						)}
					</div>
					<div>
						{isLoading ? (
							<div className="h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
								<p className="text-gray-500 text-center">Esperando resultados...</p>
							</div>
						) : searchResult ? (
							<ConsultationResult type={searchResult.type} data={searchResult.data} />
						) : (
							<div className="h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
								<p className="text-gray-500 text-center">
									Los resultados de la consulta aparecerán aquí.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
