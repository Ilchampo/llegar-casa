import type { Content } from '../interfaces/content.interface';

import { createContext } from 'react';

export const ContentContext = createContext<Content | undefined>(undefined);
