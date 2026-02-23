import { getEnvironment, transformToEnvironmentUrl } from './utils';

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
      name: 'Jordfeil',
      url: `https://jordfeildashboard.elvia.io/?search=${targetId}`,
      iconInfo: {
        rotation: -90,
        iconLetters: 'Jo',
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
    {
      name: 'IFS',
      url: `https://elvia.ifs.cloud/main/ifsapplications/web/page/FunctionalObjects/List;path=0.1531594057.1763480028.1343378454.563079726;$filter=%28startswith%28MchCode,%27${targetId}%27%29%29`,
    },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const environment = getEnvironment();
  return links.map((link) => ({
    ...link,
    url: transformToEnvironmentUrl(link.url, environment),
  }));
};
