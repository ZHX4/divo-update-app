import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';

const Profile = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+213 678 901 234',
    address: '123 Main St, Apt 4B',
    city: 'Beb Zouar Alger',
    state: 'AL',
    zipCode: '19000',
    dateOfBirth: '1985-07-15',
    gender: 'male',
    emergencyContact: 'Amar Bounef',
    emergencyPhone: '1540',
    allergies: 'None',
    bloodType: 'O+',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>My Profile | Divo</title>
        <meta name="description" content="View and edit your profile information" />
      </Head>
      
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your personal information
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Your personal details and preferences
              </p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
                  rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 
                  dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Date of birth
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Gender
                    </label>
                    <div className="mt-1">
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Blood Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Street address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      ZIP / Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Emergency Contact Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Emergency Contact Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="emergencyPhone"
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Allergies
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="allergies"
                        name="allergies"
                        rows={3}
                        value={formData.allergies}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm 
                          border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                          text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      List any allergies to medications, food, or other substances.
                    </p>
                  </div>
                </div>
              </div>
                
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 
                    shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 
                    bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                    dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                    text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 
                    dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 
                    disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t border-gray-200 dark:border-gray-700">
              <dl>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.name}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.email}
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.phone}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of birth</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.dateOfBirth}
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2 capitalize">
                    {formData.gender}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood type</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.bloodType}
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency contact</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.emergencyContact} ({formData.emergencyPhone})
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Allergies</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2">
                    {formData.allergies}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
        
        {/* Privacy and security settings */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Privacy & Security
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage your account security and privacy preferences
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h4>
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 
                      shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 
                      bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                      dark:focus:ring-offset-gray-800"
                  >
                    Change Password
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                <div className="mt-2 flex items-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">
                    Not Enabled
                  </span>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 
                      shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 
                      bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                      dark:focus:ring-offset-gray-800"
                  >
                    Enable
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                <div className="mt-2 flex items-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                    Enabled
                  </span>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 
                      shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 
                      bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                      dark:focus:ring-offset-gray-800"
                  >
                    Manage
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Account Deletion</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium 
                      rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;