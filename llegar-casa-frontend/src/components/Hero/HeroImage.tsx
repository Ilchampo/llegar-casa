import React from 'react';

interface HeroImageProps {
	src: string;
	alt: string;
}

const HeroImage: React.FC<HeroImageProps> = props => {
	const { src, alt } = props;

	return (
		<div className="md:w-2/5">
			<div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-sm">
				<img src={src} alt={alt} className="rounded-lg w-full h-auto shadow-md" />
			</div>
		</div>
	);
};

export default HeroImage;
