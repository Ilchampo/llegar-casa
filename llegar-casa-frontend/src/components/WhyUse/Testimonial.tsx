import React from 'react';

interface TestimonialProps {
	quote: string;
	author: string;
}

const Testimonial: React.FC<TestimonialProps> = props => {
	const { quote, author } = props;

	const initials = author
		.split(' ')
		.map(name => name[0])
		.join('');

	return (
		<div className="bg-blue-100 p-8 rounded-lg shadow-md">
			<div className="flex flex-col md:flex-row items-center">
				<div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
					<div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-2xl font-bold">
						{initials}
					</div>
				</div>
				<div className="md:w-3/4 md:pl-8">
					<p className="text-lg mb-4 italic">"{quote}"</p>
					<p className="font-semibold text-blue-800">— {author}</p>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
