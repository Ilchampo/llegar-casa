import React from 'react';

import { ShieldCheck } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

interface HeroContentProps {
	onConsultClick: VoidFunction;
}

const HeroContent: React.FC<HeroContentProps> = props => {
	const { onConsultClick } = props;
	const { project } = useContent();

	return (
		<div className="md:w-3/5 mb-10 md:mb-0">
			<div className="flex items-center mb-6">
				<ShieldCheck className="h-8 w-8 mr-3" />
				<h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
			</div>
			<h2 className="text-4xl md:text-5xl font-bold mb-6">{project.subtitle}</h2>
			<p className="text-xl md:text-2xl mb-8">{project.description}</p>
			<button
				onClick={onConsultClick}
				className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-100 transition duration-300 shadow-lg"
			>
				{project.button}
			</button>
		</div>
	);
};

export default HeroContent;
