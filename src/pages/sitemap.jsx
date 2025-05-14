import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const Sitemap = () => {
  const { t } = useTranslation('sitemap');
  
  const siteStructure = [
    {
      title: t('main'),
      links: [
        { name: t('home'), path: '/dashboard' },
        { name: t('about'), path: '/about' },
        { name: t('contact'), path: '/contact' },
        { name: t('findDoctors'), path: '/find-doctors' },
      ]
    },
    {
      title: t('account'),
      links: [
        { name: t('login'), path: '/login' },
        { name: t('register'), path: '/register' },
        { name: t('dashboard'), path: '/dashboard' },
        { name: t('settings'), path: '/settings' },
      ]
    },
    {
      title: t('appointments'),
      links: [
        { name: t('bookAppointment'), path: '/book-appointment' },
        { name: t('myAppointments'), path: '/appointments' },
        { name: t('medicalRecords'), path: '/health-records' },
      ]
    },
    {
      title: t('legal'),
      links: [
        { name: t('terms'), path: '/terms' },
        { name: t('privacy'), path: '/privacy' },
        { name: t('cookie'), path: '/cookie-policy' },
        { name: t('disclaimer'), path: '/disclaimer' },
        { name: t('help'), path: '/help' },
      ]
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>{t('meta.title')} | Divo</title>
        <meta name="description" content={t('meta.description')} />
      </Head>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('SiteMap')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('Complete overview of our website structure')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteStructure.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'sitemap'])),
    },
  };
}

export default Sitemap;
