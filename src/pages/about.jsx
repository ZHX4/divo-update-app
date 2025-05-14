import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import NextImage from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useMousePosition } from '../hooks/useMousePosition';
import PropTypes from 'prop-types';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Abdellah Djadour',
    role: 'Chief Medical Officer',
    bio: 'Dr. Abdellah has over 15 years of experience in healthcare management and is passionate about improving patient access to quality care.',
    image: 'images/doctors/doctor-9.png',
    isOnline: true
  },
  {
    id: 2,
    name: 'Dr. Fouzi Bachtouti',
    role: 'Chief Technology Officer',
    bio: 'With a background in healthcare IT, Fouzi leads our technology development to create intuitive digital health solutions.',
    image: 'images/doctors/doctor-8.png',
    isOnline: false
  },
  {
    id: 3,
    name: 'Dr. Ayoub Mguellati',
    role: 'Head of Patient Relations',
    bio: 'Ayoub ensures that patient experience remains at the heart of our service, focusing on compassionate care coordination.',
    image: 'images/doctors/doctor-10.png',
    isOnline: true
  },
  {
    id: 4,
    name: 'Dr. Amdjed Bouteraa',  
    role: 'Medical Director',
    bio: 'Dr. Amdjed brings his expertise in family medicine to guide our clinical protocols and quality assurance processes.',
    image: 'images/doctors/doctor-5.png',
    isOnline: false
  },
  {
    id: 5,
    name: 'Dr.  Labed Mahfoud',  
    role: ' founder',
    bio: 'Dr. Mahfoud is a visionary leader who founded our medical center, bringing his expertise in family medicine and patient care.',
    image: 'images/doctors/doctor-13.png',
    isOnline: true
  },
  {
    id: 6,
    name: 'Dr. Farid Benkhelifa',  
    role: 'pediatre',
    bio: 'Dr. Farid is a dedicated pediatrician who ensures the health and well-being of our youngest patients.',
    image: 'images/doctors/doctor-12.png',
    isOnline: false
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
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

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const InfiniteSlideshow = ({ children }) => {
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const lastPosition = useRef(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setWidth(scrollRef.current.scrollWidth / 2);
    }
  }, [children]);

  const startAnimation = async (startX = 0) => {
    try {
      await controls.start({
        x: [startX, startX - width],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } catch (err) {
      console.log("Animation interrupted:", err);
    }
  };

  // Handle hover start
  const handleHoverStart = () => {
    try {
      const current = scrollRef.current;
      if (current) {
        const transform = getComputedStyle(current).transform;
        const matrix = new DOMMatrix(transform);
        lastPosition.current = matrix.m41;
      }
      controls.stop();
    } catch (err) {
      console.log("Error getting position:", err);
    }
    setIsHovered(true);
  };

  // Handle hover end
  const handleHoverEnd = () => {
    setIsHovered(false);
    startAnimation(lastPosition.current);
  };

  // Start animation when component mounts or when width changes
  useEffect(() => {
    if (width > 0 && !isHovered) {
      startAnimation(lastPosition.current);
    }
    
    return () => controls.stop();
  }, [width, isHovered]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={scrollRef}
        className="flex gap-8"
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        initial={{ x: 0 }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

InfiniteSlideshow.propTypes = {
  children: PropTypes.node.isRequired,
};

const AboutPage = () => {
  const mousePosition = useMousePosition();

  return (
    <MainLayout>
      <Head>
        <title>About Us | Divo</title>
        <meta name="description" content="Learn about Divo's mission to revolutionize healthcare accessibility" />
      </Head>

      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div
              className="lg:w-1/2"
              variants={slideIn}
            >
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">Our Story</span>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block mb-2">Transforming Healthcare</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-500">For Everyone</span>
              </h1>
              <p className="mt-6 text-base text-gray-500 dark:text-gray-300 sm:text-lg sm:max-w-xl md:text-xl">
                We're on a mission to make quality healthcare accessible to everyone. Through innovative technology and compassionate care, we're building a future where healthcare is simple, efficient, and patient-centered.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-colors duration-200 ease-in-out transform hover:from-primary-600 hover:to-indigo-700 hover:scale-105 hover:text-white">
                  Join Our Mission
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="hidden lg:block lg:w-5/12 mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-primary-100 flex items-center justify-center">
                  <svg className="w-full h-64 text-primary-200" fill="currentColor" viewBox="0 0 600 400">
                    <path d="M300,200 Q450,50 600,200 T900,200 T1200,200 T1500,200 T1800,200 T2100,200 V400 H0 V200 Q150,350 300,200 Z" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-6xl font-bold text-primary-600">15+</span>
                      <span className="block text-xl font-medium text-gray-700">Years of Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decorative blob shapes */}
        <motion.div 
          className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20"
          animate={{
            x: mousePosition.x * 0.15,
            y: mousePosition.y * 0.15,
          }}
          transition={{
            type: "tween", // Changed from "spring" to "tween"
            ease: "circOut", // Added easing function
            duration: 0.5, // Added duration
          }}
        >
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-primary-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
          </svg>
        </motion.div>
        <motion.div 
          className="hidden sm:block absolute bottom-0 left-0 -mb-20 -ml-20"
          animate={{
            x: mousePosition.x * -0.15,
            y: mousePosition.y * -0.15,
          }}
          transition={{
            type: "tween", // Changed from "spring" to "tween"
            ease: "circOut", // Added easing function
            duration: 0.5, // Added duration
          }}
        >
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-indigo-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c2)" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 rounded-full">Our Purpose</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-500 mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              To revolutionize healthcare accessibility through technology and compassionate care.
            </p>
          </div>

          {/* Add Mission Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Accessible Healthcare
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Making quality healthcare accessible to everyone through digital innovation and streamlined services.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Patient-Centered Care
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Putting patients first with personalized care plans and seamless communication with healthcare providers.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Innovative Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leveraging cutting-edge technology to improve healthcare delivery and patient outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 rounded-full">Our Experts</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-500 mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Meet the dedicated professionals behind Divo
            </p>
          </div>

          <InfiniteSlideshow>
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="group relative flex-shrink-0 w-[300px]"
                variants={fadeIn}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 group-hover:opacity-75">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <NextImage
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={400}
                      priority
                      className="object-cover w-full h-[400px] transition-transform duration-500 group-hover:scale-110"
                    />
                    {member.isOnline && (
                      <div className="absolute top-4 right-4 w-3 h-3">
                        <div className="absolute w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm font-medium text-primary-300">{member.role}</p>
                  </div>
                </div>

                <div className="absolute inset-0 p-4 bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href="https://twitter.com" className="text-gray-400 hover:text-primary-500" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" className="text-gray-400 hover:text-primary-500" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </InfiniteSlideshow>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 opacity-50 -skew-y-6 transform origin-top-left"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 rounded-full">Our Principles</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-500 mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-b-4 border-primary-500 hover:shadow-2xl transition-all duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Patient First</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Every decision we make is guided by what's best for our patients. Their health and well-being are our highest priorities.
              </p>
              <div className="w-12 h-1 bg-primary-100 dark:bg-primary-900/50 rounded"></div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-b-4 border-primary-500 hover:shadow-2xl transition-all duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We constantly explore new ways to improve healthcare delivery and are not afraid to challenge conventional approaches.
              </p>
              <div className="w-12 h-1 bg-primary-100 dark:bg-primary-900/50 rounded"></div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-b-4 border-primary-500 hover:shadow-2xl transition-all duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mb-5 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We strive for excellence in everything we do, from patient care to technological solutions and business practices.
              </p>
              <div className="w-12 h-1 bg-primary-100 dark:bg-primary-900/50 rounded"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block text-5xl font-extrabold text-primary-600 dark:text-primary-400">95%</span>
              <span className="block mt-2 text-lg font-medium text-gray-500 dark:text-gray-300">Patient Satisfaction</span>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="block text-5xl font-extrabold text-primary-600 dark:text-primary-400">15+</span>
              <span className="block mt-2 text-lg font-medium text-gray-500 dark:text-gray-300">Years Experience</span>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="block text-5xl font-extrabold text-primary-600 dark:text-primary-400">50k+</span>
              <span className="block mt-2 text-lg font-medium text-gray-500 dark:text-gray-300">Patients Served</span>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="block text-5xl font-extrabold text-primary-600 dark:text-primary-400">24/7</span>
              <span className="block mt-2 text-lg font-medium text-gray-500 dark:text-gray-300">Support Available</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-primary-600 to-indigo-700 dark:from-primary-900 dark:to-indigo-900 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 opacity-10">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="400" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="300" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Join Us in Making Healthcare Better
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Be part of our mission to transform healthcare for everyone.
                Get in touch to learn more about partnerships, opportunities, or our services.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row justify-center lg:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white dark:focus:ring-gray-800">
                Get in Touch
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-6 py-3 border border-white dark:border-gray-300 text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white dark:focus:ring-gray-300">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default AboutPage;
