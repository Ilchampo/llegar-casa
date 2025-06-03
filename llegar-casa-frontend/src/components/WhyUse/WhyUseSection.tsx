import { useContent } from '../../hooks/useContent';

import Testimonial from './Testimonial';
import UseCard from './UseCard';

const WhyUseSection = () => {
	const { whyUse } = useContent();

	return (
		<section className="py-16 px-4 md:px-8 bg-white">
			<div className="max-w-5xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-blue-800">{whyUse.title}</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					{whyUse.items.map(item => (
						<UseCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
					))}
				</div>
				<Testimonial quote={whyUse.testimonial.quote} author={whyUse.testimonial.author} />
			</div>
		</section>
	);
};

export default WhyUseSection;
