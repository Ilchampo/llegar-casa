export type IconType = 'security' | 'speed' | 'community';
export type SocialLinkType = 'linkedin' | 'github' | 'website';

export interface Project {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	button: string;
}

export interface WhyUseItem {
	title: string;
	icon: IconType;
	description: string;
}

export interface Testimonial {
	quote: string;
	author: string;
}

export interface WhyUse {
	title: string;
	items: WhyUseItem[];
	testimonial: Testimonial;
}

export interface Country {
	name: string;
	code: string;
	placeholder: string;
	regex: string;
	active: boolean;
}

export interface Consultation {
	title: string;
	description: string;
	button: string;
	countries: Country[];
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface Faq {
	title: string;
	items: FaqItem[];
}

export interface SocialLink {
	type: SocialLinkType;
	url: string;
}

export interface Footer {
	subtitle: string;
	socialLinks: SocialLink[];
	disclaimer: string;
}

export interface Content {
	project: Project;
	whyUse: WhyUse;
	consultation: Consultation;
	faq: Faq;
	footer: Footer;
}
