// Wrapper for Hostinger - redirects to server.cjs
// This file exists because Hostinger expects server.js as entry point
// Uses createRequire because package.json has "type": "module"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('./server.cjs');
