import data from '@elvia/elvis/.internal/classlist.json';

import { DocPageName } from './shared.enum';

export interface DocPage {
  title: string;
  titleNo?: string;
  description?: string;
  descriptionNo?: string;
  absolutePath?: string;
  docUrl: DocPageName;
  figmaUrl?: string;
  type: 'About' | 'Brand' | 'Component' | 'Patterns' | 'Tools';
  searchTerms?: string[];
  elvisClassName?: keyof typeof data.block;
  relatedPages?: DocPageName[];
}

export interface HomeMenuCard {
  title: string;
  description: string;
  docUrl: DocPageName;
  absolutePath: string;
  imageUrl: string;
  imageUrlOn: string;
  imageUrlDark: string;
  imageUrlOnDark: string;
}
