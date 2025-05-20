import { validateBase64ImageUrl, urlToBase64 } from './image-utils';

const imageCache: Record<string, string> = {};

/**
 * Preloads images and caches them for faster access
 * @param urls Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  const loadPromises = urls.map(async (url) => {
    try {
      // Skip if already cached
      if (imageCache[url]) {
        return;
      }
      
      // If it's a data URL, validate it
      if (url.startsWith('data:')) {
        imageCache[url] = validateBase64ImageUrl(url);
        return;
      }
      
      // Convert regular URL to base64
      const base64Data = await urlToBase64(url);
      imageCache[url] = base64Data;
    } catch (error) {
      console.error(`Failed to preload image: ${url}`, error);
    }
  });
  
  await Promise.all(loadPromises);
};

/**
 * Gets an image from the cache or loads it if not cached
 * @param url The image URL to get
 * @returns Promise resolving to the base64 data URL
 */
export const getImage = async (url: string): Promise<string> => {
  // Return from cache if available
  if (imageCache[url]) {
    return imageCache[url];
  }
  
  try {
    // If it's a data URL, validate it
    if (url.startsWith('data:')) {
      const validatedUrl = validateBase64ImageUrl(url);
      imageCache[url] = validatedUrl;
      return validatedUrl;
    }
    
    // Convert regular URL to base64
    const base64Data = await urlToBase64(url);
    imageCache[url] = base64Data;
    return base64Data;
  } catch (error) {
    console.error(`Failed to load image: ${url}`, error);
    throw error;
  }
}; 