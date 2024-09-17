import { useEffect, useState } from 'react';

export type LanguageCode = 'en' | 'no';

export const useLanguage = () => {
  const [lang, setLang] = useState<LanguageCode>('no');
  useEffect(() => {
    const handleLangChange = () => {
      const htmlLang = document.documentElement.lang;
      switch (htmlLang) {
        case 'en':
        case 'en-GB':
        case 'en-US':
          setLang('en');
          break;
        default:
          setLang('no');
          break;
      }
    };

    handleLangChange();

    const observer = new MutationObserver(handleLangChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return lang;
};
