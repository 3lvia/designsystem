export type IllustrationExhibitEntry = {
  name: string;
  searchKeywords: string[];
};
export type IllustrationName = (typeof illustrationsExhibitData)[number]['name'];

export const illustrationsExhibitData = [
  {
    name: 'broken',
    searchKeywords: ['light', 'electricity', 'bulb', 'wire', 'error', '404'],
  },
  {
    name: 'clock',
    searchKeywords: ['waiting', 'time', 'data'],
  },
  {
    name: 'confirmation',
    searchKeywords: ['send', 'done', 'approval', 'success'],
  },
  {
    name: 'connected',
    searchKeywords: ['electricity', 'outlet', 'wire', 'success'],
  },
  {
    name: 'consumption',
    searchKeywords: ['clock', 'money', 'data'],
  },
  {
    name: 'explain',
    searchKeywords: ['light', 'electricity', 'bulb', 'information', 'wire'],
  },
  {
    name: 'heating',
    searchKeywords: ['electricity', 'warm', 'heater', 'equipment'],
  },
  {
    name: 'hello',
    searchKeywords: ['woman', 'profile', 'person', 'welcome', 'greeting'],
  },
  {
    name: 'installation',
    searchKeywords: ['electricity', 'house', 'building', 'wire'],
  },
  {
    name: 'meter-reading',
    searchKeywords: ['graph', 'fastledd', 'usage', 'data'],
  },
  {
    name: 'new',
    searchKeywords: ['light', 'electricity', 'bulb', 'information', 'wire', 'success'],
  },
  {
    name: 'no-connection',
    searchKeywords: ['light', 'electricity', 'outlet', 'wrong', 'wire', 'error', '404'],
  },
  {
    name: 'no-notifications',
    searchKeywords: ['bell', 'sleep', 'empty'],
  },
  {
    name: 'no-position',
    searchKeywords: ['broken', 'place', 'error'],
  },
  {
    name: 'no-results',
    searchKeywords: ['search', 'information', 'empty', 'data', 'document'],
  },
  {
    name: 'nothing-new',
    searchKeywords: ['mail', 'empty', 'inbox'],
  },
  {
    name: 'office',
    searchKeywords: ['business', 'building', 'organization'],
  },
  {
    name: 'photo',
    searchKeywords: ['camera', 'image'],
  },
  {
    name: 'power-line',
    searchKeywords: ['electricity', 'wire'],
  },
  {
    name: 'price',
    searchKeywords: ['money', 'spotpris', 'graph', 'cost', 'data'],
  },
  {
    name: 'secret',
    searchKeywords: ['key', 'lock', 'encrypted'],
  },
  {
    name: 'sharing',
    searchKeywords: ['people', 'person', 'communication'],
  },
  {
    name: 'statistics',
    searchKeywords: ['graph', 'usage', 'data'],
  },
  {
    name: 'support',
    searchKeywords: ['money', 'contribute', 'success'],
  },
  {
    name: 'unplugged',
    searchKeywords: ['electricity', 'outlet', 'wire', 'error'],
  },
  {
    name: 'user',
    searchKeywords: ['profile', 'person', 'avatar', 'account'],
  },
] as const satisfies IllustrationExhibitEntry[];
