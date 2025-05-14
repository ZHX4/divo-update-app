import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const TermsOfService = () => {
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
        <title>Terms of Service | Divo</title>
        <meta name="description" content="Read the Terms of Service for using the Divo healthcare platform" />
      </Head>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: March 15, 2024</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using Divo, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Divo provides a platform for scheduling medical appointments, managing healthcare records, and facilitating communication between patients and healthcare providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the privacy and rights of others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your use of Divo is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All content, features, and functionality of Divo, including but not limited to text, graphics, logos, and software, are the exclusive property of Divo and are protected by U.S. and international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Divo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a 
                href="mailto:support@divo.com" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
              >
                support@divo.com
              </a>
            </p>
          </section>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default TermsOfService;