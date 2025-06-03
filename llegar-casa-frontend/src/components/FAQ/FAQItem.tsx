import React from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
	question: string;
	answer: string;
	handleClick: VoidFunction;
	isOpen: boolean;
}

const FAQItem: React.FC<FAQItemProps> = props => {
	const { question, answer, handleClick, isOpen } = props;

	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden">
			<button
				className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
				onClick={() => handleClick()}
			>
				<span className="font-medium text-gray-800">{question}</span>
				{isOpen ? (
					<ChevronUp className="h-5 w-5 text-blue-600" />
				) : (
					<ChevronDown className="h-5 w-5 text-blue-600" />
				)}
			</button>
			{isOpen && (
				<div className="p-4 bg-white">
					<p className="text-gray-700">{answer}</p>
				</div>
			)}
		</div>
	);
};

export default FAQItem;
