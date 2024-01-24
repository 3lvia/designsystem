type AppLink = Readonly<{
  iconLetters?: string;
  name: string;
  rotation: number;
  url: string;
}>;

type AppLinks = Readonly<AppLink[]>;

export const appList = [
  {
    name: 'Bildegjennomgang',
    iconLetters: 'Bi',
    url: 'bildegjennomgang',
    rotation: 22.5,
  },
  {
    name: 'Datakatalog',
    iconLetters: 'Da',
    url: 'data',
    rotation: 45,
  },
  {
    name: 'Drops',
    iconLetters: 'Dr',
    url: 'drops',
    rotation: 67.5,
  },
  {
    name: 'Elflow',
    iconLetters: 'Ef',
    url: 'elflow',
    rotation: 90,
  },
  {
    name: 'Elvid',
    iconLetters: 'eID',
    url: 'elvid',
    rotation: 112.5,
  },
  {
    name: 'FortelVia',
    iconLetters: 'Ai',
    url: 'ai',
    rotation: -22.5,
  },
  {
    name: 'Jordfeil',
    iconLetters: 'Jo',
    url: 'jordfeildashboard',
    rotation: -90,
  },
  {
    name: 'Kvalitetsportal',
    iconLetters: 'Kv',
    url: 'kvalitetsportalen',
    rotation: -135,
  },
  {
    name: 'Louvre',
    iconLetters: 'Lo',
    url: 'louvre',
    rotation: 0,
  },
  {
    name: 'MDMx',
    iconLetters: 'Mx',
    url: 'mdmx',
    rotation: 157.5,
  },
  {
    name: 'MSIc',
    iconLetters: 'Mc',
    url: 'msic',
    rotation: -157.5,
  },
  {
    name: 'MSIm',
    iconLetters: 'Ms',
    url: 'msim',
    rotation: -180,
  },
  {
    name: 'Refi',
    iconLetters: 'Re',
    url: 'refi',
    rotation: -45,
  },
  {
    name: 'USLA',
    iconLetters: 'Us',
    url: 'sluttbrukeravbrudd',
    rotation: -67.5,
  },
] as const satisfies AppLinks;

const getUrlParts = (): string[] => {
  const url = new URL(location.href);
  // E.g. ['design', 'elvia', 'io']
  return url.host.split('.');
};

export const getActiveApp = (kind: 'url' | 'name'): string => {
  const url = getUrlParts()[0];
  if (kind === 'url') {
    return url;
  } else {
    return appList.find((app) => app.url === url)?.name || '';
  }
};

export const getCurrentDomain = (): string => {
  const urlParts = getUrlParts().reverse();

  if (urlParts.length > 1) {
    return `${urlParts[1]}.${urlParts[0]}`;
  }

  return 'elvia.io';
};
