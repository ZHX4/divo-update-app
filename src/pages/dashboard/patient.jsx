import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AppointmentsAnalytics from '../../components/appointments/AppointmentsAnalytics';
import Alert from '../../components/common/Alert';
import Link from 'next/link';
import Head from 'next/head';

// Health metrics tracking component
const HealthMetricsTracker = ({ patientId }) => {
  const [metrics, setMetrics] = useState({
    weight: [],
    bloodPressure: [],
    heartRate: [],
    bloodSugar: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock data for demonstration
  useEffect(() => {
    // Simulate fetching health metrics from API
    setTimeout(() => {
      // Mock data generation
      const now = new Date();
      const mockData = {
        weight: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            value: Math.round((70 + Math.random() * 5) * 10) / 10,
            unit: 'kg'
          };
        }),
        bloodPressure: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            systolic: Math.round(120 + Math.random() * 15),
            diastolic: Math.round(80 + Math.random() * 10),
            unit: 'mmHg'
          };
        }),
        heartRate: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            value: Math.round(70 + Math.random() * 15),
            unit: 'bpm'
          };
        }),
        bloodSugar: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            value: Math.round((5.5 + Math.random()) * 10) / 10,
            unit: 'mmol/L'
          };
        })
      };
      
      setMetrics(mockData);
      setLoading(false);
    }, 1000);
  }, [patientId]);
  
  const renderMetricCard = (title, metricData, formatter = value => value, color = 'blue') => {
    if (loading) {
      return (
        <Card className="p-4 sm:p-5 md:p-6">
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
          </div>
        </Card>
      );
    }
    
    if (!metricData || metricData.length === 0) {
      return (
        <Card className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg font-medium mb-2 dark:text-white">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </Card>
      );
    }
    
    // Get the most recent data point
    const latestData = metricData[metricData.length - 1];
    
    // Calculate the trend (comparing latest with previous data point)
    const previousData = metricData[metricData.length - 2];
    const trend = previousData && latestData.value !== undefined && previousData.value !== undefined
      ? latestData.value - previousData.value
      : null;
    
    // For blood pressure which has systolic & diastolic
    const isBP = title === 'Blood Pressure';
    const latestValue = isBP 
      ? `${latestData.systolic}/${latestData.diastolic}`
      : formatter(latestData.value);
    
    // Get the latest value and unit
    const unit = latestData.unit;
    
    return (
      <Card className="p-4 sm:p-5 md:p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium dark:text-white">{title}</h3>
          <Link 
            href={`/health-records#${title.toLowerCase().replace(/\s/g, '-')}`}
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm hover:underline"
          >
            View History
          </Link>
        </div>
        
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}>
            {latestValue}
          </span>
          <span className="ml-2 text-gray-600 dark:text-gray-300">{unit}</span>
          
          {trend !== null && !isBP && (
            <span className={`ml-2 text-sm ${
              trend > 0 
                ? 'text-red-600 dark:text-red-400' 
                : trend < 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-600 dark:text-gray-400'
            }`}>
              {trend > 0 ? '↑' : trend < 0 ? '↓' : '•'} {Math.abs(trend).toFixed(1)}
            </span>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-7 gap-1 h-20">
          {metricData.map((data, index) => {
            const maxValue = isBP
              ? Math.max(...metricData.map(d => d.systolic))
              : Math.max(...metricData.map(d => d.value));
            const minValue = isBP 
              ? Math.min(...metricData.map(d => d.diastolic))
              : Math.min(...metricData.map(d => d.value));
            const range = maxValue - minValue;
            
            const heightPercentage = isBP
              ? ((data.systolic - minValue) / (range || 1)) * 100
              : ((data.value - minValue) / (range || 1)) * 100;
            
            // For blood pressure, add a second bar for diastolic
            const diastolicHeight = isBP
              ? ((data.diastolic - minValue) / (range || 1)) * 100
              : null;
            
            return (
              <div key={index} className="flex flex-col items-center justify-end h-full">
                <div className="relative w-full flex justify-center">
                  <div
                    className={`w-4 bg-${color}-500 dark:bg-${color}-400 rounded-t`}
                    style={{ height: `${Math.max(5, heightPercentage)}%` }}
                  />
                  {isBP && (
                    <div
                      className={`w-4 bg-${color}-300 dark:bg-${color}-600 rounded-t absolute bottom-0`}
                      style={{ height: `${Math.max(5, diastolicHeight)}%` }}
                    />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(data.date).getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Last 7 days
        </div>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-xl font-semibold dark:text-white mb-4">Health Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {renderMetricCard('Weight', metrics.weight, value => value.toFixed(1), 'green')}
        {renderMetricCard('Blood Pressure', metrics.bloodPressure, null, 'red')}
        {renderMetricCard('Heart Rate', metrics.heartRate, value => Math.round(value), 'pink')}
        {renderMetricCard('Blood Sugar', metrics.bloodSugar, value => value.toFixed(1), 'purple')}
      </div>
      
      <div className="flex justify-end mt-6">
        <Link
          href="/health-records/add"
          className="text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
          </svg>
          Log New Metrics
        </Link>
      </div>
    </div>
  );
};

// Patient dashboard main component
const PatientDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { fetchAppointments, getUpcomingAppointments, loading: appointmentsLoading } = useAppointments();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch appointments when component mounts
  useEffect(() => {
    const loadData = async () => {
      if (user && user.id) {
        await fetchAppointments();
      }
    };

    loadData();
  }, [user, fetchAppointments]);

  // Get upcoming appointments
  useEffect(() => {
    if (!appointmentsLoading) {
      const upcoming = getUpcomingAppointments();
      setUpcomingAppointments(upcoming.slice(0, 3)); // Get first 3 upcoming appointments
    }
  }, [appointmentsLoading, getUpcomingAppointments]);

  if (isLoading || !user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Patient Dashboard | Divo</title>
        <meta name="description" content="View your health dashboard and upcoming appointments" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.full_name || 'Patient'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Here's an overview of your health and upcoming appointments.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 md:mb-12">
          <Link href="/appointments" legacyBehavior>
            <a className="block p-5 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium mb-2">Appointments</h3>
                  <p className="opacity-80">
                    {appointmentsLoading 
                      ? 'Loading...' 
                      : `${upcomingAppointments.length} upcoming`}
                  </p>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </a>
          </Link>

          <Link href="/health-records" legacyBehavior>
            <a className="block p-5 sm:p-6 bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium mb-2">Health Records</h3>
                  <p className="opacity-80">View your medical history</p>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </a>
          </Link>

          <Link href="/find-doctors" legacyBehavior>
            <a className="block p-5 sm:p-6 bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium mb-2">Find Doctors</h3>
                  <p className="opacity-80">Book a new appointment</p>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </a>
          </Link>
        </div>

        {/* Health Metrics */}
        <div className="mb-10 md:mb-14">
          <HealthMetricsTracker patientId={user.id} />
        </div>
        
        {/* Upcoming Appointments */}
        <div className="mb-10 md:mb-14">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Upcoming Appointments</h2>
            <Link href="/appointments" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
              View All
            </Link>
          </div>
          
          {appointmentsLoading ? (
            <div className="flex justify-center py-8 md:py-10">
              <LoadingSpinner size="md" />
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {upcomingAppointments.map(appointment => (
                <Card key={appointment.id} className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {appointment.type === 'video' ? (
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : appointment.type === 'phone' ? (
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-3 sm:ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Dr. {appointment.doctor?.full_name || 'Doctor'}
                        </h3>
                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                          {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {appointment.doctor?.specialty || 'Specialist'}
                      </p>
                      
                      <div className="mt-2">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(appointment.appointment_time).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(appointment.appointment_time).toLocaleTimeString(undefined, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {appointment.type === 'video' && appointment.status === 'scheduled' && (
                        <div className="mt-4">
                          <Link href={`/appointments/${appointment.id}/video-call`} legacyBehavior>
                            <a className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Join Video Call
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              type="info"
              message="You have no upcoming appointments. Schedule your next appointment with a doctor."
              actionLabel="Find Doctors"
              actionUrl="/find-doctors"
            />
          )}
        </div>
        
        {/* Appointment Analytics */}
        <div className="mb-12">
          <AppointmentsAnalytics />
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;