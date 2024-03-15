type IllustrationExhibitEntry = {
  name: string;
  searchKeywords: string[];
};
export type IllustrationName = (typeof illustrationsExhibitData)[number]['name'];

export const illustrationsExhibitData = [
  {
    name: 'broken',
    searchKeywords: [],
  },
  {
    name: 'clock',
    searchKeywords: [],
  },
  {
    name: 'confirmation',
    searchKeywords: [],
  },
  {
    name: 'connected',
    searchKeywords: [],
  },
  {
    name: 'consumption',
    searchKeywords: [],
  },
  {
    name: 'explain',
    searchKeywords: [],
  },
  {
    name: 'heating',
    searchKeywords: [],
  },
  {
    name: 'hello',
    searchKeywords: [],
  },
  {
    name: 'installation',
    searchKeywords: [],
  },
  {
    name: 'meter-reading',
    searchKeywords: [],
  },
  {
    name: 'new',
    searchKeywords: [],
  },
  {
    name: 'no-connection',
    searchKeywords: [],
  },
  {
    name: 'no-notifications',
    searchKeywords: [],
  },
  {
    name: 'no-position',
    searchKeywords: [],
  },
  {
    name: 'no-results',
    searchKeywords: [],
  },
  {
    name: 'nothing-new',
    searchKeywords: [],
  },
  {
    name: 'office',
    searchKeywords: [],
  },
  {
    name: 'photo',
    searchKeywords: [],
  },
  {
    name: 'power-line',
    searchKeywords: [],
  },
  {
    name: 'price',
    searchKeywords: [],
  },
  {
    name: 'secret',
    searchKeywords: [],
  },
  {
    name: 'sharing',
    searchKeywords: [],
  },
  {
    name: 'statistics',
    searchKeywords: [],
  },
  {
    name: 'support',
    searchKeywords: [],
  },
  {
    name: 'unplugged',
    searchKeywords: [],
  },
  {
    name: 'user',
    searchKeywords: [],
  },
] as const satisfies IllustrationExhibitEntry[];
