import { Locale } from 'src/app/core/services/localization.service';

interface StyleText {
  description: string;
  shadows: { title: string; description: string }[];
}
export const styleText: Record<Locale, StyleText> = {
  'en-GB': {
    description: 'We have three different shadows; soft, medium and hard.',
    shadows: [
      {
        title: 'Soft',
        description: 'Soft is mostly used on grey backgrounds.',
      },
      {
        title: 'Medium',
        description: 'Should be used on white backgrounds.',
      },
      {
        title: 'Hard',
        description: 'Should be used on white backgrounds.',
      },
    ],
  },
  'nb-NO': {
    description: 'Vi har tre forskjellige skygger; myk, medium og hard.',
    shadows: [
      {
        title: 'Myk',
        description: 'Myke skygger er stort sett brukt på grå bakgrunn.',
      },
      {
        title: 'Medium',
        description: 'Bør kun brukes på hvit bakgrunn.',
      },
      {
        title: 'Hard',
        description: 'Bør kun brukes på hvit bakgrunn.',
      },
    ],
  },
};

interface DoDontText {
  do: string[];
  dont: string[];
}
export const doAndDont: Record<Locale, DoDontText> = {
  'en-GB': {
    do: ['Behind a solid surface (for example together with cards).'],
    dont: [
      'Should not be applied to typography or icons.',
      "Don't use a lot of shadows on the same surface, since we want our visual profile to have a more flat expression.",
    ],
  },
  'nb-NO': {
    do: ['Bak en solid flate (for eksempel sammen med kort).'],
    dont: [
      'Skal ikke brukes på typografi eller ikoner.',
      'Ikke bruk skygge flere steder på samme overflate, siden vi ønsker at vår visuelle identitet skal ha et flatt uttrykk.',
    ],
  },
};
