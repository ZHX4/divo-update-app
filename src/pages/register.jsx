import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth'; 
import Alert from '../components/common/Alert'; 

const Register = () => {
  const router = useRouter();
  const { signUp, loading: authLoading, error: authError } = useAuth(); 
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({}); 
  const [formError, setFormError] = useState(''); 
  const [registrationMessage, setRegistrationMessage] = useState(''); 

  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    if (formError) setFormError('');
    if (registrationMessage) setRegistrationMessage('');
  };

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setRegistrationMessage('');

    if (!validate()) {
      return;
    }

    try {
      const { firstName, lastName, email, password } = formData;
      
      const result = await signUp({
        email,
        password,
        options: {
          data: { 
            full_name: `${firstName} ${lastName}`,
          }
        }
      });

      if (result.error || !result.data?.user) {
         const errorMessage = authError || result.error?.message || 'Registration failed.';
         throw new Error(errorMessage);
      }
      
      setRegistrationMessage('Registration successful! Please check your email to confirm your account.');
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }); 

    } catch (error) {
      console.error("Registration Error:", error);
      setFormError(error.message || 'An unexpected error occurred during registration.');
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Sign Up | Divo</title>
        <meta name="description" content="Create your Divo account" />
      </Head>

      <div className="px-4 py-8 sm:px-0 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Join Divo today</p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              key="registration-form" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Account Information</h2>
              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={authLoading}
                    className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                      errors.firstName ? 'border-red-300 dark:border-red-500' : ''
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={authLoading}
                    className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                      errors.lastName ? 'border-red-300 dark:border-red-500' : ''
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={authLoading}
                    className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                      errors.email ? 'border-red-300 dark:border-red-500' : ''
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password (min. 8 characters)
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={authLoading}
                    className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                      errors.password ? 'border-red-300 dark:border-red-500' : ''
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange} 
                    disabled={authLoading}
                    className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                      errors.confirmPassword ? 'border-red-300 dark:border-red-500' : ''
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Display Form Error or Success Message */}
                 {(formError || authError || registrationMessage) && ( 
                    <div className={`rounded-md p-3 mt-4 ${
                        registrationMessage
                            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                    }`}>
                      <p className={`text-sm ${
                          registrationMessage
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-red-600 dark:text-red-400'
                      }`}>
                        {registrationMessage || formError || authError} 
                      </p>
                    </div>
                  )}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={authLoading || !!registrationMessage} 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </motion.div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
