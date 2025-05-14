import { motion } from 'framer-motion';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const CookiePolicy = () => {
  return (
    <MainLayout>
      <Head>
        <title>Cookie Policy | Divo</title>
        <meta name="description" content="Learn about how Divo uses cookies to enhance your experience" />
      </Head>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What Are Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
              They help us make our site work efficiently and provide you with a better experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
              <li>Personalized content and services</li>
              <li>Session management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytical Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Functional Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies enable the website to provide enhanced functionality and personalization based on your preferences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Marketing Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              To modify your cookie settings, please visit your browser's settings page:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy & Security → Cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about our Cookie Policy, please contact us at{' '}
              <a 
                href="mailto:privacy@divo.com" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
              >
                privacy@divo.com
              </a>
            </p>
          </section>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default CookiePolicy;
