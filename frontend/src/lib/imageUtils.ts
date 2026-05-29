/**
 * Validates if a string is a proper base64 data URL
 * @param url String to validate
 * @returns boolean indicating if the URL is a valid base64 data URL
 */
export const isValidBase64ImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Check if it's a data URL with proper format
  if (!url.startsWith('data:image/')) return false;
  
  // Extract the base64 part
  const parts = url.split(',');
  if (parts.length !== 2) return false;
  
  const base64Part = parts[1];
  
  try {
    // Check if it's valid base64 by attempting to decode
    // This will throw an error if invalid
    atob(base64Part);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if a base64 data URL contains problematic URL-encoded characters
 * @param url Base64 data URL to check
 * @returns boolean indicating if the URL contains URL-encoded characters
 */
export const containsUrlEncodedChars = (url: string): boolean => {
  if (!url) return false;
  return url.includes('%');
};

/**
 * Attempts to clean a base64 data URL by removing URL-encoded characters
 * Note: This is a simple approach and may not work for all cases
 * @param url Base64 data URL to clean
 * @returns Cleaned base64 data URL
 */
export const cleanBase64Url = (url: string): string => {
  if (!url) return url;
  
  // If not a data URL, return as is
  if (!url.startsWith('data:')) return url;
  
  try {
    // Simple replacement of common URL encoded characters
    // This is not comprehensive but handles common cases
    return url.replace(/%[0-9A-Fa-f]{2}/g, '');
  } catch (e) {
    console.error('Error cleaning base64 URL:', e);
    return url;
  }
};

/**
 * Safely creates an image element from a potentially problematic base64 URL
 * Falls back to a default image if the URL is invalid
 * @param url Base64 data URL to use
 * @param fallbackUrl Optional fallback URL to use if the original is invalid
 * @returns A safe URL to use
 */
export const getSafeImageUrl = (url: string, fallbackUrl?: string): string => {
  if (!url) return fallbackUrl || '';
  
  // If it's not a data URL or it's valid, return as is
  if (!url.startsWith('data:') || isValidBase64ImageUrl(url)) {
    return url;
  }
  
  // If it contains URL-encoded characters, try to clean it
  if (containsUrlEncodedChars(url)) {
    const cleaned = cleanBase64Url(url);
    
    // If the cleaned URL is valid, return it
    if (isValidBase64ImageUrl(cleaned)) {
      return cleaned;
    }
  }
  
  // Fall back to the provided fallback or empty string
  return fallbackUrl || '';
}; 