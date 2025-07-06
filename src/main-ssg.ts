import { ViteSSG } from 'vite-ssg'
import App from './App'
import './index.css'

// Define all routes that should be pre-rendered
const routes = [
  // Default language routes
  { path: '/en', component: () => import('./pages/Index') },
  { path: '/en/about', component: () => import('./pages/About') },
  { path: '/en/features', component: () => import('./pages/Features') },
  { path: '/en/pricing', component: () => import('./pages/Pricing') },
  { path: '/en/careers', component: () => import('./pages/Careers') },
  { path: '/en/privacy', component: () => import('./pages/Privacy') },
  { path: '/en/terms', component: () => import('./pages/Terms') },
  { path: '/en/security', component: () => import('./pages/Security') },
  { path: '/en/signup', component: () => import('./pages/Signup') },
  { path: '/en/login', component: () => import('./pages/Login') },
  
  // Swedish routes
  { path: '/sv', component: () => import('./pages/Index') },
  { path: '/sv/about', component: () => import('./pages/About') },
  { path: '/sv/features', component: () => import('./pages/Features') },
  { path: '/sv/pricing', component: () => import('./pages/Pricing') },
  { path: '/sv/careers', component: () => import('./pages/Careers') },
  { path: '/sv/privacy', component: () => import('./pages/Privacy') },
  { path: '/sv/terms', component: () => import('./pages/Terms') },
  { path: '/sv/security', component: () => import('./pages/Security') },
  { path: '/sv/signup', component: () => import('./pages/Signup') },
  { path: '/sv/login', component: () => import('./pages/Login') },
  
  // Japanese routes
  { path: '/ja', component: () => import('./pages/Index') },
  { path: '/ja/about', component: () => import('./pages/About') },
  { path: '/ja/features', component: () => import('./pages/Features') },
  { path: '/ja/pricing', component: () => import('./pages/Pricing') },
  { path: '/ja/careers', component: () => import('./pages/Careers') },
  { path: '/ja/privacy', component: () => import('./pages/Privacy') },
  { path: '/ja/terms', component: () => import('./pages/Terms') },
  { path: '/ja/security', component: () => import('./pages/Security') },
  { path: '/ja/signup', component: () => import('./pages/Signup') },
  { path: '/ja/login', component: () => import('./pages/Login') },
]

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // Install plugins, configure the app, etc.
  }
)