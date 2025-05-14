const { execSync } = require('child_process');

console.log('Installing nprogress...');

try {

  execSync('npm install nprogress', { stdio: 'inherit' });
  
  console.log('Successfully installed nprogress!');
} catch (error) {
  console.error('Error installing nprogress:', error.message);
  process.exit(1);
}
