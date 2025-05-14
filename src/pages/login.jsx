import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth'; 

const Login = () => {
  const router = useRouter();
  const { registered } = router.query;
  const { signIn, loading: authLoading, error: authError, isAuthenticated } = useAuth(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({}); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (registered === 'true') {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [registered]);

  const handleChange = (e) => {
    const { name, value } = e.target; 

    setFormData({
      ...formData,
      [name]: value, 
    });

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    if (authError) {
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await signIn(
        formData.email?.trim(),
        formData.password
      );
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Sign In | Divo</title>
        <meta name="description" content="Sign in to your Divo account to manage your medical appointments" />
      </Head>

      <div className="px-4 py-8 sm:px-0 min-h-[calc(100vh-64px)] flex items-center">
        <div className="max-w-md w-full mx-auto">
          {showSuccessMessage && (
            <motion.div
              className="mb-6 p-4 rounded-md bg-green-50 dark:bg-green-900/30 border
                border-green-200 dark:border-green-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex">
                <svg
                  className="h-5 w-5 text-green-400 dark:text-green-300 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-green-800 dark:text-white">
                  Account created successfully! Please sign in with your credentials.
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <motion.h1
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  className="mt-2 text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Sign in to manage your healthcare
                </motion.p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={authLoading} 
                      className={`block w-full rounded-md border ${
                        errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Password
                      </label>
                      {/* Consider adding forgot password functionality later */}
                      {/* <Link href="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400
                        hover:text-primary-500 dark:hover:text-primary-300">
                        Forgot password?
                      </Link> */}
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={authLoading} 
                      className={`block w-full rounded-md border ${
                        errors.password ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                    )}
                  </motion.div>

                  {/* Removed Remember Me checkbox */}

                  {/* Display form-level error from hook or validation */}
                  {(errors.form || authError) && (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200
                      dark:border-red-800 rounded-md p-3">
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.form || authError}</p>
                    </div>
                  )}
                </div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={authLoading}
                    className="w-full flex justify-center items-center px-4 py-2 border
                      border-transparent rounded-md shadow-sm text-base font-medium text-white
                      bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                      dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors duration-200"
                  >
                    {authLoading ? ( 
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/register"
                      className="font-medium text-primary-600 dark:text-primary-400
                        hover:text-primary-500 dark:hover:text-primary-300">
                      Sign up
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
