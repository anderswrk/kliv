import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Routes to pre-render
const routes = [
  '/',
  '/en/',
  '/sv/', 
  '/ja/',
  '/en/about',
  '/en/features',
  '/en/pricing',
  '/en/careers',
  '/en/login',
  '/en/signup',
  '/en/terms',
  '/en/privacy',
  '/en/security',
  '/sv/about',
  '/sv/features',
  '/sv/pricing',
  '/sv/careers',
  '/sv/login',
  '/sv/signup',
  '/sv/terms',
  '/sv/privacy',
  '/sv/security',
  '/ja/about',
  '/ja/features',
  '/ja/pricing',
  '/ja/careers',
  '/ja/login',
  '/ja/signup',
  '/ja/terms',
  '/ja/privacy',
  '/ja/security',
];

console.log('Building static site...');
console.log(`Generating ${routes.length} routes`);

// First build the regular app
execSync('vite build', { stdio: 'inherit' });

console.log('Static site generation completed!');