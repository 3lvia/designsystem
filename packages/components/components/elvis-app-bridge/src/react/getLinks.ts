export interface SystemLink {
  url: string;
  name: string;
  iconInfo: {
    rotation: number;
    iconLetters: string;
  };
}

export const getLinks = (targetId: string): SystemLink[] => {
  return [
    {
      name: 'DROPS',
      url: `https://drops.elvia.io/meteringpoint/${targetId}`,
      iconInfo: {
        rotation: 67.5,
        iconLetters: 'Dr',
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
      name: 'Louvre',
      url: `https://louvre.elvia.io/search?q=${targetId}`,
      iconInfo: {
        rotation: 0,
        iconLetters: 'Lo',
      },
    },
  ].sort((a, b) => a.name.localeCompare(b.name));
};
