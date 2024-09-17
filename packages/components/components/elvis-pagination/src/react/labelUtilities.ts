import type { LanguageCode } from '@elvia/elvis-toolbox';

import { PaginationLabel } from './elvia-pagination.types';

type PaginationLabelDefaults = {
  [key in LanguageCode]: PaginationLabel;
};

const paginationLabelDefaults: PaginationLabelDefaults = {
  en: {
    displaying: 'Displaying',
    of: 'of',
    label: 'items',
  },
  no: {
    displaying: 'Viser',
    of: 'av',
    label: 'elementer',
  },
};

export function getDefaultPaginationLabelOptions(
  language: LanguageCode,
  customLabels?: PaginationLabel,
): PaginationLabel {
  const defaultLabels = paginationLabelDefaults[language];
  return { ...defaultLabels, ...customLabels };
}
