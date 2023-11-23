export type Category = 'title' | 'body-text' | 'special-text';
export type Modifier = 'regular' | 'strong' | 'light' | 'italic' | 'mono';

export type FontFamily = 'Red Hat Display' | 'Red Hat Text' | 'Red Hat Mono';
export type FontWeight = 900 | 500 | 400 | 300;
export type FontStyle = 'regular' | 'italic' | 'black' | 'medium' | 'light';

export type Typography = Readonly<{
  title: string;
  description: string;
  class: `e-${'text' | 'title'}-${string}`;
  details: {
    size: string;
    lineHeight: string;
    fontWeight: FontWeight;
    fontFamily: FontFamily;
    fontStyle: FontStyle;
  };
  modifier: Modifier;
}>;

export type Typographies = Readonly<Typography[]>;

export const titleTypographies = [
  {
    title: 'Large',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-lg',
    details: {
      size: '44px',
      lineHeight: '120%',
      fontWeight: 900,
      fontFamily: 'Red Hat Display',
      fontStyle: 'black',
    },
    modifier: 'regular',
  },
  {
    title: 'Medium',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-md',
    details: {
      size: '30px',
      lineHeight: '120%',
      fontWeight: 900,
      fontFamily: 'Red Hat Display',
      fontStyle: 'black',
    },
    modifier: 'regular',
  },
  {
    title: 'Small',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-sm',
    details: {
      size: '24px',
      lineHeight: '120%',
      fontWeight: 900,
      fontFamily: 'Red Hat Display',
      fontStyle: 'black',
    },
    modifier: 'regular',
  },
  {
    title: 'XSmall',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-xs',
    details: {
      size: '18px',
      lineHeight: '120%',
      fontWeight: 900,
      fontFamily: 'Red Hat Display',
      fontStyle: 'black',
    },
    modifier: 'regular',
  },
  {
    title: 'XXSmall',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-xxs',
    details: {
      size: '15px',
      lineHeight: '120%',
      fontWeight: 900,
      fontFamily: 'Red Hat Display',
      fontStyle: 'black',
    },
    modifier: 'regular',
  },
  {
    title: 'Caps',
    description:
      'Titles are used as headings for your content. They will stand out from the rest with their heavyweight and enhance visual hierarchy.',
    class: 'e-title-caps',
    details: {
      size: '14px',
      lineHeight: '120%',
      fontWeight: 500,
      fontFamily: 'Red Hat Display',
      fontStyle: 'medium',
    },
    modifier: 'regular',
  },
] satisfies Typographies;

export const textTypographies = [
  {
    title: 'Lead',
    description:
      'Text Lead is our biggest text option and used for introduction of an article between heading and for paragraphs as a brief summary of the content.',
    class: 'e-text-lead',
    details: {
      size: '24px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Large',
    description: 'Text large is our main option for longer text in articles at external webpages.',
    class: 'e-text-lg',
    details: {
      size: '20px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Medium',
    description: 'Text medium is our main option for both long and short text in internal applications.',
    class: 'e-text-md',
    details: {
      size: '16px',
      lineHeight: '175%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Small',
    description:
      'Text small is the smallest variant of body text and can be used for short text in internal applications.',
    class: 'e-text-sm',
    details: {
      size: '14px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Large',
    description: 'Text large is our main option for longer text in articles at external webpages.',
    class: 'e-text-lg-light',
    details: {
      size: '20px',
      lineHeight: '160%',
      fontWeight: 300,
      fontFamily: 'Red Hat Text',
      fontStyle: 'light',
    },
    modifier: 'light',
  },
  {
    title: 'Medium',
    description: 'Text medium is our main option for both long and short text in internal applications.',
    class: 'e-text-md-light',
    details: {
      size: '16px',
      lineHeight: '175%',
      fontWeight: 300,
      fontFamily: 'Red Hat Text',
      fontStyle: 'light',
    },
    modifier: 'light',
  },
  {
    title: 'Small',
    description:
      'Text small is the smallest variant of body text and can be used for short text in internal applications.',
    class: 'e-text-sm-light',
    details: {
      size: '14px',
      lineHeight: '160%',
      fontWeight: 300,
      fontFamily: 'Red Hat Text',
      fontStyle: 'light',
    },
    modifier: 'light',
  },
  {
    title: 'Large',
    description: 'Text large is our main option for longer text in articles at external webpages.',
    class: 'e-text-lg',
    details: {
      size: '20px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
    },
    modifier: 'italic',
  },
  {
    title: 'Medium',
    description: 'Text medium is our main option for both long and short text in internal applications.',
    class: 'e-text-md',
    details: {
      size: '16px',
      lineHeight: '175%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
    },
    modifier: 'italic',
  },
  {
    title: 'Small',
    description:
      'Text small is the smallest variant of body text and can be used for short text in internal applications.',
    class: 'e-text-sm',
    details: {
      size: '14px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
    },
    modifier: 'italic',
  },
  {
    title: 'Large',
    description: 'Text large is our main option for longer text in articles at external webpages.',
    class: 'e-text-lg-mono',
    details: {
      size: '20px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Mono',
      fontStyle: 'regular',
    },
    modifier: 'mono',
  },
  {
    title: 'Medium',
    description: 'Text medium is our main option for both long and short text in internal applications.',
    class: 'e-text-md-mono',
    details: {
      size: '16px',
      lineHeight: '175%',
      fontWeight: 400,
      fontFamily: 'Red Hat Mono',
      fontStyle: 'regular',
    },
    modifier: 'mono',
  },
  {
    title: 'Small',
    description:
      'Text small is the smallest variant of body text and can be used for short text in internal applications.',
    class: 'e-text-sm-mono',
    details: {
      size: '14px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Mono',
      fontStyle: 'regular',
    },
    modifier: 'mono',
  },
] satisfies Typographies;

export const specialTypographies = [
  {
    title: 'Micro',
    description:
      'Text micro is used as small descriptive text such as dates and values. Should not be used in long paragraphs, as it is very small.',
    class: 'e-text-micro',
    details: {
      size: '11px',
      lineHeight: '14px',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Micro',
    description:
      'Text micro is used as small descriptive text such as dates and values. Should not be used in long paragraphs, as it is very small.',
    class: 'e-text-micro-strong',
    details: {
      size: '11px',
      lineHeight: '14px',
      fontWeight: 500,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'strong',
  },
  {
    title: 'Micro',
    description:
      'Text micro is used as small descriptive text such as dates and values. Should not be used in long paragraphs, as it is very small.',
    class: 'e-text-micro-light',
    details: {
      size: '11px',
      lineHeight: '14px',
      fontWeight: 300,
      fontFamily: 'Red Hat Text',
      fontStyle: 'regular',
    },
    modifier: 'light',
  },
  {
    title: 'Quote',
    description: 'Text quote is only used when you have quotes in articles.',
    class: 'e-text-quote',
    details: {
      size: '26px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
    },
    modifier: 'regular',
  },
  {
    title: 'Image',
    description: 'Text image is only used together with an image for caption to provide more context.',
    class: 'e-text-img',
    details: {
      size: '18px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
    },
    modifier: 'regular',
  },
  {
    title: 'Interactive Large',
    description:
      'Interactive text is mostly used in components that are clickable like buttons, tabs, links etc. ',
    class: 'e-text-interactive-lg',
    details: {
      size: '18px',
      lineHeight: '133%',
      fontWeight: 500,
      fontFamily: 'Red Hat Display',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Interactive Medium',
    description:
      'Interactive text is mostly used in components that are clickable like buttons, tabs, links etc. ',
    class: 'e-text-interactive-md',
    details: {
      size: '16px',
      lineHeight: '138%',
      fontWeight: 500,
      fontFamily: 'Red Hat Display',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
  {
    title: 'Interactive Small',
    description:
      'Interactive text is mostly used in components that are clickable like buttons, tabs, links etc. ',
    class: 'e-text-interactive-sm',
    details: {
      size: '14px',
      lineHeight: '143%',
      fontWeight: 500,
      fontFamily: 'Red Hat Display',
      fontStyle: 'regular',
    },
    modifier: 'regular',
  },
] satisfies Typographies;
