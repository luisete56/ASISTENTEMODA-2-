// Entry point for Hostinger deployment
// This file ensures the server starts correctly in production

// Ensure NODE_ENV is set to production
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Log startup information
console.log('='.repeat(50));
console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('Working directory:', process.cwd());
console.log('='.repeat(50));

// Use a timeout to ensure the process doesn't exit immediately
const keepAlive = setInterval(() => {
  // Keep the process alive
}, 1000);

// Load the compiled server
try {
  console.log('Loading server from dist/index.cjs...');
  require('./dist/index.cjs');
  console.log('Server module loaded successfully');
  
  // Clear the keep-alive interval after a delay to let the server start
  setTimeout(() => {
    clearInterval(keepAlive);
  }, 5000);
} catch (error) {
  clearInterval(keepAlive);
  console.error('='.repeat(50));
  console.error('CRITICAL ERROR: Failed to load server');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  console.error('='.repeat(50));
  process.exit(1);
}
