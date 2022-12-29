import { DocPageStatus, DocPageType } from './shared.enum';

export interface NavbarAnchor {
  title: string;
  top: number;
  height: number;
}

export interface DocPage {
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlOn?: string;
  absolutePath?: string;
  fragmentPath?: string;
  docUrl?: string;
  externalUrl?: string;
  figmaUrl?: string;
  status?: DocPageStatus;
  type?: DocPageType;
}
