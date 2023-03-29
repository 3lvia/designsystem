import { LOCALE_CODE, LocalizedField } from 'contentful/types';

/**
 * Get data from CMS corresponding to the current locale. If no data is found for the current locale, return the data for 'en-GB'.
 */
export function extractLocale<T extends LocalizedField<unknown>>(
  data: T,
  locale: LOCALE_CODE = 'en-GB',
): T[LOCALE_CODE] {
  if (data?.[locale]) {
    return data[locale];
  }
  return data?.['en-GB'];
}
