import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const faqSections = {
    general: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Register' button in the top right corner. Fill in your personal information and follow the verification process to complete your registration."
      },
      {
        question: "Is my medical information secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your data. We comply with HIPAA regulations and other healthcare privacy standards."
      }
    ],
    appointments: [
      {
        question: "How do I book an appointment?",
        answer: "Navigate to 'Find Doctors', select your preferred doctor, choose an available time slot, and confirm your booking. You'll receive a confirmation email with the details."
      },
      {
        question: "Can I reschedule my appointment?",
        answer: "Yes, go to 'My Appointments' in your dashboard, find the appointment you want to change, and click 'Reschedule'. Choose a new time from the available slots."
      }
    ],
    technical: [
      {
        question: "What browsers are supported?",
        answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please ensure your browser is up to date."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your inbox to reset your password."
      }
    ]
  };

  return (
    <MainLayout>
      <Head>
        <title>Help Center | Divo</title>
        <meta name="description" content="Get help and support for using the Divo healthcare platform" />
      </Head>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            How can we help you today?
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Need personal assistance? Our support team is here to help.</p>
            <Link
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Get in touch →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User Guide</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Learn how to use all features of our platform effectively.</p>
            <Link
              href="/guide"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View guide →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">FAQs</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Find quick answers to common questions.</p>
            <Link
              href="/faqs"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View FAQs →
            </Link>
          </motion.div>
        </div>

        {/* FAQ Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {Object.keys(faqSections).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`
                    ${activeSection === section
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                  `}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {faqSections[activeSection].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still need help? We're here for you.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:support@divo.com"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Email Support
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Call Us
            </a>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HelpCenter;
