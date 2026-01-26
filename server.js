// Entry point for Hostinger deployment
// This file simply requires the compiled server from dist/index.cjs

// Ensure NODE_ENV is set to production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

try {
  console.log('Loading server from dist/index.cjs...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  
  require('./dist/index.cjs');
  
  console.log('Server module loaded successfully');
} catch (error) {
  console.error('Failed to load server:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
