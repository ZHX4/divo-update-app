const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Installing Tailwind CSS plugins...');

try {

  execSync('npm install @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio tailwindcss-rtl', { 
    stdio: 'inherit'
  });
  
  console.log('Successfully installed Tailwind CSS plugins!');
} catch (error) {
  console.error('Error installing Tailwind CSS plugins:', error.message);
  process.exit(1);
}
