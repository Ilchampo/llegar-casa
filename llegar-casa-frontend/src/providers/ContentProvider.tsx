import type { Content } from '../interfaces/content.interface';
import type { ReactNode } from 'react';

import { ContentContext } from '../contexts/ContentContext';

import contentData from '../../content.json';

export const ContentProvider = ({ children }: { children: ReactNode }) => {
	return <ContentContext.Provider value={contentData as Content}>{children}</ContentContext.Provider>;
};
