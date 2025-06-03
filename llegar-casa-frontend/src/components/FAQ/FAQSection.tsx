import { useContent } from '../../hooks/useContent';
import { useState } from 'react';

import FAQItem from './FAQItem';

const FAQSection = () => {
	const { faq } = useContent();

	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};
	return (
		<section className="py-16 px-4 md:px-8 bg-white">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Preguntas Frecuentes</h2>
				<div className="space-y-4">
					{faq.items.map((faq, index) => (
						<FAQItem
							key={index}
							question={faq.question}
							answer={faq.answer}
							handleClick={() => toggleFAQ(index)}
							isOpen={openIndex === index}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
