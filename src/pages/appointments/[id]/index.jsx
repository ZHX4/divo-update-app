import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../../../components/layout/MainLayout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Alert from '../../../components/common/Alert';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatDateTime, getStatusBadgeClass, getAppointmentTypeIcon } from '../../../utils/formatters';

const AppointmentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      
      const storedAppointments = localStorage.getItem('divo_appointments');
      
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        const foundAppointment = parsedAppointments.find(
          appt => appt.id === Number(id) || appt.id === id
        );
        
        if (foundAppointment) {
          setAppointment(foundAppointment);
        } else {
          setError('Appointment not found');
        }
      } else {
        setError('No appointments found');
      }
      
      setLoading(false);
    }
  }, [id]);
  
  const handleCancelAppointment = () => {
    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    
    if (confirmed) {
      const storedAppointments = localStorage.getItem('divo_appointments');
      
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        
        const updatedAppointments = parsedAppointments.map(appt => {
          if (appt.id === Number(id) || appt.id === id) {
            return { ...appt, status: 'cancelled' };
          }
          return appt;
        });
        
        localStorage.setItem('divo_appointments', JSON.stringify(updatedAppointments));
        
        setAppointment({ ...appointment, status: 'cancelled' });
      }
    }
  };
  
  const handleRescheduleAppointment = () => {
    router.push(`/appointments/new?doctorId=${appointment.doctor.id}&reschedule=${appointment.id}`);
  };
  
  const handleJoinVideoCall = () => {
    router.push(`/appointments/${id}/video-call`);
  };
  
  const getStatusBadge = (status) => {
    const badgeClass = getStatusBadgeClass(status);
    return <Badge variant={badgeClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">Loading appointment details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !appointment) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert 
              type="error" 
              message={error || "Appointment not found"} 
              actionLabel="Go Back to Appointments" 
              actionUrl="/appointments" 
            />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const formattedDateTime = formatDateTime(appointment.date, appointment.time);
  const isUpcoming = appointment.status === 'scheduled' || appointment.status === 'pending';
  const isPending = appointment.status === 'pending';
  const isScheduled = appointment.status === 'scheduled';
  const isVideoAppointment = appointment.type === 'video';
  const canJoinVideo = isVideoAppointment && isScheduled;
  
  const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
  const currentTime = new Date();
  const timeDiff = Math.abs(appointmentTime - currentTime) / (1000 * 60);
  const canJoinNow = timeDiff <= 15;
  
  return (
    <MainLayout>
      <Head>
        <title>Appointment Details | Divo Healthcare</title>
        <meta name="description" content="View your appointment details" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link href="/appointments" className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      Appointments
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Appointment Details</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment Details</h1>
            <div>{getStatusBadge(appointment.status)}</div>
          </div>
          
          {isPending && (
            <Alert 
              type="info" 
              message="This appointment is pending confirmation from the doctor. You'll be notified once it's confirmed."
              className="mb-6"
            />
          )}
          
          {canJoinVideo && canJoinNow && (
            <Alert 
              type="success" 
              message="Your video appointment is starting soon. You can join now!" 
              className="mb-6"
              actionLabel="Join Video Call"
              onAction={handleJoinVideoCall}
            />
          )}
          
          <Card className="mb-6">
            <div className="mb-6 flex items-center">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={appointment.doctor.profileImage}
                  alt={appointment.doctor.name}
                  fill
                  className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{appointment.doctor.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{appointment.doctor.specialty}</p>
              </div>
            </div>
            
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date & Time</h3>
                <p className="text-gray-900 dark:text-white">{formattedDateTime}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Appointment Type</h3>
                <p className="text-gray-900 dark:text-white capitalize">{appointment.type.replace('-', ' ')}</p>
              </div>
              
              {appointment.symptoms && appointment.symptoms.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {appointment.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="info" size="sm">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {appointment.insurance && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Insurance</h3>
                  <p className="text-gray-900 dark:text-white">{appointment.insurance === 'none' ? 'Self-Pay' : appointment.insurance}</p>
                </div>
              )}
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</h3>
                <p className="text-gray-900 dark:text-white">
                  {appointment.notes || "No additional notes provided."}
                </p>
              </div>
            </div>
            
            {isUpcoming && (
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-wrap gap-3">
                {isVideoAppointment && isScheduled && (
                  <Button
                    variant={canJoinNow ? "primary" : "secondary"}
                    disabled={!canJoinNow}
                    onClick={handleJoinVideoCall}
                  >
                    {canJoinNow ? 'Join Video Call' : 'Join Video (Available 15 min. before)'}
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  onClick={handleRescheduleAppointment}
                >
                  Reschedule
                </Button>
                
                <Button
                  variant="danger"
                  onClick={handleCancelAppointment}
                >
                  Cancel Appointment
                </Button>
              </div>
            )}
          </Card>
          
          <div className="text-center">
            <Link href="/appointments" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Back to All Appointments
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentDetailsPage;