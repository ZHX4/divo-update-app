export const sampleNotifications = [
  {
    id: 'notification-1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Labed Mahfoud has been confirmed for tomorrow at 10:00 AM.',
    type: 'appointment',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    time: '30 minutes ago',
    isNew: true,
    link: '/appointments'
  },
  {
    id: 'notification-2',
    title: 'Prescription Refill Ready',
    message: 'Your prescription for Amoxicillin is ready for pickup at Central Pharmacy.',
    type: 'medical',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    time: '1 hour ago',
    isNew: true,
    link: '/health-records'
  },
  {
    id: 'notification-3',
    title: 'Medical Results Available',
    message: 'Your recent blood test results are now available in your patient portal.',
    type: 'medical',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    time: '2 hours ago',
    isNew: true,
    link: '/health-records'
  },
  {
    id: 'notification-4',
    title: 'Appointment Reminder',
    message: 'Don\'t forget your appointment with Dr. Sarah Wilson tomorrow at 3:30 PM.',
    type: 'appointment',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    time: '5 hours ago',
    isNew: false,
    link: '/appointments'
  },
  {
    id: 'notification-5',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    type: 'system',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    time: 'Yesterday',
    isNew: false,
    link: '/profile'
  },
  {
    id: 'notification-6',
    title: 'New Doctor Available',
    message: 'Dr. Ahmed Hassan, Neurologist, is now available for appointments.',
    type: 'system',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    time: '2 days ago',
    isNew: false,
    link: '/find-doctors'
  }
];
