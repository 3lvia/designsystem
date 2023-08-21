import data from '@elvia/elvis/.internal/classlist.json';
import { DocPageName } from './shared.enum';

export interface DocPage {
  title: string;
  titleNo?: string;
  description?: string;
  descriptionNo?: string;
  imageUrl?: string;
  imageUrlOn?: string;
  imageUrlDark?: string;
  imageUrlOnDark?: string;
  absolutePath?: string;
  fragmentPath?: string;
  docUrl?: string;
  externalUrl?: string;
  figmaUrl?: string;
  status?: string;
  type?: string;
  searchTerms?: string[];
  elvisClassName?: keyof typeof data.block;
  relatedComponents?: DocPageName[];
}
