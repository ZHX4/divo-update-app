import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const PrivacyPolicy = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5 
      } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy | Divo</title>
        <meta name="description" content="Read our Privacy Policy to understand how we protect and handle your personal information" />
      </Head>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: March 15, 2024</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Personal information (name, email, phone number)</li>
              <li>Medical history and health information</li>
              <li>Insurance information</li>
              <li>Appointment preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Schedule and manage your appointments</li>
              <li>Communicate with you about your healthcare</li>
              <li>Process payments and insurance claims</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Healthcare providers involved in your care</li>
              <li>Insurance companies for claims processing</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and transmission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights and Choices</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>The right to access and review your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete certain information</li>
              <li>The right to restrict or object to processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
              <li>The right to lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section. We will respond to your request within the timeframe required by applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our Service is not intended for use by children under the age of 13 without parental consent. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a 
                href="mailto:privacy@divo.com" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                privacy@divo.com
              </a>
            </p>
          </section>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default PrivacyPolicy;