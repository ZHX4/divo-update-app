'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import { useNotifications } from '../hooks/useNotifications';
import { useNotificationToast } from '../contexts/NotificationContext';
import { BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const NotificationTestPage = () => {
  if (typeof window === 'undefined') {
    return null; 
  }

  const { createNotification, markAllAsRead, clearNotifications } = useNotifications();
  const { addToast } = useNotificationToast();
  
  const [title, setTitle] = useState('New Notification');
  const [message, setMessage] = useState('This is a test notification message');
  const [type, setType] = useState('system');
  
  const handleCreateNotification = () => {
    createNotification({
      title,
      message,
      type,
      time: 'Just now',
      link: '/notifications'
    });
  };
  
  const handleCreateToast = () => {
    addToast({
      id: `toast-${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now'
    });
  };
  
  const createAppointmentNotification = () => {
    createNotification({
      title: 'New Appointment Request',
      message: 'Dr. Labed Mahfoud has requested to schedule an appointment with you for tomorrow at 2:30 PM.',
      type: 'appointment',
      time: 'Just now',
      link: '/appointments'
    });
  };
  
  const createMedicalNotification = () => {
    createNotification({
      title: 'Test Results Available',
      message: 'Your blood test results are now available to view in your health records.',
      type: 'medical',
      time: 'Just now',
      link: '/health-records'
    });
  };
  
  const createSystemNotification = () => {
    createNotification({
      title: 'System Update Complete',
      message: 'Your Divo application has been updated to the latest version with new features.',
      type: 'system',
      time: 'Just now'
    });
  };

  return (
    <MainLayout>
      <Head>
        <title>Notification Testing | Divo</title>
        <meta name="description" content="Test notification features" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
            <h1 className="text-xl font-semibold text-white flex items-center">
              <BellIcon className="h-6 w-6 mr-2" />
              Notification Test Panel
            </h1>
          </div>
          
          <div className="px-6 py-5 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create Custom Notification</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="system">System</option>
                    <option value="appointment">Appointment</option>
                    <option value="medical">Medical</option>
                  </select>
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={handleCreateNotification} leftIcon={<BellIcon className="h-4 w-4" />}>
                    Add to Notifications
                  </Button>
                  
                  <Button 
                    onClick={handleCreateToast} 
                    leftIcon={<CheckCircleIcon className="h-4 w-4" />}
                    variant="outline"
                  >
                    Show as Toast
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Notification Templates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={createAppointmentNotification}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Appointment
                </button>
                
                <button
                  onClick={createMedicalNotification}
                  className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Medical Record
                </button>
                
                <button
                  onClick={createSystemNotification}
                  className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  System
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Management</h2>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={markAllAsRead} 
                  variant="outline"
                >
                  Mark All as Read
                </Button>
                
                <Button 
                  onClick={clearNotifications} 
                  variant="danger"
                >
                  Clear All Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Use dynamic import with SSR disabled to prevent server-side rendering issues
export default dynamic(() => Promise.resolve(NotificationTestPage), { ssr: false });