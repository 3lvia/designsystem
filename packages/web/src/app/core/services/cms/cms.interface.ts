import { ISubMenu } from 'contentful/__generated__/types';

export interface TransformedDocPage {
  title: string;
  pageDescription: string;
  figmaUrl: string;
  content: string;
  isMainPage: boolean | string;
  docUrl: string;
  fullPath: string;
  lastUpdated: string;
  errorMessages: CMSDocPageError[];
}

export interface CMSDocPageError {
  name: string;
  message: string;
}

export interface CMSSubMenu {
  title: string;
  entry_id: string;
  entry: ISubMenu;
  path: string;
}

export interface CMSMenu {
  title: string;
  pages: CMSSubMenu[];
}
