import React, { useState } from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.9,
    experience: 15,
    education: ['Harvard Medical School', 'Johns Hopkins University'],
    languages: ['English', 'Spanish'],
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      hours: ['9:00 AM - 5:00 PM'],
    },
    location: 'Medical Center, Building A',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    rating: 4.8,
    experience: 10,
    education: ['Stanford University School of Medicine', 'UCLA'],
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Chen specializes in medical and cosmetic dermatology, with a focus on skin cancer prevention and treatment.',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: ['8:00 AM - 4:00 PM'],
    },
    location: 'Medical Center, Building B',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.9,
    experience: 12,
    education: ['Yale School of Medicine', 'University of Pennsylvania'],
    languages: ['English', 'Spanish', 'Portuguese'],
    bio: 'Dr. Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence.',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: ['9:00 AM - 6:00 PM'],
    },
    location: 'Children\'s Medical Center',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const SPECIALTIES = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  
  const filteredDoctors = MOCK_DOCTORS.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                            doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <MainLayout>
      <Head>
        <title>Find Doctors | MediConnect</title>
        <meta name="description" content="Find and book appointments with top doctors" />
      </Head>
      
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Find a Doctor</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Browse our network of top healthcare professionals and book your appointment
          </p>
        </div>
        
        {/* Search and filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search doctors
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm 
                  border-gray-300 dark:border-gray-600 rounded-md
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="specialty" className="sr-only">
              Specialty
            </label>
            <select
              id="specialty"
              name="specialty"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full py-2 pl-3 pr-10 
                text-base border-gray-300 dark:border-gray-600 rounded-md
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {SPECIALTIES.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredDoctors.length} doctors
        </div>
        
        {/* Doctors list */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg 
              divide-y divide-gray-200 dark:divide-gray-700">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16">
                    <img className="h-16 w-16 rounded-full" src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <svg className="text-yellow-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        {doctor.rating} • {doctor.experience} years exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{doctor.bio}</p>
              </div>
              <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Available: {doctor.availability.days.join(', ')}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{doctor.location}</span>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border 
                      border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                      bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                      dark:focus:ring-offset-gray-800 transition-colors duration-200"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredDoctors.length === 0 && (
          <div className="mt-12 text-center py-12 px-4 sm:px-6 lg:px-8 
            bg-white dark:bg-gray-800 shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No doctors found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent 
                  text-sm font-medium rounded-md shadow-sm text-white 
                  bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                  dark:focus:ring-offset-gray-800 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('All Specialties');
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Doctors;