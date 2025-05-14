import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import TabButton from '../components/common/TabButton';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Alert from '../components/common/Alert';
import { formatDateTime, getStatusBadgeClass, getAppointmentTypeIcon } from '../utils/formatters';

const AppointmentsPage = () => {
  const router = useRouter();
  const { success, id } = router.query;
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAppointmentId, setSuccessAppointmentId] = useState(null);

  useEffect(() => {
    if (success === 'true' && id) {
      setShowSuccessAlert(true);
      setSuccessAppointmentId(id);
      
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        
        router.replace('/appointments', undefined, { shallow: true });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [success, id, router]);

  useEffect(() => {
    
    
    const storedAppointments = localStorage.getItem('divo_appointments');
    
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      const sampleAppointments = [
        {
          id: 1001,
          doctor: {
            id: 3,
            name: 'Dr. Douaa Bouden',
            specialty: 'Pediatrics',
            profileImage: '/images/doctors/doctor-3.png'
          },
          date: '2025-04-21',
          time: '10:00',
          type: 'in-person',
          symptoms: ['Fever', 'Cough'],
          insurance: 'Daman Health',
          notes: 'Follow-up appointment for previous visit',
          status: 'scheduled',
          createdAt: '2025-04-15T08:30:00Z'
        },
        {
          id: 1002,
          doctor: {
            id: 1,
            name: 'Dr. Labed Mahfoud',
            specialty: 'Cardiology',
            profileImage: '/images/doctors/doctor-1.jpg'
          },
          date: '2025-04-25',
          time: '14:30',
          type: 'video',
          symptoms: ['Chest pain', 'Shortness of breath'],
          insurance: 'ADNIC',
          notes: 'Initial consultation',
          status: 'pending',
          createdAt: '2025-04-16T10:15:00Z'
        },
        {
          id: 1003,
          doctor: {
            id: 2,
            name: 'Dr. Farid Benkhelifa',
            specialty: 'Dermatology',
            profileImage: '/images/doctors/doctor-2.jpg'
          },
          date: '2025-03-10',
          time: '09:00',
          type: 'in-person',
          symptoms: ['Rash', 'Itching'],
          insurance: 'Tawuniya',
          notes: '',
          status: 'completed',
          createdAt: '2025-03-01T12:00:00Z'
        }
      ];
      
      setAppointments(sampleAppointments);
      localStorage.setItem('divo_appointments', JSON.stringify(sampleAppointments));
    }
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return appointment.status === 'pending';
    if (activeTab === 'upcoming') return appointment.status === 'scheduled';
    if (activeTab === 'completed') return appointment.status === 'completed';
    if (activeTab === 'cancelled') return appointment.status === 'cancelled';
    return true;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    
    if (activeTab === 'completed' || activeTab === 'cancelled') {
      return dateB - dateA; 
    } else {
      return dateA - dateB; 
    }
  });

  const appointmentsByDate = sortedAppointments.reduce((groups, appointment) => {
    const date = appointment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MainLayout>
      <Head>
        <title>My Appointments | Divo Healthcare</title>
        <meta name="description" content="View and manage your healthcare appointments" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showSuccessAlert && (
            <Alert 
              type="success" 
              message="Your appointment has been successfully requested. The doctor will confirm it shortly."
              className="mb-6 shadow-md"
              actionLabel="View Details"
              actionUrl={`/appointments/${successAppointmentId}`}
              dismissible={true}
              onDismiss={() => setShowSuccessAlert(false)}
            />
          )}
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage and track your upcoming and past medical appointments
                </p>
              </div>
              <Link href="/find-doctors" className="flex-shrink-0">
                <Button variant="primary" size="lg"                               className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg dark:bg-primary-700 dark:hover:bg-primary-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 hover:brightness-110"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book New Appointment
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="px-4 flex overflow-x-auto no-scrollbar space-x-6 ">
                <TabButton
                  active={activeTab === 'all'}
                  onClick={() => handleTabChange('all')}
                  className="py-4 px-6 font-medium"
                >
                  All Appointments
                </TabButton>
                <TabButton
                  active={activeTab === 'pending'}
                  onClick={() => handleTabChange('pending')}
                  badge={appointments.filter(a => a.status === 'pending').length}
                  badgeColor="warning"
                  className="py-4 px-6 font-medium"
                >
                  Pending
                </TabButton>
                <TabButton
                  active={activeTab === 'upcoming'}
                  onClick={() => handleTabChange('upcoming')}
                  badge={appointments.filter(a => a.status === 'scheduled').length}
                  badgeColor="success"
                  className="py-4 px-6 font-medium"
                >
                  Upcoming
                </TabButton>
                <TabButton
                  active={activeTab === 'completed'}
                  onClick={() => handleTabChange('completed')}
                  className="py-4 px-6 font-medium"
                >
                  Completed
                </TabButton>
                <TabButton
                  active={activeTab === 'cancelled'}
                  onClick={() => handleTabChange('cancelled')}
                  className="py-4 px-6 font-medium"
                >
                  Cancelled
                </TabButton>
              </div>
            </div>
            
            <div>
              {sortedAppointments.length === 0 ? (
                <div className="py-16">
                  <EmptyState
                    icon={
                      <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    title={`No ${activeTab !== 'all' ? activeTab : ''} appointments found`}
                    description={`You don't have any ${activeTab !== 'all' ? activeTab : ''} appointments scheduled.`}
                    actionLabel="Book an Appointment"
                    actionHref="/find-doctors"
                  />
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.keys(appointmentsByDate).map((date) => (
                    <div key={date} className="bg-white dark:bg-gray-800">
                      <div className="py-3 px-6 bg-gray-50 dark:bg-gray-700/30 sticky top-0 z-10">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                      </div>
                      
                      <div>
                        {appointmentsByDate[date].map((appointment) => (
                          <div
                            key={appointment.id}
                            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                              <div className="flex items-start flex-1 gap-4">
                                <div className="relative flex-shrink-0 h-16 w-16">
                                  <Image
                                    src={appointment.doctor.profileImage}
                                    alt={appointment.doctor.name}
                                    fill
                                    className="rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-gray-800 ${
                                    appointment.type === 'video' ? 'bg-blue-500' : 'bg-green-500'
                                  }`}>
                                    {appointment.type === 'video' ? (
                                      <svg className="h-full w-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                    ) : (
                                      <svg className="h-full w-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {appointment.doctor.name}
                                    </h4>
                                    <Badge
                                      variant={getStatusBadgeClass(appointment.status)}
                                      className="hidden sm:flex"
                                    >
                                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {appointment.doctor.specialty}
                                  </p>
                                  
                                  <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 rounded-full px-3 py-1">
                                      <svg className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {formatDateTime(appointment.date, appointment.time)}
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 rounded-full px-3 py-1">
                                      {getAppointmentTypeIcon(appointment.type)}
                                      <span className="capitalize ml-1.5">
                                        {appointment.type.replace('-', ' ')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:items-end gap-3">
                                <Badge
                                  variant={getStatusBadgeClass(appointment.status)}
                                  className="sm:hidden self-start"
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                                
                                <Link 
                                  href={`/appointments/${appointment.id}`} 
                                  className="text-sm font-medium px-4 py-2 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
