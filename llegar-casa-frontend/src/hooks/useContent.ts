import { ContentContext } from '../contexts/ContentContext';
import { useContext } from 'react';

export const useContent = () => {
	const content = useContext(ContentContext);

	if (!content) {
		throw new Error('useContent must be used within a ContentProvider');
	}

	return content;
};
