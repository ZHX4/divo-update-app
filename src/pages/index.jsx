import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import { useMousePosition } from '../hooks/useMousePosition';
import { useSession } from "next-auth/react";

const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
};

const HomePage = () => {
  const { data: session, status } = useSession();
  const mousePosition = useMousePositi
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const pathAnimation = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const isAuthenticated = status === "authenticated" && session;

  const stats = [
    {
      number: "5000+",
      label: "Registered Patients",
      prefix: "",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
      )
    },
    {
      number: "350+",
      label: "Expert Doctors",
      prefix: "",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    },
    {
      number: "15K+",
      label: "Appointments",
      prefix: "",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )
    },
    {
      number: "98",
      label: "Satisfaction Rate",
      prefix: "%",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )
    }
  ];

  const [heroRef, heroControls] = useScrollAnimation();
  const [featuresRef, featuresControls] = useScrollAnimation();
  const [howItWorksRef, howItWorksControls] = useScrollAnimation();
  const [statsRef, statsControls] = useScrollAnimation();
  const [ctaRef, ctaControls] = useScrollAnimation();

  return (
    <MainLayout>
      <Head>
        <title>Divo - Online Medical Appointment System</title>
        <meta name="description" content="Book medical appointments online with top doctors. Manage your healthcare schedule with ease." />
      </Head>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        animate={heroControls}
        initial="hidden"
        variants={sectionVariants}
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          {/* DNA Helix Shape */}
          <motion.div
            className="absolute top-20 right-40"
            animate={{
              x: mousePosition.x * 0.1,
              y: mousePosition.y * 0.1,
            }}
            transition={{
              type: "tween",
              ease: "circOut",
              duration: 0.3,
            }}
          >
            <svg width="400" height="400" viewBox="0 0 400 400">
              <motion.path
                d="M200,50 C300,50 300,100 200,100 C100,100 100,150 200,150 C300,150 300,200 200,200 C100,200 100,250 200,250 C300,250 300,300 200,300"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M200,50 C100,50 100,100 200,100 C300,100 300,150 200,150 C100,150 100,200 200,200 C300,200 300,250 200,250 C100,250 100,300 200,300"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </motion.div>

          {/* Medical Cross Pattern */}
          <motion.div
            className="absolute bottom-20 left-40"
            animate={{
              x: mousePosition.x * -0.15,
              y: mousePosition.y * -0.15,
            }}
            transition={{
              type: "tween",
              ease: "circOut",
              duration: 0.3,
            }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.path
                  d="M130,100 H170 V60 H200 V100 H240 V130 H200 V170 H170 V130 H130 V100 Z"
                  fill="white"
                  opacity="0.2"
                  whileHover={{ opacity: 0.3 }}
                />
                <motion.path
                  d="M60,170 H100 V130 H130 V170 H170 V200 H130 V240 H100 V200 H60 V170 Z"
                  fill="white"
                  opacity="0.15"
                  whileHover={{ opacity: 0.25 }}
                />
              </motion.g>
            </svg>
          </motion.div>

          {/* Pulse Wave */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: mousePosition.x * 0.05,
              y: mousePosition.y * 0.05,
            }}
            transition={{
              type: "tween",
              ease: "circOut",
              duration: 0.3,
            }}
          >
            <svg width="600" height="200" viewBox="0 0 600 200">
              <motion.path
                d="M0,100 L100,100 L150,20 L200,180 L250,100 L300,100 L350,20 L400,180 L450,100 L600,100"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Stethoscope Icon */}
          <motion.div
            className="absolute top-40 left-20"
            animate={{
              x: mousePosition.x * 0.08,
              y: mousePosition.y * 0.08,
              rotate: mousePosition.x * 0.02,
            }}
            transition={{
              type: "tween",
              ease: "circOut",
              duration: 0.3,
            }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              <motion.circle
                cx="100"
                cy="150"
                r="30"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M100,120 C100,80 140,80 140,40 A40,40 0 1,0 60,40 C60,80 100,80 100,120"
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInRight}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200">Our Priority</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Schedule appointments with top healthcare providers, manage your medical records, and take control of your health journey.
              </p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Link href="/register"
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-primary-600 bg-white rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-primary-50 rounded-full group-hover:w-full group-hover:h-full"></span>
                  <span className="relative flex items-center">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
                <Link href="/find-doctors"
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white border-2 border-white rounded-full overflow-hidden transition-all duration-300 hover:text-primary-600"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full"></span>
                  <span className="relative flex items-center">
                    Find Doctors
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeInLeft}
              className="hidden md:block relative"
            >
              <div className="relative z-10">
                <img
                  src="./images/image.png"
                  alt="Healthcare illustration"
                  className="w-full max-w-lg mx-auto filter drop-shadow-xl"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-primary-400 opacity-20 filter blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        animate={featuresControls}
        initial="hidden"
        variants={sectionVariants}
        className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-primary-200 dark:border-primary-700"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full border border-primary-200 dark:border-primary-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-10 rounded bg-primary-500 mr-2"></span>
              <h2 className="text-sm font-semibold tracking-wide text-primary-600 dark:text-primary-400 uppercase">Key Features</h2>
              <span className="h-1 w-10 rounded bg-primary-500 ml-2"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-primary-600 dark:text-primary-400">Divo</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience healthcare management like never before with our comprehensive suite of features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book appointments with just a few clicks. Choose your preferred doctor, date, and time slot.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verified Doctors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All healthcare providers on our platform are verified professionals with proven expertise.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Medical Records</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your complete medical history, prescriptions, and test results all in one secure place.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reminders & Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Never miss an appointment with timely reminders and important updates about your healthcare.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Messaging</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Communicate with your healthcare provider through our secure messaging system for follow-ups.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              variants={scaleIn}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Know exactly what you're paying for with clear pricing information for all medical services.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        ref={howItWorksRef}
        animate={howItWorksControls}
        initial="hidden"
        variants={sectionVariants}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary-50 opacity-50 -skew-y-6 transform-gpu -translate-y-24"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-10 rounded bg-primary-500 mr-2"></span>
              <h2 className="text-sm font-semibold tracking-wide text-primary-600 uppercase">Simple Process</h2>
              <span className="h-1 w-10 rounded bg-primary-500 ml-2"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-primary-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with Divo in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 text-gray-100 -z-10">
                <svg viewBox="0 0 40 40" fill="currentColor">
                  <text x="0" y="35" fontSize="40" fontWeight="bold">1</text>
                </svg>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full hover:shadow-lg transition-shadow relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
                <p className="text-gray-600">
                  Sign up with your email, complete your profile with personal and medical information.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 text-gray-100 -z-10">
                <svg viewBox="0 0 40 40" fill="currentColor">
                  <text x="0" y="35" fontSize="40" fontWeight="bold">2</text>
                </svg>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full hover:shadow-lg transition-shadow relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Find a Doctor</h3>
                <p className="text-gray-600">
                  Browse through our directory of qualified doctors, filter by specialty, location, or insurance.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 text-gray-100 -z-10">
                <svg viewBox="0 0 40 40" fill="currentColor">
                  <text x="0" y="35" fontSize="40" fontWeight="bold">3</text>
                </svg>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full hover:shadow-lg transition-shadow relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Appointment</h3>
                <p className="text-gray-600">
                  Select your preferred date and time, add your reason for visit, and confirm your appointment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        animate={statsControls}
        initial="hidden"
        variants={sectionVariants}
        className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30">
            {/* 3D Molecule Animation */}
            <motion.div
              className="absolute top-10 right-10"
              animate={{
                x: mousePosition.x * 0.1,
                y: mousePosition.y * 0.1,
                rotate: mousePosition.x * 0.02,
              }}
              transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
            >
              <svg width="300" height="300" viewBox="0 0 300 300">
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.circle cx="150" cy="150" r="20" fill="currentColor" opacity="0.2" />
                  <motion.circle cx="200" cy="150" r="15" fill="currentColor" opacity="0.15" />
                  <motion.circle cx="150" cy="200" r="15" fill="currentColor" opacity="0.15" />
                  <motion.line x1="150" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                  <motion.line x1="150" y1="150" x2="150" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                </motion.g>
              </svg>
            </motion.div>

            {/* Advanced Medical Cross */}
            <motion.div
              className="absolute bottom-10 left-10"
              animate={{
                x: mousePosition.x * -0.1,
                y: mousePosition.y * -0.1,
              }}
              transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
            >
              <svg width="200" height="200" viewBox="0 0 200 200">
                <motion.g>
                  <motion.path
                    d="M100,40 L100,160 M40,100 L160,100"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    opacity="0.15"
                  />
                </motion.g>
              </svg>
            </motion.div>

            {/* Enhanced Heartbeat Line */}
            <motion.div
              className="absolute top-1/2 right-1/4"
              animate={{
                x: mousePosition.x * 0.05,
                y: mousePosition.y * 0.05,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <svg width="400" height="100" viewBox="0 0 400 100">
                <motion.path
                  d="M0,50 L80,50 L100,20 L120,80 L140,20 L160,80 L180,50 L400,50"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.2],
                  }}
                  transition={{ 
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.5
                  }}
                />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              Making healthcare accessible and efficient for thousands of patients across Algeria
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg backdrop-blur-sm bg-white/5 relative group hover:bg-white/10 transition-all"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-3 text-white/80"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-100 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {stat.number}{stat.prefix}
                </motion.div>
                <div className="text-lg text-gray-300 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {!isAuthenticated && (
            <motion.div
              className="mt-12 text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-900 bg-white rounded-full hover:bg-primary-50 transition-all group hover:scale-105"
              >
                <span className="relative flex items-center">
                  Join Our Healthcare Community
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        animate={ctaControls}
        initial="hidden"
        variants={sectionVariants}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-primary-500 opacity-20 rounded-full filter blur-xl"></div>
            </div>
            <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
              <div className="w-20 h-20 bg-white opacity-20 rounded-full filter blur-xl"></div>
            </div>

            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isAuthenticated ? 'Welcome to Your Healthcare Journey' : 'Ready to Take Control of Your Health?'}
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                {isAuthenticated
                  ? 'Book appointments, manage your records, and stay connected with your healthcare providers.'
                  : 'Join thousands of satisfied Algerian users who have transformed their healthcare experience with Divo.'}
              </p>

              {!isAuthenticated && (
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    href="/register" 
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-600 bg-white rounded-full hover:bg-primary-50 transition-all group hover:scale-105"
                  >
                    <span className="relative flex items-center">
                      Create Account
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-primary-600 transition-all group hover:scale-105"
                  >
                    <span className="relative flex items-center">
                      Contact Us
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

    </MainLayout>
  );
};

export default HomePage;

