import { LOCALE_CODE } from 'contentful/types';

/**
 * Get data from CMS corresponding to the current locale. If no data is found for the current locale, return the data for 'en-GB'.
 *
 * **NB**: The types of the data are auto-generated and do not correctly contain the locales for some reason.
 */
export function cmsExtractLocale<T extends Partial<{ [key in LOCALE_CODE]: any }>>(
  data: T,
  locale: LOCALE_CODE,
): T[LOCALE_CODE] {
  if (data?.[locale]) {
    return data[locale];
  }
  return data?.['en-GB'];
}
