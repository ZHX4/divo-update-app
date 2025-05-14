import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import useNotifications from '../hooks/useNotifications';
import { useAuth } from '../hooks/useAuth';
import { 
  BellIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  FunnelIcon as FilterIcon,
  InboxIcon,
  TrashIcon,
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { format, isToday, isYesterday, isThisWeek, parseISO } from 'date-fns';

const NotificationsPage = () => {
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications(user?.id);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];
    
    let filtered = [...notifications];
    
    if (selectedTab !== 'all') {
      filtered = filtered.filter(n => n.type === selectedTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) || 
        n.message.toLowerCase().includes(query)
      );
    }
    
    if (selectedTimeframe !== 'all') {
      filtered = filtered.filter(n => {
        const date = parseISO(n.date);
        switch (selectedTimeframe) {
          case 'today': return isToday(date);
          case 'yesterday': return isYesterday(date);
          case 'week': return isThisWeek(date);
          default: return true;
        }
      });
    }
    
    if (selectedStatus !== 'all') {
      const isRead = selectedStatus === 'read';
      filtered = filtered.filter(n => n.read === isRead);
    }
    
    return filtered;
  }, [notifications, selectedTab, searchQuery, selectedTimeframe, selectedStatus]);

  const groupedNotifications = useMemo(() => {
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: []
    };
    
    filteredNotifications.forEach(notification => {
      const date = parseISO(notification.date);
      
      if (isToday(date)) {
        groups.today.push(notification);
      } else if (isYesterday(date)) {
        groups.yesterday.push(notification);
      } else if (isThisWeek(date)) {
        groups.thisWeek.push(notification);
      } else {
        groups.earlier.push(notification);
      }
    });
    
    return Object.entries(groups)
      .filter(([_, items]) => items.length > 0)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
  }, [filteredNotifications]);
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
            <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        );
      case 'medical':
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
            <DocumentTextIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        );
      case 'system':
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
            <CheckCircleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        );
    }
  };
  
  const getDateHeading = (group) => {
    switch (group) {
      case 'today': return 'Today';
      case 'yesterday': return 'Yesterday';
      case 'thisWeek': return 'This Week';
      case 'earlier': return 'Earlier';
      default: return group;
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Notifications | Divo</title>
        <meta name="description" content="View and manage your notifications" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage all your notifications in one place
            </p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => markAllAsRead()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <CheckIcon className="h-4 w-4 mr-2" />
              Mark all as read
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => clearNotifications()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Clear all
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
          {/* Filters and tabs */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
              {/* Search input */}
              <div className="relative flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Filter button */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center px-3 py-2 border ${
                    showFilters 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none`}
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
            </div>

            {/* Expanded filters */}
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Timeframe
                  </label>
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">This week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All notifications</option>
                    <option value="unread">Unread only</option>
                    <option value="read">Read only</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Category tabs */}
            <div className="flex items-center py-2 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-x-2 overflow-x-auto">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'all'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 ring-1 ring-primary-400 dark:ring-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('appointment')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'appointment'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 ring-1 ring-blue-400 dark:ring-blue-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Appointments
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('medical')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'medical'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-1 ring-green-400 dark:ring-green-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Medical
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('system')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'system'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 ring-1 ring-purple-400 dark:ring-purple-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <BellIcon className="h-4 w-4 mr-1" />
                  System
                </div>
              </button>
            </div>
          </div>

          {/* Notification content */}
          <div className="min-h-[60vh]">
            {filteredNotifications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center h-64 p-8"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <InboxIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No notifications found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'You don\'t have any notifications yet'}
                </p>
                {(searchQuery || selectedTab !== 'all' || selectedTimeframe !== 'all' || selectedStatus !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTab('all');
                      setSelectedTimeframe('all');
                      setSelectedStatus('all');
                    }}
                    className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Group and render notifications by date */}
                {Object.entries(groupedNotifications).map(([group, items]) => (
                  <div key={group} className="py-4">
                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 mb-3">
                      {getDateHeading(group)}
                    </h3>
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="divide-y divide-gray-100 dark:divide-gray-700"
                    >
                      {items.map((notification) => (
                        <motion.div 
                          key={notification.id} 
                          variants={item}
                          className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50/50 dark:bg-primary-900/10' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.title}
                                </p>
                                <span className="ml-2 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {notification.message}
                              </p>
                              
                              {/* Action buttons based on notification type */}
                              {notification.type === 'appointment' && (
                                <div className="mt-3 flex space-x-2">
                                  <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                                    Confirm
                                  </button>
                                  <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                                    Reschedule
                                  </button>
                                </div>
                              )}
                              
                              {notification.type === 'medical' && (
                                <div className="mt-3">
                                  <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                                    View Details
                                  </button>
                                </div>
                              )}
                              
                              {!notification.read && (
                                <span className="inline-flex mt-2 items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
