import { Request, Response } from 'express';
import Joi from 'joi';
import { VendorFormData } from '../types/vendor';
import { sendVendorRegistrationEmail } from '../services/emailService';

// Helpers for submission storage
interface StoredSubmission {
  data: VendorFormData;
  files?: Array<{ filename: string; size: number }> | null;
  timestamp: number;
  ip: string;
  id: string;
  userAgent?: string;
}

const vendorSubmissionsStore: StoredSubmission[] = [];

// Validation schema for vendor registration
const vendorFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  designation: Joi.string().trim().min(2).max(100).required(),
  companyName: Joi.string().trim().min(2).max(200).required(),
  firmType: Joi.string().required(), // Allow diverse types from frontend (Proprietorship, LLP, etc.)
  vendorType: Joi.string().valid('domestic', 'international', 'global').required(),
  country: Joi.string().trim().min(2).max(100).required(),
  address: Joi.string().trim().max(500).required(), // Company Address
  website: Joi.string().uri().allow('').optional(),
  contactNo: Joi.string().required(),
  email: Joi.string().email().required().max(255),
  category: Joi.string().trim().min(2).max(200).required(),
  productDescription: Joi.string().trim().min(10).max(2000).required(),
  majorClients: Joi.string().trim().allow('').optional(),
  turnover: Joi.number().min(0).required(),
  turnoverCurrency: Joi.string().valid('INR', 'USD', 'IDR').optional().default('INR'),
  gstNumber: Joi.string().optional().allow(''),
  terms: Joi.boolean().optional(),
  referenceId: Joi.string().trim().optional()
});

export const submitVendorRegistration = async (req: Request, res: Response) => {
  try {
    // Validate and sanitize input
    const { error, value } = vendorFormSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => detail.message),
        error: 'VALIDATION_ERROR'
      });
    }

    const vendorData: VendorFormData = value;
    const files = req.files as Express.Multer.File[] | undefined;

    // Determine IP and UA
    const ip = (req.ip || (req.headers['x-real-ip'] as string) || (req.headers['x-forwarded-for'] as string) || (req.connection as any)?.remoteAddress || 'unknown').toString();
    const userAgent = req.headers['user-agent'];

    // Generate referenceId if not provided
    if (!vendorData.referenceId) {
      vendorData.referenceId = `TOKEN-${Date.now().toString().slice(-6)}`;
    }

    // Create submission id and store
    const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    vendorSubmissionsStore.push({
      data: vendorData,
      files: files?.length
        ? files.map(f => ({ filename: f.originalname, size: f.size }))
        : null,
      timestamp: Date.now(),
      ip,
      id: submissionId,
      userAgent
    });

    console.log('New vendor registration stored', {
      submissionId,
      referenceId: vendorData.referenceId,
      email: vendorData.email,
      company: vendorData.companyName,
      filesCount: files?.length || 0,
      ip
    });

    // Try to send email notifications (do not fail the response if email fails)
    let emailSent = false;
    try {
      emailSent = await sendVendorRegistrationEmail(vendorData, files);
    } catch (e) {
      console.error('Error sending vendor registration email:', e);
    }

    return res.status(200).json({
      success: true,
      message: 'Vendor registration submitted successfully',
      referenceId: vendorData.referenceId,
      submissionId,
      emailSent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing vendor registration:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

// Export stats handler for router
export const getSubmissionStats = (req: Request, res: Response) => {
  const now = Date.now();
  const last24Hours = vendorSubmissionsStore.filter(s => now - s.timestamp < 24 * 60 * 60 * 1000);
  const last7Days = vendorSubmissionsStore.filter(s => now - s.timestamp < 7 * 24 * 60 * 60 * 1000);
  return res.json({
    total: vendorSubmissionsStore.length,
    last24Hours: last24Hours.length,
    last7Days: last7Days.length,
    oldestSubmission: vendorSubmissionsStore.length > 0 ? new Date(Math.min(...vendorSubmissionsStore.map(s => s.timestamp))).toISOString() : null,
    newestSubmission: vendorSubmissionsStore.length > 0 ? new Date(Math.max(...vendorSubmissionsStore.map(s => s.timestamp))).toISOString() : null
  });
};