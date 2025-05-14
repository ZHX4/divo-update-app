/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Monday, January 1, 2023")
 */
export const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format a date string to a short format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatShortDate = (dateString) => {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format a time string to a more readable format
 * @param timeString - Time string in 24-hour format (e.g., "14:30")
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Format a date and time together
 * @param dateString - ISO date string
 * @param timeString - Time string in 24-hour format
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString, timeString) => {
  return `${formatShortDate(dateString)} at ${formatTime(timeString)}`;
};

/**
 * Get a relative time string (e.g., "2 hours ago", "yesterday", etc.)
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'yesterday';
  }
  
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return '1 week ago';
  }
  
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return '1 month ago';
  }
  
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

/**
 * Format a currency amount
 * @param amount - Number to format as currency
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncate a string if it exceeds a certain length
 * @param str - String to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Capitalize the first letter of each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format a phone number to a standard format
 * @param phoneNumber - Raw phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phoneNumber;
};

/**
 * Get appropriate CSS class for appointment status badge
 * @param status - Appointment status
 * @returns CSS class name
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'scheduled':
      return 'badge-info';
    case 'completed':
      return 'badge-success';
    case 'cancelled':
      return 'badge-danger';
    case 'no-show':
      return 'badge-warning';
    default:
      return 'badge-info';
  }
};

/**
 * Get appropriate icon name for appointment type
 * @param type - Appointment type
 * @returns Icon name
 */
export const getAppointmentTypeIcon = (type) => {
  switch (type) {
    case 'consultation':
      return 'chat-bubble-left-right';
    case 'follow-up':
      return 'arrow-path';
    case 'check-up':
      return 'clipboard-document-check';
    case 'emergency':
      return 'exclamation-triangle';
    default:
      return 'calendar';
  }
};