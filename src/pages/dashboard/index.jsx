import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <MainLayout>
      <Head>
        <title>Dashboard | Divo</title>
        <meta name="description" content="Your Divo dashboard" />
      </Head>

      <div className="px-4 py-6 ">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's an overview of your health information and upcoming appointments.
          </p>
        </div>

        {/* Stats section */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-md p-3">
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Upcoming Appointments</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">3</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/appointments" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  View all<span className="sr-only"> appointments</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-md p-3">
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Notifications</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">5</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600 dark:text-red-400">
                      <span>New</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  View all<span className="sr-only"> notifications</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-md p-3">
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Prescriptions</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">2</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                      <span>1 Refill needed</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/health" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  View all<span className="sr-only"> prescriptions</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-md p-3">
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Doctors</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">3</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-600 dark:text-gray-400">
                      <span>In your care team</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/doctors" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Find more<span className="sr-only"> doctors</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Next appointment */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Next Appointment</h2>
          <div className="mt-2 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Dr. Sarah Johnson - Cardiology
                </h3>
                <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Wednesday, May 25, 2023 at 10:30 AM
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Confirmed
                </span>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                >
                  Details
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Medical Center, Building A, Room 305
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Purpose</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Annual check-up and cardiovascular assessment
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    30 minutes
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Instructions</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Please arrive 15 minutes early to complete paperwork. Bring your insurance card and a list of current medications.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="mt-2 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Prescription Refill
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Your request for Lisinopril refill was approved.
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500 dark:text-gray-400">3 days ago</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Appointment Scheduled
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          New appointment with Dr. Sarah Johnson scheduled for May 25.
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="text-sm text-gray-500 dark:text-gray-400">5 days ago</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;