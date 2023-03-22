import { ISubMenu } from 'contentful/types';

export interface TransformedDocPage {
  title: string;
  pageDescription: string;
  figmaUrl: string;
  content: string;
  isMainPage: boolean;
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

export interface CMSNavbarItem {
  title: string;
  isMainPage: boolean;
  docUrl: string;
  fullPath: string;
}
