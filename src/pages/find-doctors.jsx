import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const specialties = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Family Medicine',
  'Gastroenterology',
  'Neurology',
  'Obstetrics & Gynecology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Urology'
];

const insuranceProviders = [
  'Daman Health',
  'ADNIC',
  'Tawuniya',
  'BUPA Arabia',
  'Medgulf',
  'Allianz MENA',
  'AXA Gulf',
  'Oman Insurance',
  'Qatar Insurance',
  'GIG Insurance'
];

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

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [distance, setDistance] = useState(10);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filteredDoctors = [...mockDoctors];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(query) || 
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.city.toLowerCase().includes(query)
        );
      }
      
      if (selectedSpecialty) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.specialty === selectedSpecialty
        );
      }
      
      if (selectedInsurance) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.insurances.includes(selectedInsurance)
        );
      }
      
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.location.distance <= distance
      );
      
      if (showOnlyAvailable) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.acceptingNewPatients
        );
      }
      
      if (sortBy === 'rating') {
        filteredDoctors.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'distance') {
        filteredDoctors.sort((a, b) => a.location.distance - b.location.distance);
      } else if (sortBy === 'availability') {
        filteredDoctors.sort((a, b) => {
          return new Date(a.nextAvailable).getTime() - new Date(b.nextAvailable).getTime();
        });
      }
      
      setDoctors(filteredDoctors);
      setIsLoading(false);
    }, 500); 
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedSpecialty, selectedInsurance, distance, showOnlyAvailable, sortBy]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };
  
  const handleInsuranceChange = (e) => {
    setSelectedInsurance(e.target.value);
  };
  
  const handleDistanceChange = (e) => {
    setDistance(parseInt(e.target.value));
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleAvailabilityToggle = (e) => {
    setShowOnlyAvailable(e.target.checked);
  };
  
  const toggleMobileFilter = () => {
    setIsFilterMobileOpen(!isFilterMobileOpen);
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedInsurance('');
    setDistance(10);
    setShowOnlyAvailable(false);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <Head>
        <title>Find Doctors - Medical Appointment System</title>
        <meta name="description" content="Find and book appointments with qualified doctors in your area" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, specialty, or location"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Specialty
                </label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Insurance
                </label>
                <select
                  id="insurance"
                  value={selectedInsurance}
                  onChange={handleInsuranceChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="">All Insurance</option>
                  {insuranceProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Distance: {distance} miles
                </label>
                <input
                  type="range"
                  id="distance"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={handleDistanceChange}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={showOnlyAvailable}
                  onChange={handleAvailabilityToggle}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                  Show only available doctors
                </label>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 block text-sm text-gray-700 dark:text-gray-200">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Rating</option>
                  <option value="distance">Distance</option>
                  <option value="availability">Availability</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading doctors...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No doctors found matching your criteria.</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={doctor.profileImage}
                        alt={doctor.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {doctor.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          doctor.acceptingNewPatients
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {doctor.acceptingNewPatients ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      
                      <p className="mt-1 text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                      
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            {doctor.rating} ({doctor.reviewCount} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            {doctor.location.distance} miles away
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Location</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {doctor.location.address}<br />
                          {doctor.location.city}, {doctor.location.state}
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Availability</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Available on: {doctor.availability.join(', ')}<br />
                          Next available: {new Date(doctor.nextAvailable).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center space-x-4">
                        <Link
                          href={`/appointments/new?doctorId=${doctor.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                            text-white bg-primary-600 
                            hover:bg-primary-500 hover:shadow-lg 
                            dark:bg-primary-600 dark:hover:bg-primary-500
                            transform transition-all duration-200 ease-in-out
                            hover:scale-105 hover:text-white
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                            dark:focus:ring-offset-gray-800"
                        >
                          Book Appointment
                        </Link>
                        <Link
                          href={`/doctors/${doctor.id}`}
                          className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md
                            text-gray-700 bg-white border-gray-300
                            hover:bg-gray-50 hover:shadow-md
                            dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600
                            dark:hover:bg-gray-600 dark:hover:border-gray-500
                            transform transition-all duration-200 ease-in-out
                            hover:scale-105
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                            dark:focus:ring-offset-gray-800"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDoctors;