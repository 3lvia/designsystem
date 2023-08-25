// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface ICenteredContentFields {
  /** Title */
  title?: LocalizedField<string> | undefined;

  /** Content */
  content: LocalizedField<Document>;
}

/** For centering content inside a section */

export interface ICenteredContent extends Entry<ICenteredContentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'centeredContent';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IDocumentationPageFields {
  /** Title */
  title: LocalizedField<string>;

  /** isMainPage */
  isMainPage?: LocalizedField<boolean> | undefined;

  /** Figma url */
  figmaUrl?: LocalizedField<string> | undefined;

  /** Page Description */
  pageDescription?: LocalizedField<Document> | undefined;

  /** Content */
  content?: LocalizedField<Document> | undefined;

  /** path */
  path: LocalizedField<string>;
}

/** All documentation pages should use this model and then be added to the correct subMenu */

export interface IDocumentationPage extends Entry<IDocumentationPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'documentationPage';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IDownloadContentFields {
  /** Name */
  name: LocalizedField<string>;

  /** Display title */
  displayTitle?: LocalizedField<string> | undefined;

  /** Display image */
  displayImage: LocalizedField<Asset>;

  /** Downloadable content */
  downloadableContent: LocalizedField<Asset>;
}

/** Upload files that will be displayed and downloadable */

export interface IDownloadContent extends Entry<IDownloadContentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'downloadContent';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IGridFields {
  /** Name */
  name?: LocalizedField<string> | undefined;

  /** Background */
  background: LocalizedField<'White' | 'Grey' | 'Dark'>;

  /** Grid elements */
  gridElements: LocalizedField<(IDownloadContent | IImage)[]>;
}

export interface IGrid extends Entry<IGridFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'grid';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IImageFields {
  /** Name */
  name: LocalizedField<string>;

  /** Alt text */
  altText: LocalizedField<string>;

  /** Size */
  size: LocalizedField<'original' | '25%' | '50%' | '75%' | '100%'>;

  /** Alignment */
  alignment?: LocalizedField<'left' | 'right' | 'center'> | undefined;

  /** Image */
  image: LocalizedField<Asset>;

  /** Description */
  description?: LocalizedField<Document> | undefined;

  /** Content next to image */
  inlineText?: LocalizedField<Document> | undefined;
}

export interface IImage extends Entry<IImageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'image';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IInternalLinkFields {
  /** Link text */
  title: LocalizedField<string>;

  /** Type */
  type: LocalizedField<'Standard' | 'Action'>;

  /** Url design.elvia.io (internal) */
  page?: LocalizedField<IDocumentationPage> | undefined;

  /** Name of paragraph on design.elvia.io */
  paragraph?: LocalizedField<string> | undefined;

  /** Url new tab / external */
  urlNewTab?: LocalizedField<string> | undefined;
}

/** Use for all links */

export interface IInternalLink extends Entry<IInternalLinkFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'internalLink';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ILandingPageFields {
  /** Title */
  title: LocalizedField<string>;

  /** Overview image */
  overviewImage?: LocalizedField<Asset> | undefined;

  /** Description */
  description?: LocalizedField<string> | undefined;
}

/** Landing page should be wrapped inside a documentationPage and then be placed inside the subMenu it belongs to */

export interface ILandingPage extends Entry<ILandingPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'landingPage';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ILandingPageWithCardsFields {
  /** Title */
  title: LocalizedField<string>;

  /** Overview card */
  overviewCard: LocalizedField<IOverviewCard[]>;
}

/** Landing page should be wrapped inside a documentationPage and then be placed inside the subMenu it belongs to */

export interface ILandingPageWithCards extends Entry<ILandingPageWithCardsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'landingPageWithCards';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IMainMenuFields {
  /** Title */
  title?: LocalizedField<string> | undefined;

  /** Submenus */
  submenus?: LocalizedField<ISubMenu[]> | undefined;
}

/** The main menu, contains submenus */

export interface IMainMenu extends Entry<IMainMenuFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'mainMenu';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IOverviewCardFields {
  /** Page icon */
  pageIcon: LocalizedField<Asset>;

  /** Page icon (dark theme) */
  pageIconDarkTheme?: LocalizedField<Asset> | undefined;

  /** Title */
  title: LocalizedField<string>;

  /** Page url */
  pageUrl: LocalizedField<IDocumentationPage>;
}

/** Cards for navigating to content from overview pages */

export interface IOverviewCard extends Entry<IOverviewCardFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'overviewCard';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ISectionFields {}

/** Section - should always be inside a documentationPage */

export interface ISection extends Entry<ISectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'section';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ISubMenuFields {
  /** Title */
  title: LocalizedField<string>;

  /** landing-page */
  landingPage?: LocalizedField<IDocumentationPage> | undefined;

  /** Pages */
  pages?: LocalizedField<IDocumentationPage[]> | undefined;

  /** Path */
  path: LocalizedField<string>;
}

/** Sub menues are the elements in the header that contains all documentation pages. SubMenues should be added to the MainMenu */

export interface ISubMenu extends Entry<ISubMenuFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'subMenu';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface ISubsectionFields {}

/** Sub-section, should always be inside a section */

export interface ISubsection extends Entry<ISubsectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'subsection';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IWhenToUseFields {
  /** Name */
  name: LocalizedField<string>;

  /** When to use */
  whenToUse: LocalizedField<Document>;

  /** When not to use */
  whenNotToUse: LocalizedField<Document>;
}

/** Bullet lists of when and when not to use a component. */

export interface IWhenToUse extends Entry<IWhenToUseFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'whenToUse';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export type CONTENT_TYPE =
  | 'centeredContent'
  | 'documentationPage'
  | 'downloadContent'
  | 'grid'
  | 'image'
  | 'internalLink'
  | 'landingPage'
  | 'landingPageWithCards'
  | 'mainMenu'
  | 'overviewCard'
  | 'section'
  | 'subMenu'
  | 'subsection'
  | 'whenToUse';

export type IEntry =
  | ICenteredContent
  | IDocumentationPage
  | IDownloadContent
  | IGrid
  | IImage
  | IInternalLink
  | ILandingPage
  | ILandingPageWithCards
  | IMainMenu
  | IOverviewCard
  | ISection
  | ISubMenu
  | ISubsection
  | IWhenToUse;

export type LOCALE_CODE = 'en-GB' | 'nb-NO';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-GB';

export type LocalizedField<T> = Partial<Record<LOCALE_CODE, T>>;

// We have to use our own localized version of Asset because of a bug in contentful https://github.com/contentful/contentful.js/issues/208
export interface Asset {
  sys: Sys;
  fields: {
    title: LocalizedField<string>;
    description: LocalizedField<string>;
    file: LocalizedField<{
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    }>;
  };
  toPlainObject(): object;
}
