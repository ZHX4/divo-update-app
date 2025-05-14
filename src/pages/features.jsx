import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const Features = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity }
  };

  const features = [
    {
      title: "Easy Appointment Scheduling",
      description: "Book, reschedule, or cancel appointments with just a few clicks. Our intelligent system matches your availability with your preferred doctor's schedule.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Find the Right Doctor",
      description: "Search and filter doctors by specialty, location, availability, and reviews to find the perfect match for your healthcare needs.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Comprehensive Health Records",
      description: "Access your complete medical history, test results, prescriptions, and health metrics in one secure, centralized location.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Secure Messaging",
      description: "Communicate directly with your healthcare providers through our encrypted messaging system for quick questions, follow-ups, and updates.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      title: "Medication Management",
      description: "Track your medications, receive reminders for dosages, and get notified when it's time for refills to ensure you never miss an important medication.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Telemedicine Consultations",
      description: "Connect with healthcare providers through video calls for consultations, follow-ups, and minor health concerns from the comfort of your home.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Automated Reminders",
      description: "Receive timely notifications for upcoming appointments, medication schedules, and preventive care recommendations.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: "Health Analytics",
      description: "Visualize your health trends over time with intuitive charts and graphs to better understand your health patterns and progress.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Billing and Insurance",
      description: "Manage medical bills, view insurance coverage, and process payments all within the platform for a hassle-free administrative experience.",
      icon: (
        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Features | Divo</title>
        <meta name="description" content="Explore the powerful features that make Divo the ultimate healthcare platform" />
      </Head>

      <div className="px-4 py-6 sm:px-0">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Features</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Discover how Divo revolutionizes your healthcare experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={slideUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 rounded-md p-3">
                      {feature.icon}
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile App Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-800 rounded-lg shadow-xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center">
            <div className="lg:w-1/2">
              <motion.h2 
                className="text-3xl font-extrabold text-white sm:text-4xl"
                variants={slideUp}
              >
                Divo Mobile App
              </motion.h2>
              <motion.p 
                className="mt-4 text-lg text-primary-100"
                variants={slideUp}
              >
                Take your healthcare on the go with our powerful mobile application. Access all features anywhere, anytime.
              </motion.p>
              <motion.div 
                className="mt-8"
                variants={slideUp}
              >
                <div className="flex space-x-4">
                  <motion.a 
                    href="www.apple.com/app-store/Divo Healthcare " 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm5.5 15.5h-11v-1h11v1zm0-3h-11v-1h11v1zm-9-3.5L9 7.5 7.5 6 4 9.5 7.5 13 9 11.5 6.5 9z"></path>
                    </svg>
                    App Store
                  </motion.a>
                  <motion.a 
                    href="play.google.com/store/apps/Divo Healthcare" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"></path>
                    </svg>
                    Google Play
                  </motion.a>
                </div>
              </motion.div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex-shrink-0 lg:flex lg:justify-end">
              <motion.div animate={pulse} className="relative mx-auto w-full max-w-md">
                <img
                  className="w-full rounded-lg shadow-2xl"
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Divo mobile app"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Real stories from people who use Divo every day
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              variants={slideUp}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="/images/patients/patient-3.png"
                    alt="Sarah Bouggera"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Bouggera</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Divo has completely transformed how I manage my healthcare. The appointment scheduling is seamless, and I love having all my medical records in one place."
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              variants={slideUp}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="./images/doctors/doctor-7.png"
                    alt="Fouzi Bachtouti"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Fouzi Bachtouti</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a healthcare provider, Divo helps me deliver better care to my patients. The secure messaging and health records management are invaluable tools."
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              variants={slideUp}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="/images/patients/patient-1.png"
                    alt="Abdellah Djadour"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Abdellah Djadour</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The telemedicine feature has been a game-changer for me. I can now consult with my doctor from home, saving time and reducing stress."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Features;