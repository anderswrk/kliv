// Google Ads Click ID (GCLID) utility functions

const GCLID_KEY = 'gclid';
const GCLID_EXPIRY_KEY = 'gclid_expiry';
const GCLID_EXPIRY_DAYS = 90; // Google Ads attribution window

/**
 * Captures GCLID from URL parameters and stores it in localStorage
 */
export function captureGclid(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');
  
  if (gclid) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + GCLID_EXPIRY_DAYS);
    
    localStorage.setItem(GCLID_KEY, gclid);
    localStorage.setItem(GCLID_EXPIRY_KEY, expiryDate.toISOString());
    
    console.log('GCLID captured:', gclid);
  }
}

/**
 * Retrieves stored GCLID if it hasn't expired
 */
export function getStoredGclid(): string | null {
  const gclid = localStorage.getItem(GCLID_KEY);
  const expiryString = localStorage.getItem(GCLID_EXPIRY_KEY);
  
  if (!gclid || !expiryString) {
    return null;
  }
  
  const expiryDate = new Date(expiryString);
  const now = new Date();
  
  if (now > expiryDate) {
    // GCLID has expired, clean up
    localStorage.removeItem(GCLID_KEY);
    localStorage.removeItem(GCLID_EXPIRY_KEY);
    return null;
  }
  
  return gclid;
}

/**
 * Clears stored GCLID data
 */
export function clearGclid(): void {
  localStorage.removeItem(GCLID_KEY);
  localStorage.removeItem(GCLID_EXPIRY_KEY);
}

/**
 * Initializes GCLID tracking on page load
 */
export function initializeGclidTracking(): void {
  // Capture GCLID from current URL
  captureGclid();
  
  // Clean up expired GCLID on initialization
  getStoredGclid();
}