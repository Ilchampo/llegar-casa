import type { ReactNode } from 'react';

import Footer from './Footer';

interface WrapperProps {
	children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = props => {
	const { children } = props;

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
			<main className="w-full">{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Wrapper;
