export const smoothScroll = (sectionId: string) => {
	const section = document.getElementById(sectionId);

	if (section) {
		window.scrollTo({
			top: section.offsetTop,
			behavior: 'smooth',
		});
	}
};
