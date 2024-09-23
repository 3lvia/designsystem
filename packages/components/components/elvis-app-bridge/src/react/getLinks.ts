import { getEnvironmentUrl } from './utils';

export interface SystemLink {
  url: string;
  name: string;
  iconInfo?: {
    rotation: number;
    iconLetters: string;
  };
}

export const getLinks = (targetId: string): SystemLink[] => {
  const links = [
    {
      name: 'Convey',
      url: `https://convey.elvia.io/customerSearch?q=${targetId}`,
      iconInfo: {
        rotation: 101.25,
        iconLetters: 'Co',
      },
    },
    {
      name: 'DROPS',
      url: `https://drops.elvia.io/meteringpoint/${targetId}`,
      iconInfo: {
        rotation: 67.5,
        iconLetters: 'Dr',
      },
    },
    {
      name: 'Elflow',
      url: `https://elflow.elvia.io/msg-overview/meteringpoint?meteringPointId=${targetId}`,
      iconInfo: {
        rotation: 90,
        iconLetters: 'Ef',
      },
    },
    {
      name: 'Louvre',
      url: `https://louvre.elvia.io/search?q=${targetId}`,
      iconInfo: {
        rotation: 0,
        iconLetters: 'Lo',
      },
    },
    {
      name: 'MSIm',
      url: `https://msim.elvia.io/tickets/meteringpoint/${targetId}`,
      iconInfo: {
        rotation: -180,
        iconLetters: 'Ms',
      },
    },
    {
      name: 'MDMx',
      url: `https://mdmx.elvia.io/meteringpoint?id=${targetId}`,
      iconInfo: {
        rotation: 157.5,
        iconLetters: 'Mx',
      },
    },
    {
      name: 'Salesforce',
      url: `https://elvia.lightning.force.com/lightning/n/DirectLink?c__object=MeteringPoint__c&c__fieldName=MeteringPointID__c&c__fieldValue=${targetId}`,
    },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const currentEnvironment = getEnvironmentUrl();
  if (currentEnvironment) {
    return links.map((link) => {
      return {
        ...link,
        url: link.url.replace('.elvia.io', `.${currentEnvironment}.io`),
      };
    });
  }

  return links;
};
