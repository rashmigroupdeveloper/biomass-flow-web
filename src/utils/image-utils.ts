/**
 * Utility functions for handling images in the application
 */

/**
 * Validates and fixes a base64 image URL
 * @param url The URL to validate/fix
 * @returns A properly formatted base64 image URL
 */
export const validateBase64ImageUrl = (url: string): string => {
  // Check if it's already a valid data URL
  if (url.startsWith('data:image/') && url.includes('base64,')) {
    return url;
  }
  
  // If it contains URL-encoded characters (like %D1), decode them first
  if (url.includes('%')) {
    try {
      url = decodeURIComponent(url);
    } catch (e) {
      console.error('Failed to decode URL-encoded characters:', e);
      // Continue with the original string if decoding fails
    }
  }
  
  // If it's just the base64 content without the prefix
  if (!url.startsWith('data:')) {
    // Try to determine image type or default to png
    let mimeType = 'image/png';
    return `data:${mimeType};base64,${url}`;
  }
  
  // Return original if we can't fix it
  return url;
};

/**
 * Fetches an image from a URL and converts it to a base64 data URL
 * @param url The image URL to fetch
 * @returns Promise resolving to a base64 data URL
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting URL to base64:', error);
    throw error;
  }
}; 