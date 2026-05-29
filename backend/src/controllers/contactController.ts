import { Request, Response } from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { ContactFormData } from '../types/contact';
import { validateRecaptcha } from '../utils/recaptcha';
import { sendContactUsEmail } from '../services/contactUsService';

// In-memory store for submissions when email sending fails
const contactSubmissionsStore: ContactFormData[] = [];

// Validation schema for contact form
const contactFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required().max(255),
  phone: Joi.string().trim().max(20).allow('', null).optional(),
  subject: Joi.string().trim().min(2).max(200).required(),
  message: Joi.string().trim().min(5).max(2000).required(),
  selectedProducts: Joi.array().items(Joi.string().max(100)).optional(),
  recaptchaToken: Joi.string().allow('', null).optional()
});

export const submitContactForm = async (req: Request, res: Response) => {
  console.log('Received contact form submission request:', req.body);
  try {
    // Validate and sanitize input
    const { error, value } = contactFormSchema.validate(req.body, { 
      stripUnknown: true,
      abortEarly: false 
    });
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const contactData: ContactFormData = value;
    const recaptchaToken = req.body.recaptchaToken;

    // Validate reCAPTCHA
    const isHuman = await validateRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA validation failed. Please try again.',
        error: 'RECAPTCHA_FAILED'
      });
    }
    
    // Generate a secure reference ID for tracking
    const referenceId = `RMQ-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Store submission data in memory regardless of email success
    contactSubmissionsStore.push({
      ...contactData,
      referenceId
    });
    
    console.log(`New contact form submission stored - Ref: ${referenceId}`, contactData);
    console.log(`Total stored submissions: ${contactSubmissionsStore.length}`);
    // Await email delivery to guarantee consistency before responding to the user
    console.log('DEBUG: About to call sendContactUsEmail with data:', { name: contactData.name, email: contactData.email });
    const emailSent = await sendContactUsEmail(contactData);
    console.log('DEBUG: sendContactUsEmail returned:', emailSent);
    
    if (emailSent) {
      console.log(`Contact form email sent successfully - Ref: ${referenceId}`);
    } else {
      console.warn(`Contact form email FAILED to send - Ref: ${referenceId}. Submission is still stored in memory.`);
    }

    // Always return success to the user if we've reached this point (submission is stored)
    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received and is being processed.',
      referenceId,
      emailSent: emailSent // Include status for internal tracking if needed
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}; 