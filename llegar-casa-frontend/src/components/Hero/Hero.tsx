import { smoothScroll } from '../../utils/smoothScroll';
import { useContent } from '../../hooks/useContent';

import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

const Hero = () => {
	const { project } = useContent();

	const onConsultClick = () => {
		smoothScroll('consultation');
	};

	return (
		<section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 md:px-8">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row items-center">
					<HeroContent onConsultClick={onConsultClick} />
					<HeroImage src={project.image} alt={project.title} />
				</div>
			</div>
		</section>
	);
};

export default Hero;
