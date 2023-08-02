export interface NavbarAnchor {
  title: string;
  top: number;
  height: number;
}

export interface DocPage {
  title: string;
  titleNo?: string;
  description?: string;
  descriptionNo?: string;
  imageUrl?: string;
  imageUrlOn?: string;
  absolutePath?: string;
  fragmentPath?: string;
  docUrl?: string;
  externalUrl?: string;
  figmaUrl?: string;
  status?: string;
  type?: string;
  searchTerms?: string[];
  relatedComponents?: string[];
}
