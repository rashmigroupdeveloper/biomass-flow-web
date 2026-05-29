import axios from 'axios';

/**
 * Validates a reCAPTCHA token with Google's API
 * @param token The recaptcha token from the frontend
 * @returns boolean indicating if the token is valid
 */
export const validateRecaptcha = async (token: string | undefined): Promise<boolean> => {
  // If no secret key is provided, we skip validation (useful for dev/staging if key not set)
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('⚠️ RECAPTCHA_SECRET_KEY not set. Skipping validation.');
    return true;
  }

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ reCAPTCHA token missing in development. Allowing submission.');
      return true;
    }
    return false;
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    
    return !!response.data.success;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
};
