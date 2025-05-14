import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const supportedLanguages = [
    { code: 'en', name: 'English', dir: 'ltr', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', dir: 'rtl', nativeName: 'العربية' },
    { code: 'fr', name: 'French', dir: 'ltr', nativeName: 'Français' },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(router.locale || i18n.language || 'en');

  useEffect(() => {
    const activeLocale = router.locale || 'en';
    console.log(`[Context useEffect] router.locale: ${router.locale}, i18n.language: ${i18n.language}, currentLanguage state: ${currentLanguage}. Determined activeLocale: ${activeLocale}`);

    if (i18n.language !== activeLocale) {
      console.warn(`[Context useEffect] Mismatch: i18n.language (${i18n.language}) vs activeLocale (${activeLocale}). Next-i18next should sync this.`);
    }

    if (currentLanguage !== activeLocale) {
      console.log(`[Context useEffect] Updating currentLanguage state from ${currentLanguage} to ${activeLocale}`);
      setCurrentLanguage(activeLocale);
    }

    const languageDetails = supportedLanguages.find(lang => lang.code === activeLocale);
    if (languageDetails && typeof window !== 'undefined') {
      console.log(`[Context useEffect] Updating DOM for ${activeLocale}: dir=${languageDetails.dir}, lang=${languageDetails.code}`);
      document.documentElement.dir = languageDetails.dir;
      document.documentElement.lang = languageDetails.code;
      localStorage.setItem('preferred-language', languageDetails.code);
      document.body.classList.toggle('rtl', languageDetails.dir === 'rtl');
    }
  }, [router.locale, i18n.language, currentLanguage, supportedLanguages]);

  const changeLanguage = useCallback(async (languageCode) => {
    console.log(`[Context changeLanguage] Request to change to: ${languageCode}. Current router.locale: ${router.locale}, i18n.language: ${i18n.language}`);

    if (router.locale === languageCode && i18n.language === languageCode) {
      console.log(`[Context changeLanguage] Language ${languageCode} already active.`);
      return;
    }

    try {
      if (i18n.language !== languageCode) {
        console.log(`[Context changeLanguage] Updating i18n.language to ${languageCode}`);
        await i18n.changeLanguage(languageCode);
      }

      if (router.locale !== languageCode) {
        console.log(`[Context changeLanguage] Updating router.locale to ${languageCode}`);
        const { pathname, asPath, query } = router;
        await router.push({ pathname, query }, asPath, {
          locale: languageCode,
          scroll: false,
        });
      } else {
        if (currentLanguage !== languageCode) {
           console.log(`[Context changeLanguage] Router locale matches, but aligning context state to ${languageCode}`);
           setCurrentLanguage(languageCode);
        }
      }
    } catch (error) {
      console.error("[Context changeLanguage] Error:", error);
    }
  }, [router, i18n, currentLanguage]);

  const getCurrentLanguageDetails = useCallback(() => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  }, [currentLanguage, supportedLanguages]);

  const value = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    getCurrentLanguageDetails,
    isRTL: getCurrentLanguageDetails().dir === 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};