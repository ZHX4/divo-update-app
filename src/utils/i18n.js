import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/**
 * Helper function to load translations for pages
 * @param {string} locale - The locale to load translations for
 * @param {string[]} namespaces - Array of namespace strings to load
 * @returns {Promise<object>} Props object with translations
 */
export async function loadTranslations(locale, namespaces = ['common']) {
  const uniqueNamespaces = [...new Set(['common', ...namespaces])];
  
  return {
    ...(await serverSideTranslations(locale, uniqueNamespaces)),
  };
}

/**
 * Get namespaces required for page translation
 * @param {string} pageName - The name of the page
 * @returns {string[]} Array of namespace strings
 */
export function getPageNamespaces(pageName) {
  const namespaceMap = {
    index: ['home', 'common'],
    dashboard: ['dashboard', 'common'],
    terms: ['terms', 'common'],
    sitemap: ['sitemap', 'common'],
    about: ['about', 'common'],
    contact: ['contact', 'common'],
    settings: ['settings', 'common'],
    'find-doctors': ['doctors', 'common'],
    privacy: ['privacy', 'common'],
  };
  
  return namespaceMap[pageName] || ['common'];
}
