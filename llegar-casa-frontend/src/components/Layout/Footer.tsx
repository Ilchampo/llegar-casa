import type { SocialLinkType } from '../../interfaces/content.interface';

import React from 'react';

import { ShieldCheck, Linkedin, Github, Globe } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

const Footer = () => {
	const { project, footer } = useContent();

	const getSocialLinkIcon = (type: SocialLinkType): React.ReactNode => {
		switch (type) {
			case 'linkedin':
				return <Linkedin className="h-6 w-6" />;
			case 'github':
				return <Github className="h-6 w-6" />;
			default:
				return <Globe className="h-6 w-6" />;
		}
	};

	return (
		<footer className="bg-blue-900 text-white py-12 px-4 md:px-8">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between mb-8">
					<div className="mb-8 md:mb-0">
						<div className="flex items-center mb-4">
							<ShieldCheck className="h-8 w-8 mr-3" />
							<h3 className="text-xl font-bold">{project.title}</h3>
						</div>
						<p className="max-w-md text-blue-200">{footer.subtitle}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Síguenos</h4>
						<div className="flex space-x-4">
							{footer.socialLinks.map(link => (
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-200 hover:text-white transition-colors"
									aria-label={link.type}
									key={link.type}
								>
									{getSocialLinkIcon(link.type)}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="border-t border-blue-800 pt-6 mt-6">
					<p className="text-sm text-blue-300 max-w-3xl">
						<strong>Disclaimer legal:</strong> {footer.disclaimer}
					</p>
					<p className="text-sm text-blue-400 mt-4">
						&copy; {new Date().getFullYear()} {project.title}. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
