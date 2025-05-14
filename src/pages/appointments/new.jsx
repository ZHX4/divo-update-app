import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Labed Mahfoud',
    specialty: 'Cardiology',
    education: 'Alger Medical School',
    experience: '12 years',
    rating: 4.8,
    reviewCount: 128,
    availability: ['Mon', 'Wed', 'Fri'],
    nextAvailable: '2023-06-12',
    insurances: ['Daman Health', 'ADNIC', 'Oman Insurance'],
    acceptingNewPatients: true,
    profileImage: '/images/doctors/doctor-1.jpg',
    location: {
      address: '123 Medical Center Dr',
      city: 'El Eulma',
      state: 'El',
      distance: 2.4,
    }
  },
  {
    id: 2,
    name: 'Dr. Farid Benkhelifa',
    specialty: 'Dermatology',
    education: 'Alger Med University',
    experience: '8 years',
    rating: 4.6,
    reviewCount: 86,
    availability: ['Tue', 'Thu', 'Sat'],
    nextAvailable: '2023-06-10',
    insurances: ['Tawuniya', 'AXA Gulf', 'Medgulf'],
    acceptingNewPatients: true,
    profileImage: '/images/doctors/doctor-2.jpg',
    location: {
      address: '456 Dermatology Clinic',
      city: 'Setif',
      state: 'SE',
      distance: 3.1,
    }
  },
  {
    id: 3,
    name: 'Dr. Douaa Bouden',
    specialty: 'Pediatrics',
    education: 'Medical School',
    experience: '15 years',
    rating: 4.9,
    reviewCount: 215,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    nextAvailable: '2023-06-08',
    insurances: ['Daman Health', 'BUPA Arabia', 'AXA Gulf', 'Qatar Insurance'],
    acceptingNewPatients: true,
    profileImage: '/images/doctors/doctor-3.png',
    location: {
      address: '789 Children\'s Health Center',
      city: 'Alger',
      state: 'AL',
      distance: 1.8,
    }
  },
  {
    id: 4,
    name: 'Dr. Farhet Mounir',
    specialty: 'Neurology',
    education: 'University of Med',
    experience: '20 years',
    rating: 4.7,
    reviewCount: 176,
    availability: ['Mon', 'Wed', 'Fri'],
    nextAvailable: '2023-06-15',
    insurances: ['Qatar Insurance', 'ADNIC', 'Tawuniya'],
    acceptingNewPatients: false,
    profileImage: '/images/doctors/doctor-4.png',
    location: {
      address: '101 Neuroscience Building',
      city: 'Ourgla',
      state: 'OU',
      distance: 4.2,
    }
  },
  {
    id: 5,
    name: 'Dr. Abdellah Djadour',
    specialty: 'Obstetrics & Gynecology',
    education: 'Mouzembig University',
    experience: '10 years',
    rating: 4.9,
    reviewCount: 143,
    availability: ['Tue', 'Thu'],
    nextAvailable: '2023-06-13',
    insurances: ['Daman Health', 'Tawuniya', 'Allianz MENA'],
    acceptingNewPatients: true,
    profileImage: '/images/doctors/doctor-5.png',
    location: {
      address: '234 Men\'s Health Clinic',
      city: 'Jijel',
      state: 'JJ',
      distance: 2.9,
    }
  },
  {
    id: 6,
    name: 'Dr. Farid Al-Khalidi',
    specialty: 'Orthopedics',
    education: 'School of Medicine',
    experience: '18 years',
    rating: 4.5,
    reviewCount: 98,
    availability: ['Mon', 'Wed', 'Fri'],
    nextAvailable: '2023-06-18',
    insurances: ['ADNIC', 'Qatar Insurance', 'GIG Insurance'],
    acceptingNewPatients: true,
    profileImage: '/images/doctors/doctor-6.png', 
    location: {
      address: '567 Sports Medicine Center',
      city: 'MESSILA',
      state: 'MSA',
      distance: 5.3,
    }
  }
];

let mockAppointments = [];

const AppointmentBookingPage = () => {
  const router = useRouter();
  const { doctorId, date, time } = router.query;
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [selectedDate, setSelectedDate] = useState(date || '');
  const [selectedTime, setSelectedTime] = useState(time || '');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [symptoms, setSymptoms] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [notes, setNotes] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState(null);
  
  const cardBgClass = "bg-white dark:bg-gray-800";
  const textClass = "text-gray-900 dark:text-white";
  const secondaryTextClass = "text-gray-600 dark:text-gray-400";
  const borderClass = "border-gray-200 dark:border-gray-700";

  useEffect(() => {
    if (doctorId) {
      setLoading(true);
      
      setTimeout(() => {
        const foundDoctor = mockDoctors.find(doc => doc.id === Number(doctorId));
        
        if (foundDoctor) {
          setDoctor(foundDoctor);
          generateAvailableDates(foundDoctor);
        } else {
          setError('Doctor not found');
        }
        
        setLoading(false);
      }, 500);
    }
  }, [doctorId]);
  
  const generateAvailableDates = (doctor) => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (doctor.availability.includes(dayName)) {
        const formattedDate = date.toISOString().split('T')[0];
        dates.push({
          value: formattedDate,
          label: new Date(formattedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      }
    }
    
    setAvailableDates(dates);
    
    if (!date && dates.length > 0) {
      setSelectedDate(dates[0].value);
      generateAvailableTimes(dates[0].value);
    } else if (date) {
      generateAvailableTimes(date);
    }
  };
  
  const generateAvailableTimes = (selectedDate) => {
    const times = [];
    
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 12) continue;
        
        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = minute.toString().padStart(2, '0');
        const timeString = `${hourFormatted}:${minuteFormatted}`;
        
        const isAvailable = Math.random() > 0.3;
        
        if (isAvailable) {
          times.push({
            value: timeString,
            label: new Date(`2023-01-01T${timeString}:00`).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          });
        }
      }
    }
    
    setAvailableTimes(times);
    
    if (!time && times.length > 0) {
      setSelectedTime(times[0].value);
    }
  };
  
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    generateAvailableTimes(newDate);
  };
  
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  
  const handleTypeChange = (e) => {
    setAppointmentType(e.target.value);
  };
  
  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };
  
  const handleInsuranceChange = (e) => {
    setSelectedInsurance(e.target.value);
  };
  
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time for your appointment');
      return;
    }
    
    setBookingStatus('loading');
    
    const newAppointment = {
      id: Math.floor(Math.random() * 10000),
      doctor: {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        profileImage: doctor.profileImage
      },
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      symptoms: symptoms ? symptoms.split(',').map(s => s.trim()) : [],
      insurance: selectedInsurance,
      notes: notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    

    setTimeout(() => {
      mockAppointments.push(newAppointment);
      
      setBookingStatus('success');
      
      setTimeout(() => {
        router.push(`/appointments?success=true&id=${newAppointment.id}`);
      }, 2000);
    }, 1500);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">Loading doctor information...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !doctor) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert 
              type="error" 
              message={error || "Doctor not found"} 
              actionLabel="Go Back to Find Doctors" 
              actionUrl="/find-doctors" 
            />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (bookingStatus === 'success') {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-8 w-8 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Appointment Request Submitted!</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Your appointment request has been sent to Dr. {doctor.name}. You'll receive a notification when they accept it.
                </p>
                <div className="mt-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to your appointments page...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Head>
        <title>Book Appointment with {doctor.name} | Divo Healthcare</title>
        <meta name="description" content={`Book an appointment with ${doctor.name}, ${doctor.specialty} specialist`} />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <Link href="/find-doctors" className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      Find Doctors
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link href={`/doctors/${doctor.id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      {doctor.name}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Book Appointment</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book an Appointment</h1>
                
                {error && <Alert type="error" message={error} className="mb-6" />}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date *
                        </label>
                        <Select
                          id="date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          required
                        >
                          <option value="">Select Date</option>
                          {availableDates.map((date) => (
                            <option key={date.value} value={date.value}>
                              {date.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Time *
                        </label>
                        <Select
                          id="time"
                          value={selectedTime}
                          onChange={handleTimeChange}
                          required
                          disabled={!selectedDate || availableTimes.length === 0}
                        >
                          <option value="">Select Time</option>
                          {availableTimes.map((time) => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Appointment Type *
                      </label>
                      <Select
                        id="type"
                        value={appointmentType}
                        onChange={handleTypeChange}
                        required
                      >
                        <option value="in-person">In-Person Visit</option>
                        <option value="video">Video Consultation</option>
                        <option value="phone">Phone Consultation</option>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Symptoms (comma separated)
                      </label>
                      <Input
                        type="text"
                        id="symptoms"
                        value={symptoms}
                        onChange={handleSymptomsChange}
                        placeholder="e.g., Headache, Fever, Fatigue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Insurance
                      </label>
                      <Select
                        id="insurance"
                        value={selectedInsurance}
                        onChange={handleInsuranceChange}
                      >
                        <option value="">Select Insurance (Optional)</option>
                        {doctor.insurances.map((insurance) => (
                          <option key={insurance} value={insurance}>
                            {insurance}
                          </option>
                        ))}
                        <option value="none">Self-Pay</option>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Additional Notes
                      </label>
                      <TextArea
                        id="notes"
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Describe your condition, medical history, or any specific concerns..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={bookingStatus === 'loading'}
                      >
                        {bookingStatus === 'loading' ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Submitting Request...
                          </>
                        ) : (
                          'Request Appointment'
                        )}
                      </Button>
                      
                      <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
                        Your appointment will be confirmed after the doctor accepts your request
                      </p>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            
            <div>
              {/* Doctor info card */}
              <Card className={`sticky top-8 ${cardBgClass}`}>
                <div className="flex items-center">
                  <div className="relative h-20 w-20">
                    <Image
                      src={doctor.profileImage}
                      alt={doctor.name}
                      fill
                      className="rounded-full object-cover border-2 border-white dark:border-gray-700"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  
                  <div className="ml-4">
                    <h2 className={`text-lg font-medium ${textClass}`}>{doctor.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                    
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{doctor.rating} ({doctor.reviewCount})</span>
                    </div>
                  </div>
                </div>
                
                <hr className={`my-4 border-gray-200 dark:border-gray-700`} />
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                    <p className={`mt-1 text-sm ${textClass}`}>
                      {doctor.location.address}<br />
                      {doctor.location.city}, {doctor.location.state}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Days</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {doctor.availability.map((day) => (
                        <Badge key={day} variant="info" size="sm">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Arab Insurance Plans</h3>
                    <ul className={`mt-1 text-sm ${textClass} space-y-1`}>
                      {doctor.insurances.map((insurance) => (
                        <li key={insurance} className="flex items-center">
                          <svg className="h-3 w-3 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {insurance}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                  >
                    View Full Profile
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentBookingPage;