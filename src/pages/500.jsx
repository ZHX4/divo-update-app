import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const ServerErrorPage = () => {
  return (
    <>
      <Head>
        <title>Server Error | Divo</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="mb-6">
              <h1 className="text-6xl font-bold text-red-600 dark:text-red-500">500</h1>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
                Server Error
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We're sorry, something went wrong on our end. Please try again later.
              </p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
              >
                Go to Homepage
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
              >
                Refresh Page
              </button>
              <Link 
                href="/contact" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Report this Issue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerErrorPage;