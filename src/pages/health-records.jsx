import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import  useAuth  from '../hooks/useAuth';
import RecentVisits from '../components/health-records/RecentVisits';
import Medications from '../components/health-records/Medications';
import TabButton from '../components/common/TabButton';
import { mockRecords } from '../data/mockData';

const HealthRecords = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('visits');

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Please sign in to view your health records
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your health records are private and require authentication to access.
          </p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium 
              hover:bg-primary-500 hover:shadow-lg
              dark:bg-primary-600 dark:hover:bg-primary-500
              transform transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
              dark:focus:ring-offset-gray-800"
          >
            Sign in to continue
          </motion.a>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Health Records
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            View and manage your medical history, prescriptions, and documents
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['visits', 'medications', 'documents'].map((tab) => (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </TabButton>
            ))}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {activeTab === 'visits' && (
            <RecentVisits visits={mockRecords.recentVisits} itemVariant={itemVariant} />
          )}
          {activeTab === 'medications' && (
            <Medications medications={mockRecords.medications} itemVariant={itemVariant} />
          )}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {mockRecords.documents.map((document) => (
                <motion.div
                  key={document.id}
                  variants={itemVariant}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm 
                    border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {document.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {document.date}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {document.size}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="text-primary-600 dark:text-primary-400 
                      hover:text-primary-700 dark:hover:text-primary-300 
                      text-sm font-medium transition-colors duration-200">
                      Download
                    </button>
                    <button className="ml-4 text-gray-600 dark:text-gray-400 
                      hover:text-gray-700 dark:hover:text-gray-300 
                      text-sm font-medium transition-colors duration-200">
                      View
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Upload button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full 
            shadow-lg hover:bg-primary-700 dark:hover:bg-primary-500 
            transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.button>
      </motion.div>
    </MainLayout>
  );
};

export default HealthRecords;