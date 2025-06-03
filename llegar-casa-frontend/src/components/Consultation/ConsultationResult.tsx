import { CheckCircle, AlertTriangle, Calendar, MapPin, AlertCircle } from 'lucide-react';
interface ConsultationResultProps {
	type: 'safe' | 'warning';
	data?: {
		name?: string;
		description?: string;
		date?: string;
		location?: string;
		isStolen?: boolean;
		lastUpdate?: string;
	};
}
export function ConsultationResult({ type, data }: ConsultationResultProps) {
	const today = new Date().toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	if (type === 'safe') {
		return (
			<div className="bg-green-50 border border-green-200 p-6 rounded-lg">
				<div className="flex items-center mb-4">
					<CheckCircle className="h-8 w-8 text-green-600 mr-3" />
					<h3 className="text-xl font-semibold text-green-800">
						El vehículo no tiene problemas registrados.
					</h3>
				</div>
				<ul className="space-y-3 mb-4">
					<li className="flex items-start">
						<div className="h-6 w-6 text-green-600 mr-2">✓</div>
						<span>Estado legal: Sin demandas ni procesos activos.</span>
					</li>
					<li className="flex items-start">
						<div className="h-6 w-6 text-green-600 mr-2">✓</div>
						<span>Reporte de robo: No reportado como robado.</span>
					</li>
					<li className="flex items-center">
						<Calendar className="h-5 w-5 text-gray-600 mr-2" />
						<span>Última actualización: {data?.lastUpdate || today}</span>
					</li>
				</ul>
				<div className="bg-green-100 p-4 rounded-md">
					<p className="text-green-800">
						Este vehículo parece seguro según nuestros registros. Siempre mantén precaución.
					</p>
				</div>
			</div>
		);
	}
	return (
		<div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
			<div className="flex items-center mb-4">
				<AlertTriangle className="h-8 w-8 text-amber-600 mr-3" />
				<h3 className="text-xl font-semibold text-amber-800">
					Este vehículo tiene reportes que debes revisar.
				</h3>
			</div>
			<ul className="space-y-4 mb-5">
				{data?.name && (
					<li className="flex items-start">
						<span className="font-medium w-40">Nombre del implicado:</span>
						<span>{data.name}</span>
					</li>
				)}
				{data?.description && (
					<li className="flex items-start">
						<span className="font-medium w-40">Descripción:</span>
						<span>{data.description}</span>
					</li>
				)}
				{data?.date && (
					<li className="flex items-center">
						<Calendar className="h-5 w-5 text-amber-600 mr-2" />
						<span className="font-medium w-36">Fecha del registro:</span>
						<span>{data.date}</span>
					</li>
				)}
				{data?.location && (
					<li className="flex items-center">
						<MapPin className="h-5 w-5 text-amber-600 mr-2" />
						<span className="font-medium w-36">Lugar:</span>
						<span>{data.location}</span>
					</li>
				)}
				{data?.isStolen && (
					<li className="flex items-center text-red-600 font-semibold">
						<AlertCircle className="h-5 w-5 mr-2" />
						<span>Estado del vehículo: ⚠️ Reportado como robado</span>
					</li>
				)}
			</ul>
			<div className="bg-amber-100 p-4 rounded-md">
				<p className="text-amber-800 font-medium">
					Si puedes, evita usar este vehículo y considera reportarlo a las autoridades.
				</p>
			</div>
		</div>
	);
}
