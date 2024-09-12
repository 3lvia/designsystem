import { useEffect, useState } from 'react';

export type LanguageCode = 'en' | 'no';

export const useLanguage = () => {
  const [lang, setLang] = useState<LanguageCode>('no');
  useEffect(() => {
    const handleLangChange = () => {
      const htmlLang = document.documentElement.lang;
      setLang(htmlLang === 'no' ? 'no' : 'en');
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
