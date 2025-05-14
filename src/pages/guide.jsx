import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const UserGuide = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const guides = {
    'getting-started': {
      title: 'Getting Started',
      content: [
        {
          title: 'Creating Your Account',
          steps: [
            'Click on the "Register" button in the top right corner',
            'Fill in your personal information',
            'Verify your email address',
            'Complete your medical profile'
          ]
        },
        {
          title: 'Updating Your Profile',
          steps: [
            'Navigate to Settings',
            'Update your personal information',
            'Add or update your medical history',
            'Save your changes'
          ]
        }
      ]
    },
    'appointments': {
      title: 'Managing Appointments',
      content: [
        {
          title: 'Booking an Appointment',
          steps: [
            'Click "Find Doctors" in the navigation menu',
            'Search for a doctor by specialty or name',
            'Select an available time slot',
            'Confirm your appointment details',
            'Receive confirmation email'
          ]
        },
        {
          title: 'Rescheduling or Canceling',
          steps: [
            'Go to "My Appointments" in your dashboard',
            'Select the appointment you want to modify',
            'Choose "Reschedule" or "Cancel"',
            'Follow the prompts to complete the process'
          ]
        }
      ]
    },
    'video-calls': {
      title: 'Video Consultations',
      content: [
        {
          title: 'Starting a Video Call',
          steps: [
            'Open your upcoming appointment',
            'Click "Join Video Call" at the scheduled time',
            'Allow camera and microphone access',
            'Wait for the doctor to join'
          ]
        },
        {
          title: 'During the Call',
          steps: [
            'Use the microphone and camera controls',
            'Share documents if needed',
            "Follow doctor's instructions",
            'End call when consultation is complete'
          ]
        }
      ]
    },
    'medical-records': {
      title: 'Medical Records',
      content: [
        {
          title: 'Accessing Records',
          steps: [
            'Navigate to "Medical Records" section',
            'View your consultation history',
            'Download or print records',
            'Share records with other providers'
          ]
        }
      ]
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>User Guide | Divo</title>
        <meta name="description" content="Learn how to use Divo's medical appointment system effectively" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            User Guide
          </h1>

          {/* Navigation Tabs */}
          <nav className="flex space-x-4 overflow-x-auto pb-4 mb-8">
            {Object.keys(guides).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  ${activeSection === section
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {guides[section].title}
              </button>
            ))}
          </nav>

          {/* Content Section */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {guides[activeSection].content.map((guide, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {guide.title}
                </h3>
                <ol className="list-decimal list-inside space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </motion.div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still need help? Our support team is here for you.
            </p>
            <Link
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-primary-600 
                transform transition-all duration-200 ease-in-out
                hover:bg-primary-700 hover:scale-105 hover:shadow-lg
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                dark:hover:bg-primary-500 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900"
            >
              <span className="flex items-center">
                Contact Support
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default UserGuide;
