// @ts-expect-error missing types for this kind of import, but it should be fine
import * as icons from '@elvia/elvis-assets-icons/config/icons.config.js';
import naturalCompare from 'natural-compare-lite';

export type Icon = { pretty: string; title: string; terms: string[] };
export type IconArray = Icon[];

export const getIconList = () => {
  const allIcons: IconArray = [];

  for (const icon of icons) {
    if (icon.name.indexOf('figma') > -1) {
      continue;
    }
    if (!icon.deprecated) {
      allIcons.push({
        pretty: getShortIconName(icon.name),
        title: icon.name,
        terms: icon.terms,
      });
    }
  }

  allIcons.sort((icon, icon2) => {
    const a = icon.pretty.toLowerCase();
    const b = icon2.pretty.toLowerCase();
    return naturalCompare(a, b);
  });

  return allIcons;
};

const getShortIconName = (iconName: string): string => {
  const short = iconName.split(/[-_]/).join(' ');
  return short.charAt(0).toUpperCase() + short.slice(1);
};

export const kebabCaseToCamelCase = (str: string) =>
  // @ts-expect-error TS2532 (LEGO-3683)
  str.replace(/[-_]([a-z0-9])/g, (g) => g[1].toUpperCase());
