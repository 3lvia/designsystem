import data from '@elvia/elvis/.internal/classlist.json';

import { DocPageName } from './shared.enum';

export type DocPageType = 'About' | 'Brand' | 'Component' | 'Patterns' | 'Tools';

export interface DocPage {
  title: string;
  titleNo?: string;
  description?: string;
  descriptionNo?: string;
  absolutePath?: string;
  docUrl: DocPageName;
  figmaUrl?: string;
  type: DocPageType;
  searchTerms?: string[];
  elvisClassName?: keyof typeof data.block;
  relatedPages?: DocPageName[];
  isMainPage?: true;
  imageUrl?: `assets/doc-page-icons/${string}`;
}

export interface HomeMenuCard {
  title: string;
  description: string;
  docUrl: DocPageName;
  absolutePath: string;
  imageUrl: `assets/${string}`;
  imageUrlOn: `assets/${string}`;
}
