import type { IconType } from '../../interfaces/content.interface';

import React from 'react';

import { Shield, Clock, Users } from 'lucide-react';

interface UseCardProps {
	title: string;
	icon: IconType;
	description: string;
}

const UseCard: React.FC<UseCardProps> = props => {
	const { title, description, icon } = props;

	const getIconCard = (): React.ReactNode => {
		switch (icon) {
			case 'security':
				return <Shield className="h-8 w-8 text-blue-600 mr-3" />;
			case 'speed':
				return <Clock className="h-8 w-8 text-blue-600 mr-3" />;
			default:
				return <Users className="h-8 w-8 text-blue-600 mr-3" />;
		}
	};

	return (
		<div className="p-6 bg-blue-50 rounded-lg shadow-sm">
			<div className="flex items-center mb-4">
				{getIconCard()}
				<h3 className="text-xl font-semibold">{title}</h3>
			</div>
			<p>{description}</p>
		</div>
	);
};

export default UseCard;
