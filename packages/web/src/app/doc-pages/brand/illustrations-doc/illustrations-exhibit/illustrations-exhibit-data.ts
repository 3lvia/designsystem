export type IllustrationExhibitEntry = {
  name: string;
  searchKeywords: string[];
  searchKeywordsNO?: string[];
};
export type IllustrationName = (typeof illustrationsExhibitData)[number]['name'];

export const illustrationsExhibitData = [
  {
    name: 'broken',
    searchKeywords: ['light', 'electricity', 'bulb', 'wire', 'error', '404'],
    searchKeywordsNO: ['lys', 'elektrisitet', 'pære', 'ledning', 'feil', '404'],
  },
  {
    name: 'clock',
    searchKeywords: ['waiting', 'time', 'data'],
    searchKeywordsNO: ['vente', 'tid', 'klokke', 'data'],
  },
  {
    name: 'confirmation',
    searchKeywords: ['send', 'done', 'approval', 'success'],
    searchKeywordsNO: ['sendt', 'godkjent', 'suksess'],
  },
  {
    name: 'connected',
    searchKeywords: ['electricity', 'outlet', 'wire', 'success'],
    searchKeywordsNO: ['elektrisitet', 'kontakt', 'ledning', 'suksess'],
  },
  {
    name: 'consumption',
    searchKeywords: ['clock', 'money', 'data'],
    searchKeywordsNO: ['klokke', 'penger', 'data', 'forbruk'],
  },
  {
    name: 'explain',
    searchKeywords: ['light', 'electricity', 'bulb', 'information', 'wire'],
    searchKeywordsNO: ['lys', 'elektrisitet', 'pære', 'informasjon', 'ledning', 'forklare'],
  },
  {
    name: 'heating',
    searchKeywords: ['electricity', 'warm', 'heater', 'equipment'],
    searchKeywordsNO: ['elektrisitet', 'varm', 'varmeovn', 'utstyr'],
  },
  {
    name: 'hello',
    searchKeywords: ['woman', 'profile', 'person', 'welcome', 'greeting'],
    searchKeywordsNO: ['kvinne', 'profil', 'person', 'velkommen', 'hilsen', 'hei'],
  },
  {
    name: 'installation',
    searchKeywords: ['electricity', 'house', 'building', 'wire'],
    searchKeywordsNO: ['elektrisitet', 'hus', 'bygning', 'ledning', 'installasjon'],
  },
  {
    name: 'meter-reading',
    searchKeywords: ['graph', 'fastledd', 'usage', 'data'],
    searchKeywordsNO: ['graf', 'fastledd', 'forbruk', 'data', 'måleravlesning'],
  },
  {
    name: 'new',
    searchKeywords: ['light', 'electricity', 'bulb', 'information', 'wire', 'success'],
    searchKeywordsNO: ['lys', 'elektrisitet', 'pære', 'informasjon', 'ledning', 'suksess', 'ny'],
  },
  {
    name: 'no-connection',
    searchKeywords: ['light', 'electricity', 'outlet', 'wrong', 'wire', 'error', '404'],
    searchKeywordsNO: ['lys', 'elektrisitet', 'kontakt', 'feil', 'ledning', '404', 'ingen forbindelse'],
  },
  {
    name: 'no-notifications',
    searchKeywords: ['bell', 'sleep', 'empty'],
    searchKeywordsNO: ['klokke', 'sove', 'tom', 'ingen varsler'],
  },
  {
    name: 'no-position',
    searchKeywords: ['broken', 'place', 'error'],
    searchKeywordsNO: ['feil', 'plass', 'ingen posisjon'],
  },
  {
    name: 'no-results',
    searchKeywords: ['search', 'information', 'empty', 'data', 'document'],
    searchKeywordsNO: ['søk', 'informasjon', 'tomt', 'ingen resultater', 'dokument'],
  },
  {
    name: 'nothing-new',
    searchKeywords: ['mail', 'empty', 'inbox'],
    searchKeywordsNO: ['mail', 'tomt', 'ingenting nytt', 'innboks'],
  },
  {
    name: 'office',
    searchKeywords: ['business', 'building', 'organization'],
    searchKeywordsNO: ['business', 'bygning', 'organisasjon', 'kontor'],
  },
  {
    name: 'photo',
    searchKeywords: ['camera', 'image'],
    searchKeywordsNO: ['kamera', 'bilde', 'foto'],
  },
  {
    name: 'power-line',
    searchKeywords: ['electricity', 'wire'],
    searchKeywordsNO: ['elektrisitet', 'ledning', 'strøm'],
  },
  {
    name: 'power-meter',
    searchKeywords: ['electricity'],
    searchKeywordsNO: ['elektrisitet'],
  },
  {
    name: 'price',
    searchKeywords: ['money', 'spotpris', 'graph', 'cost', 'data'],
    searchKeywordsNO: ['penger', 'spotpris', 'graf', 'kostnad', 'data'],
  },
  {
    name: 'secret',
    searchKeywords: ['key', 'lock', 'encrypted'],
    searchKeywordsNO: ['nøkkel', 'lås', 'kryptert', 'hemmelig'],
  },
  {
    name: 'sharing',
    searchKeywords: ['people', 'person', 'communication'],
    searchKeywordsNO: ['folk', 'person', 'kommunikasjon', 'deling'],
  },
  {
    name: 'statistics',
    searchKeywords: ['graph', 'usage', 'data'],
    searchKeywordsNO: ['graf', 'forbruk', 'data', 'statistikk'],
  },
  {
    name: 'support',
    searchKeywords: ['money', 'contribute', 'success'],
    searchKeywordsNO: ['penger', 'bidra', 'suksess', 'støtte'],
  },
  {
    name: 'unplugged',
    searchKeywords: ['electricity', 'outlet', 'wire', 'error'],
    searchKeywordsNO: ['elektrisitet', 'kontakt', 'ledning', 'feil', 'ikke tilkoblet'],
  },
  {
    name: 'user',
    searchKeywords: ['profile', 'person', 'avatar', 'account'],
    searchKeywordsNO: ['profil', 'person', 'avatar', 'konto', 'bruker'],
  },
] as const satisfies IllustrationExhibitEntry[];
