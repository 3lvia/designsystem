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
