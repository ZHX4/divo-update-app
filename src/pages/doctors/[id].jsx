import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Tabs from '../../components/common/Tabs';
import Alert from '../../components/common/Alert';

// This is the same mock data from find-doctors.jsx
// In a production app, this would be fetched from API
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
    },
    bio: 'Dr. Labed Mahfoud is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. He specializes in preventive cardiology, heart disease management, and cardiac rehabilitation.',
    services: [
      'Cardiac Consultation',
      'ECG (Electrocardiogram)',
      'Echocardiography',
      'Holter Monitoring',
      'Stress Test',
      'Cardiac Rehabilitation'
    ],
    languages: ['English', 'Arabic', 'French'],
    reviews: [
      {
        id: 1,
        patientName: 'Ahmed M.',
        rating: 5,
        date: '2023-02-15',
        comment: 'Dr. Mahfoud is extremely knowledgeable and took the time to explain my condition in detail. Highly recommended!'
      },
      {
        id: 2,
        patientName: 'Sarah K.',
        rating: 4,
        date: '2023-01-30',
        comment: 'Very professional and thorough. The office staff was also very helpful with scheduling.'
      },
      {
        id: 3,
        patientName: 'Mohamed R.',
        rating: 5,
        date: '2022-12-18',
        comment: 'Dr. Mahfoud provided excellent care during my cardiac evaluation. He has a great bedside manner and is very attentive.'
      }
    ]
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
    },
    bio: 'Dr. Farid Benkhelifa is a skilled dermatologist specializing in medical, surgical, and cosmetic dermatology. With 8 years of experience, he provides comprehensive care for various skin conditions.',
    services: [
      'General Skin Consultation',
      'Acne Treatment',
      'Skin Cancer Screening',
      'Mole Removal',
      'Eczema & Psoriasis Treatment',
      'Cosmetic Procedures'
    ],
    languages: ['English', 'Arabic', 'French'],
    reviews: [
      {
        id: 1,
        patientName: 'Leila B.',
        rating: 5,
        date: '2023-03-10',
        comment: 'Dr. Benkhelifa helped clear my acne after years of struggling. Very knowledgeable and caring doctor!'
      },
      {
        id: 2,
        patientName: 'Karim A.',
        rating: 4,
        date: '2023-02-05',
        comment: 'Good experience overall. The doctor was thorough and the treatment was effective.'
      },
      {
        id: 3,
        patientName: 'Yasmine H.',
        rating: 5,
        date: '2023-01-22',
        comment: 'Excellent dermatologist who takes time with his patients. Very happy with my results.'
      }
    ]
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
    },
    bio: 'Dr. Douaa Bouden is a compassionate pediatrician with 15 years of experience caring for children of all ages. She focuses on preventive care and child development.',
    services: [
      'Well-Child Visits',
      'Vaccinations',
      'Developmental Assessments',
      'School Physicals',
      'Acute Illness Treatment',
      'Newborn Care'
    ],
    languages: ['English', 'Arabic'],
    reviews: [
      {
        id: 1,
        patientName: 'Amina L.',
        rating: 5,
        date: '2023-04-05',
        comment: 'Dr. Bouden is amazing with children. My kids look forward to their appointments with her!'
      },
      {
        id: 2,
        patientName: 'Omar T.',
        rating: 5,
        date: '2023-03-15',
        comment: 'Very attentive and patient. She takes her time to answer all our questions about our baby.'
      },
      {
        id: 3,
        patientName: 'Nadia Z.',
        rating: 4,
        date: '2023-02-20',
        comment: 'Excellent pediatrician who really cares about her patients. Highly recommended.'
      }
    ]
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
    },
    bio: 'Dr. Farhet Mounir is a highly experienced neurologist with 20 years of practice. He specializes in treating various neurological disorders and is known for his diagnostic expertise.',
    services: [
      'Neurological Evaluation',
      'Headache Treatment',
      'Seizure Management',
      'Movement Disorders',
      'Multiple Sclerosis Care',
      'EMG/Nerve Conduction Studies'
    ],
    languages: ['English', 'Arabic', 'French'],
    reviews: [
      {
        id: 1,
        patientName: 'Rachid M.',
        rating: 5,
        date: '2023-03-25',
        comment: 'Dr. Mounir correctly diagnosed my condition after several other doctors couldn\'t. Excellent physician!'
      },
      {
        id: 2,
        patientName: 'Fatima K.',
        rating: 4,
        date: '2023-02-10',
        comment: 'Very knowledgeable and thorough. Takes time to explain complex neurological concepts.'
      },
      {
        id: 3,
        patientName: 'Hamid B.',
        rating: 5,
        date: '2023-01-05',
        comment: 'Dr. Mounir helped me manage my migraines effectively. My quality of life has improved significantly.'
      }
    ]
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
    },
    bio: 'Dr. Abdellah Djadour is a dedicated OB/GYN with 10 years of experience providing comprehensive women\'s healthcare throughout all stages of life.',
    services: [
      'Prenatal Care',
      'Annual Gynecological Exams',
      'Family Planning',
      'Menopause Management',
      'Gynecological Surgery',
      'Fertility Assessment'
    ],
    languages: ['English', 'Arabic'],
    reviews: [
      {
        id: 1,
        patientName: 'Sofia B.',
        rating: 5,
        date: '2023-04-10',
        comment: 'Dr. Djadour is incredibly knowledgeable and compassionate. He made me feel comfortable during my pregnancy.'
      },
      {
        id: 2,
        patientName: 'Layla H.',
        rating: 5,
        date: '2023-03-05',
        comment: 'Excellent doctor who truly listens to his patients. Very thorough and caring.'
      },
      {
        id: 3,
        patientName: 'Rania M.',
        rating: 4,
        date: '2023-02-15',
        comment: 'Dr. Djadour has been my gynecologist for years. He\'s professional and respectful.'
      }
    ]
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
    },
    bio: 'Dr. Farid Al-Khalidi is an accomplished orthopedic surgeon with 18 years of experience. He specializes in sports medicine, joint replacement, and fracture care.',
    services: [
      'Joint Replacement Surgery',
      'Fracture Care',
      'Sports Injuries',
      'Arthroscopy',
      'Physical Therapy',
      'Pain Management'
    ],
    languages: ['English', 'Arabic'],
    reviews: [
      {
        id: 1,
        patientName: 'Ali S.',
        rating: 5,
        date: '2023-03-20',
        comment: 'Dr. Al-Khalidi performed my knee replacement surgery with excellent results. I\'m back to my normal activities.'
      },
      {
        id: 2,
        patientName: 'Noor K.',
        rating: 4,
        date: '2023-02-25',
        comment: 'Very skilled surgeon who helped me recover from a complex fracture. Highly recommended.'
      },
      {
        id: 3,
        patientName: 'Hassan M.',
        rating: 4,
        date: '2023-01-12',
        comment: 'Dr. Al-Khalidi provided great care for my shoulder injury. The staff was also very professional.'
      }
    ]
  }
];

const DoctorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  
  useEffect(() => {
    if (id) {
      // In a real app, fetch the doctor data from an API
      // For now, we'll use our mock data
      setLoading(true);
      const foundDoctor = mockDoctors.find(doc => doc.id === Number(id));
      
      if (foundDoctor) {
        setDoctor(foundDoctor);
        // Generate mock available slots for the next 7 days
        generateAvailableSlots(foundDoctor);
      }
      
      setLoading(false);
    }
  }, [id]);
  
  const generateAvailableSlots = (doctor) => {
    const slots = [];
    const today = new Date();
    
    // Generate slots for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Check if the doctor is available on this day
      if (doctor.availability.includes(dayName)) {
        // Generate 3-5 random time slots for this day
        const daySlots = [];
        const numberOfSlots = 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < numberOfSlots; j++) {
          // Random hour between 9 AM and 4 PM
          const hour = 9 + Math.floor(Math.random() * 8);
          // Random minute (0, 15, 30, 45)
          const minute = Math.floor(Math.random() * 4) * 15;
          
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          daySlots.push({
            id: `${date.toISOString().split('T')[0]}-${timeString}`,
            time: timeString,
            available: Math.random() > 0.3 // 70% chance of being available
          });
        }
        
        // Sort slots by time
        daySlots.sort((a, b) => a.time.localeCompare(b.time));
        
        slots.push({
          date: date.toISOString().split('T')[0],
          dayName,
          dayNumber: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          slots: daySlots
        });
      }
    }
    
    setAvailableSlots(slots);
    
    // If there are slots, select the first date by default
    if (slots.length > 0) {
      setSelectedDate(slots[0].date);
    }
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handleBookAppointment = (slotId) => {
    // Extract date and time from the slot ID
    const [date, time] = slotId.split('-');
    
    // In a real app, you'd redirect to an appointment booking page with the selected date/time
    router.push(`/appointments/new?doctorId=${doctor.id}&date=${date}&time=${time}`);
  };
  
  // Create tab content components
  const AboutContent = () => (
    <div className="space-y-6 px-4 py-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Biography</h3>
        <p className="mt-3 text-gray-600 dark:text-gray-300">{doctor.bio}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
        <div className="mt-3 text-gray-600 dark:text-gray-300">
          <p>{doctor.location.address}</p>
          <p>{doctor.location.city}, {doctor.location.state}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Arab Insurance Plans Accepted</h3>
        <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          {doctor?.insurances.map((insurance, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {insurance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  const ServicesContent = () => (
    <div className='px-4 py-4'>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Services Provided</h3>
      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctor?.services.map((service, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  
  const ReviewsContent = () => (
    <div className="space-y-6 px-4 py-4">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{doctor?.rating}</div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-5 w-5 ${i < Math.floor(doctor?.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 ">{doctor?.reviewCount} reviews</div>
        </div>
      </div>
      
      {doctor?.reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
          </div>
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{review.patientName}</div>
          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
  
  // Define the tabs array for the Tabs component
  const doctorProfileTabs = doctor ? [
    {
      id: 'about',
      label: 'About',
      content: <AboutContent />
    },
    {
      id: 'services',
      label: 'Services',
      content: <ServicesContent />
    },
    {
      id: 'reviews',
      label: `Reviews (${doctor.reviews.length})`,
      content: <ReviewsContent />
    }
  ] : [];
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">Loading doctor profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!doctor) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert 
              type="error" 
              message="Doctor not found" 
              actionLabel="Go Back" 
              actionUrl="/find-doctors" 
            />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Head>
        <title>{doctor.name} - Doctor Profile | Divo Healthcare</title>
        <meta name="description" content={`View profile and book appointments with ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} of experience.`} />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
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
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{doctor.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Doctor profile header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:shrink-0 p-6 flex items-center justify-center md:justify-start">
                <div className="relative h-40 w-40 md:h-48 md:w-48">
                  <Image
                    src={doctor.profileImage}
                    alt={doctor.name}
                    fill
                    className="rounded-full object-cover border-4 border-white dark:border-gray-700"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              
              <div className="p-6 md:p-8 md:flex-1">
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{doctor.name}</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                    
                    <div className="mt-3 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{doctor.rating} ({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.acceptingNewPatients
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {doctor.acceptingNewPatients ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{doctor.education}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{doctor.experience}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</h3>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{doctor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <Tabs
                    tabs={doctorProfileTabs}
                    defaultTabId={activeTab}
                    onChange={handleTabChange}
                  />
                </div>
                {/* Remove the duplicate content rendering - the Tabs component already renders the active tab content */}
              </div>
            </div>
            
            <div>
              {/* Appointment booking sidebar */}
              <Card className="sticky top-8 p-0 overflow-hidden">
                <div className="bg-primary-600 dark:bg-primary-700 p-4">
                  <h3 className="text-white text-lg font-medium">Book an Appointment</h3>
                </div>
                
                <div className="p-4">
                  {doctor.acceptingNewPatients ? (
                    <div>
                      {availableSlots.length > 0 ? (
                        <>
                          {/* Date selection */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Select Date
                            </label>
                            <div className="flex space-x-2 pb-2 overflow-x-auto">
                              {availableSlots.map((day) => (
                                <button
                                  key={day.date}
                                  onClick={() => handleDateSelect(day.date)}
                                  className={`flex flex-col items-center justify-center p-2 rounded-md min-w-[70px] ${
                                    selectedDate === day.date
                                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{day.dayName}</span>
                                  <span className="text-lg font-semibold">{day.dayNumber}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{day.month}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Time selection */}
                          {selectedDate && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Available Time Slots
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {availableSlots.find(day => day.date === selectedDate)?.slots.map(slot => (
                                  <button
                                    key={slot.id}
                                    disabled={!slot.available}
                                    onClick={() => handleBookAppointment(slot.id)}
                                    className={`py-2 px-3 text-center text-sm rounded-md ${
                                      !slot.available
                                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50'
                                    }`}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-6">
                            <Link
                              href={`/appointments/new?doctorId=${doctor.id}`}
                              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg dark:bg-primary-700 dark:hover:bg-primary-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 hover:brightness-110"
                            >
                              See All Available Times
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-6">
                          <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">No available slots found for this doctor.</p>
                          <Link
                            href={`/appointments/new?doctorId=${doctor.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg dark:bg-primary-700 dark:hover:bg-primary-800 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                          >
                            Check Availability
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg className="h-12 w-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">This doctor is not accepting new patients at this time.</p>
                      <Link
                        href="/find-doctors"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 transition"
                      >
                        Find Another Doctor
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
              
              <Card className="mt-6 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">{doctor.name.toLowerCase().replace(/\s+/g, '.')}@divo.com</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div className="ml-3 text-gray-600 dark:text-gray-300">
                      <p>{doctor.location.address}</p>
                      <p>{doctor.location.city}, {doctor.location.state}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorProfile;