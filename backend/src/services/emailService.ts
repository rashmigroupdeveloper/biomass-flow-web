import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { VendorFormData } from "../types/vendor";
import { ContactFormData } from "../types/contact";

console.log("DEBUG: emailService.ts module loaded");

// Country code to name mapping (broadened)
const countryMapping: { [key: string]: string } = {
  in: "India",
  ae: "United Arab Emirates",
  au: "Australia",
  bd: "Bangladesh",
  bg: "Bangladesh",
  bt: "Bhutan",
  br: "Brazil",
  ca: "Canada",
  cn: "China",
  co: "Colombia",
  cz: "Czech Republic",
  de: "Germany",
  dk: "Denmark",
  eg: "Egypt",
  es: "Spain",
  fi: "Finland",
  fr: "France",
  gb: "United Kingdom",
  gr: "Greece",
  hu: "Hungary",
  id: "Indonesia",
  ie: "Ireland",
  il: "Israel",
  it: "Italy",
  jp: "Japan",
  kr: "South Korea",
  lk: "Sri Lanka",
  mx: "Mexico",
  my: "Malaysia",
  ng: "Nigeria",
  nl: "Netherlands",
  no: "Norway",
  np: "Nepal",
  nz: "New Zealand",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  qa: "Qatar",
  ro: "Romania",
  ru: "Russia",
  sa: "Saudi Arabia",
  se: "Sweden",
  sg: "Singapore",
  th: "Thailand",
  tr: "Turkey",
  us: "United States",
  ve: "Venezuela",
  vn: "Vietnam",
  za: "South Africa",
  ch: "Switzerland",
  be: "Belgium",
  ar: "Argentina",
  cl: "Chile",
  pk: "Pakistan",
  ua: "Ukraine",
  at: "Austria",
  pe: "Peru",
  sk: "Slovakia",
  si: "Slovenia",
  hr: "Croatia",
  ee: "Estonia",
  lt: "Lithuania",
  lv: "Latvia",
  rs: "Serbia",
  by: "Belarus",
  ge: "Georgia",
  is: "Iceland",
  lu: "Luxembourg",
  mt: "Malta",
  cy: "Cyprus",
  md: "Moldova",
  al: "Albania",
  mk: "North Macedonia",
  me: "Montenegro",
  ba: "Bosnia and Herzegovina",
  li: "Liechtenstein",
  sm: "San Marino",
  mc: "Monaco",
  va: "Vatican City",
  others: "Others",
};

// Helper function to get country name from code
const getCountryName = (countryCode: string): string => {
  return countryMapping[countryCode] || countryCode;
};

// Create email transporter using specific credentials
const createTransporter = (user: string, pass: string) => {
  console.log("DEBUG: createTransporter called with:", {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    user,
    pass: pass ? "***" : "NOT SET",
  });
  if (!user || !pass) {
    console.error("Email configuration missing: User and Pass are required");
    throw new Error("Email service not properly configured");
  }

  const smtpConfig = {
    host: process.env.EMAIL_HOST || "smtp.office365.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: { user, pass },
    requireTLS: true,
    pool: false, // Turn off pooling to prevent connection reset on idle connections
    tls: {
      rejectUnauthorized: false
    }
  };
  console.log(
    "DEBUG SMTP CONFIG:",
    JSON.stringify(
      { ...smtpConfig, auth: { ...smtpConfig.auth, pass: "***" } },
      null,
      2,
    ),
  );
  return nodemailer.createTransport(smtpConfig);
};

export const sendContactFormEmail = async (
  data: ContactFormData,
): Promise<boolean> => {
  console.log("DEBUG: sendContactFormEmail called with data:", {
    name: data.name,
    email: data.email,
    subject: data.subject,
  });
  try {
    console.log("DEBUG: About to create transporter with credentials:", {
      user: process.env.ENQUIRY_EMAIL_USER,
      pass: process.env.ENQUIRY_EMAIL_PASS ? "***" : "NOT SET",
    });
    const transporter = createTransporter(
      process.env.ENQUIRY_EMAIL_USER!,
      process.env.ENQUIRY_EMAIL_PASS!,
    );

    // Generate unique reference ID for tracking
    const refId = `RMQ-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Format the selected products string if any are selected
    const productsText =
      data.selectedProducts && data.selectedProducts.length > 0
        ? `<p><strong>Products of Interest:</strong><br>${data.selectedProducts.join(", ")}</p>`
        : "<p><strong>Products of Interest:</strong> None selected</p>";

    // Create email HTML content with improved formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; }
          h2 { color: #e53935; }
          h3 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #e53935; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission - Ref: ${refId}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3>Contact Details</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.name}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Subject:</span> ${data.subject}</div>
          <div class="info-row">${productsText}</div>

          <h3>Message</h3>
          <div class="message-box">
            ${data.message.replace(/\n/g, "<br>")}
          </div>

          <div class="footer">
            <p>This inquiry was submitted via the Koove Organic website contact form.</p>
            <p>Reference ID: ${refId}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a confirmation email with improved formatting
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; text-align: center; }
          .logo { max-width: 200px; margin-bottom: 15px; }
          h2 { color: #e53935; }
          .content { padding: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .reference { background-color: #f9f9f9; padding: 10px; text-align: center; margin: 15px 0; border: 1px dashed #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for contacting Koove Organic</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>We have successfully received your inquiry about "${data.subject}".</p>
            <p>Our team will review your message and get back to you as soon as possible.</p>
            
            <div class="reference">
              <p><strong>Your Reference ID:</strong> ${refId}</p>
              <p>Please use this reference in any future correspondence about this inquiry.</p>
            </div>
            
            ${data.selectedProducts && data.selectedProducts.length > 0
        ? `<p><strong>Products you expressed interest in:</strong><br>${data.selectedProducts.join(", ")}</p>`
        : ""
      }
          </div>
          
          <div class="footer">
            <p>Regards,<br>Customer Support Team<br>Koove Organic Chemicals Pvt. Ltd.</p>
            <p>© ${new Date().getFullYear()} Koove Organic Chemicals Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send primary email to globalenquiry@rashmigroup.com only
    try {
      await transporter.sendMail({
        from: `"Koove Organic Website" <${process.env.ENQUIRY_EMAIL_USER}>`,
        to: process.env.ENQUIRY_EMAIL_USER,
        subject: `Contact Inquiry: ${data.subject} - Ref: ${refId}`,
        html: htmlContent,
        headers: {
          "X-Priority": "1", // High priority
          "X-Reference-ID": refId,
        },
      });
      console.log(
        `Contact form email sent to ${process.env.ENQUIRY_EMAIL_USER}`,
      );
    } catch (error) {
      console.error("Error sending primary contact email:", error);
      // Continue to send confirmation email even if primary email fails
    }

    // Send confirmation email to the contact with retry logic
    let confirmationSent = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!confirmationSent && attempts < maxAttempts) {
      try {
        await transporter.sendMail({
          from: `"Koove Organic Customer Support" <${process.env.ENQUIRY_EMAIL_USER}>`,
          to: data.email,
          subject: `Thank you for contacting Koove Organic - Ref: ${refId}`,
          html: confirmationHtml,
          headers: {
            "X-Reference-ID": refId,
          },
        });
        confirmationSent = true;
        console.log(`Confirmation email sent to ${data.email}`);
      } catch (error) {
        attempts++;
        console.error(
          `Error sending confirmation email (attempt ${attempts}):`,
          error,
        );

        if (attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, attempts)),
          );
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error in contact form email process:", error);
    return false;
  }
};

export const sendVendorRegistrationEmail = async (
  data: VendorFormData,
  files?: Express.Multer.File[],
): Promise<boolean> => {
  try {
    // Allow skipping emails in non-critical environments
    if (process.env.SKIP_EMAILS === "true") {
      console.log("SKIP_EMAILS=true -> skipping vendor emails");
      return true;
    }

    const transporter = createTransporter(
      process.env.PROCUREMENT_EMAIL_USER!,
      process.env.PROCUREMENT_EMAIL_PASS!,
    );

    // Use provided referenceId if present, else generate
    const refId =
      data.referenceId || `TOKEN-${uuidv4().substring(0, 8).toUpperCase()}`;
    if (!data.referenceId) data.referenceId = refId;

    const logoPath = path.join(process.cwd(), "..", "frontend", "public", "assets", "logo.png");
    const hasLogo = fs.existsSync(logoPath);
    
    const logoAttachment = hasLogo ? {
      filename: "logo.png",
      path: logoPath,
      cid: "koove_logo"
    } : null;

    const turnoverText =
      data.turnover && data.turnoverCurrency
        ? data.turnoverCurrency === "INR"
          ? `₹${data.turnover} Crores`
          : data.turnoverCurrency === "USD"
            ? `$${data.turnover} Million`
            : `${data.turnover} Million (${data.turnoverCurrency})`
        : "Not provided";

    // Create email HTML content
    const htmlContent = `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#222; line-height:1.6; font-size:14px; max-width:720px; margin:auto; border:1px solid #e5e5e5; border-radius:8px; overflow:hidden;">

    <div style="background:#0f4c81; color:#ffffff; padding:18px 24px;">
      <h2 style="margin:0; font-size:20px; font-weight:600;">
        New Vendor Registration
      </h2>
      <p style="margin:6px 0 0; font-size:13px;">
        Koove Organic Chemicals Pvt. Ltd.
      </p>
    </div>

    <div style="padding:24px;">

      <div style="background:#f4f7fb; border:1px solid #d8e3f0; border-radius:6px; padding:12px 16px; margin-bottom:20px;">
        <p style="margin:0;"><strong>Token ID:</strong> ${refId}</p>
        <p style="margin:6px 0 0;"><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <h3 style="font-size:16px; color:#0f4c81; margin:0 0 10px;">
        Contact Person Details
      </h3>

      <table style="width:100%; border-collapse:collapse; margin-bottom:22px;">
        <tr>
          <td style="padding:7px 0; color:#555; width:35%;">Name</td>
          <td style="padding:7px 0; font-weight:600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Designation</td>
          <td style="padding:7px 0;">${data.designation || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Email</td>
          <td style="padding:7px 0;">
            <a href="mailto:${data.email}" style="color:#0f4c81; text-decoration:none;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Contact Number</td>
          <td style="padding:7px 0;">${data.contactNo}</td>
        </tr>
      </table>

      <h3 style="font-size:16px; color:#0f4c81; margin:0 0 10px;">
        Company Information
      </h3>

      <table style="width:100%; border-collapse:collapse; margin-bottom:22px;">
        <tr>
          <td style="padding:7px 0; color:#555; width:35%;">Company Name</td>
          <td style="padding:7px 0; font-weight:600;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Firm Type</td>
          <td style="padding:7px 0;">${data.firmType}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Vendor Type</td>
          <td style="padding:7px 0;">${data.vendorType}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Country</td>
          <td style="padding:7px 0;">${getCountryName(data.country)}</td>
        </tr>

        ${data.address
        ? `
              <tr>
                <td style="padding:7px 0; color:#555;">Address</td>
                <td style="padding:7px 0;">${data.address}</td>
              </tr>
            `
        : ""
      }

        ${data.country === "others"
        ? `
              <tr>
                <td style="padding:7px 0; color:#555;">Custom Country</td>
                <td style="padding:7px 0;">${data.customCountry || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:7px 0; color:#555;">Custom Country Code</td>
                <td style="padding:7px 0;">${data.customCountryCode || "Not provided"}</td>
              </tr>
            `
        : ""
      }

        <tr>
          <td style="padding:7px 0; color:#555;">Website</td>
          <td style="padding:7px 0;">
            ${data.website
        ? `<a href="${data.website}" target="_blank" rel="noopener noreferrer" style="color:#0f4c81; text-decoration:none;">${data.website}</a>`
        : "Not provided"
      }
          </td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">GST Number</td>
          <td style="padding:7px 0;">${data.gstNumber || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Last Year Turnover</td>
          <td style="padding:7px 0;">${turnoverText}</td>
        </tr>
      </table>

      <h3 style="font-size:16px; color:#0f4c81; margin:0 0 10px;">
        Product / Service Information
      </h3>

      <table style="width:100%; border-collapse:collapse; margin-bottom:22px;">
        <tr>
          <td style="padding:7px 0; color:#555; width:35%;">Category</td>
          <td style="padding:7px 0; font-weight:600;">${data.category}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Product Description</td>
          <td style="padding:7px 0;">${data.productDescription}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Major Clients</td>
          <td style="padding:7px 0;">${data.majorClients || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding:7px 0; color:#555;">Attachments</td>
          <td style="padding:7px 0;">
            ${files && files.length > 0 ? `${files.length} file(s) attached` : "None"}
          </td>
        </tr>
      </table>

      <div style="background:#f8f9fa; border-left:4px solid #0f4c81; padding:12px 14px; margin-top:20px;">
        <strong>Action Required:</strong><br>
        Please review the vendor details and proceed with verification as per the procurement process.
      </div>

    </div>

    <div style="background:#f7f7f7; color:#777; font-size:12px; padding:14px 24px; border-top:1px solid #e5e5e5;">
      This is an automated notification generated from the vendor registration system.
    </div>

  </div>
`;

    // Prepare email options
    const mailOptions = {
      from: `"Koove Organic Vendor Portal" <${process.env.PROCUREMENT_EMAIL_USER}>`,
      to: process.env.PROCUREMENT_EMAIL_USER,
      subject: `New Vendor Registration: ${data.companyName} - Token ID: ${refId}`,
      html: htmlContent,
      attachments: [] as any[],
    };

    if (logoAttachment) {
      mailOptions.attachments.push(logoAttachment);
    }

    // Add file attachments if available
    if (files && files.length > 0) {
      files.forEach((file) => {
        const originalName = file.originalname;
        const lastDot = originalName.lastIndexOf(".");
        const baseName =
          lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
        const ext = lastDot !== -1 ? originalName.substring(lastDot + 1) : "";
        const safeCompany = (data.companyName || "company").replace(
          /[^a-zA-Z0-9_-]/g,
          "_",
        );
        const safeBase = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");
        const safeRef = (refId || "TOKEN").replace(/[^a-zA-Z0-9_-]/g, "_");
        const newFilename = `${safeCompany}_${safeBase}_${safeRef}${ext ? "." + ext : ""}`;
        mailOptions.attachments.push({
          filename: newFilename,
          content: file.buffer,
          contentType: file.mimetype,
        });
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    const confirmationTurnoverText =
      data.turnover && data.turnoverCurrency
        ? data.turnoverCurrency === "INR"
          ? `₹${data.turnover} Crores`
          : data.turnoverCurrency === "USD"
            ? `$${data.turnover} Million`
            : `${data.turnover} Million (${data.turnoverCurrency})`
        : "Not provided";

    // Send confirmation email to the vendor
    await transporter.sendMail({
      from: `"Koove Organic Procurement" <${process.env.PROCUREMENT_EMAIL_USER}>`,
      to: data.email,
      subject: `Vendor Registration Received`,
      html: `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#222; line-height:1.6; font-size:14px; max-width:650px; margin:auto; border:1px solid #e5e5e5; border-radius:8px; overflow:hidden;">
      
      <div style="background:#0f4c81; color:#ffffff; padding:18px 24px;">
        <h2 style="margin:0; font-size:20px; font-weight:600;">
          Vendor Registration Confirmation
        </h2>
      </div>

      <div style="padding:24px;">
        <p>Dear ${data.name},</p>

        <p>
          Thank you for registering as a vendor with 
          <strong>Koove Organic Chemicals Pvt. Ltd.</strong>
        </p>

        <p>
          We have successfully received your vendor registration application.
          Our procurement team will review the submitted details and contact you
          if any further information is required.
        </p>
        <h3 style="font-size:16px; margin-top:24px; margin-bottom:10px; color:#0f4c81;">
          Registration Summary
        </h3>

        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <tr>
            <td style="padding:8px 0; color:#555;">Company Name</td>
            <td style="padding:8px 0; font-weight:600;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#555;">Firm Type</td>
            <td style="padding:8px 0; font-weight:600;">${data.firmType}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#555;">Last Year Turnover</td>
            <td style="padding:8px 0; font-weight:600;">${confirmationTurnoverText}</td>
          </tr>
        </table>

        <div style="background:#fff8e1; border-left:4px solid #f5b400; padding:12px 14px; margin:20px 0;">
          <strong>Important Notice:</strong><br>
          Vendor registration with Koove Organic Chemicals Pvt. Ltd. is free of charge.
          We do not request any payment for registration. Please ignore and report any such payment requests.
        </div>

        <p style="margin-top:28px;">
          Regards,<br>
          <strong>Procurement Team</strong><br>
          Koove Organic Chemicals Pvt. Ltd.
        </p>
        <div style="margin-top: 15px;">
          <img src="cid:koove_logo" alt="Koove Organic Chemicals Logo" style="max-width: 220px; height: auto; display: block;">
        </div>
      </div>

      <div style="background:#f7f7f7; color:#777; font-size:12px; padding:14px 24px; border-top:1px solid #e5e5e5;">
        This is an automated confirmation email. Please do not reply to this message.
      </div>
    </div>
  `,
      attachments: logoAttachment ? [logoAttachment] : [],
    });

    return true;
  } catch (error) {
    console.error("Error sending vendor registration email:", error);
    return false;
  }
};

// New function for job application emails
export interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: string;
  applicationId?: string;
}

export const sendJobApplicationEmail = async (
  data: JobApplicationData,
  resumeFile?: Express.Multer.File,
): Promise<boolean> => {
  try {
    const transporter = createTransporter(
      process.env.HR_EMAIL_USER!,
      process.env.HR_EMAIL_PASS!,
    );

    // Generate unique reference ID for the application
    const appId =
      data.applicationId || `RMJOB-${Date.now().toString().slice(-6)}`;

    // Create email HTML content with improved formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; }
          h2 { color: #e53935; }
          h3 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #e53935; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application - Ref: ${appId}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3>Applicant Details</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Phone:</span> ${data.phone}</div>
          
          <h3>Position Information</h3>
          <div class="info-row"><span class="label">Position Applied For:</span> ${data.position}</div>
          <div class="info-row"><span class="label">Department:</span> ${data.department || "Not specified"}</div>
          <div class="info-row"><span class="label">Source:</span> ${data.source || "Not specified"}</div>
          
          <h3>Experience & Education</h3>
          <div class="info-row"><span class="label">Experience:</span></div>
          <div class="message-box">
            ${data.experience ? data.experience.replace(/\n/g, "<br>") : "Not provided"}
          </div>
          
          <div class="info-row"><span class="label">Education:</span></div>
          <div class="message-box">
            ${data.education ? data.education.replace(/\n/g, "<br>") : "Not provided"}
          </div>
          
          <h3>Cover Letter</h3>
          <div class="message-box">
            ${data.coverLetter ? data.coverLetter.replace(/\n/g, "<br>") : "Not provided"}
          </div>
          
          <div class="info-row"><span class="label">Resume:</span> ${data.resumeUrl ? `<a href="${data.resumeUrl}" target="_blank">View Resume</a>` : "Not provided"}</div>

          <div class="footer">
            <p>This application was submitted via the Koove Organic careers page.</p>
            <p>Reference ID: ${appId}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a confirmation email with improved formatting
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; text-align: center; }
          .logo { max-width: 200px; margin-bottom: 15px; }
          h2 { color: #e53935; }
          .content { padding: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .reference { background-color: #f9f9f9; padding: 10px; text-align: center; margin: 15px 0; border: 1px dashed #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for your application to Koove Organic</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.firstName} ${data.lastName},</p>
            <p>We have successfully received your application for the <strong>${data.position}</strong> position.</p>
            <p>Our HR team will review your qualifications and will contact you if your profile matches our requirements.</p>
            
            <div class="reference">
              <p><strong>Your Application Reference ID:</strong> ${appId}</p>
              <p>Please use this reference in any future correspondence about this application.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Regards,<br>Human Resources Team<br>Koove Organic Chemicals Pvt. Ltd.</p>
            <p>© ${new Date().getFullYear()} Koove Organic Chemicals Pvt. Ltd. All rights reserved.</p>
            <p><small>Please note that this is an automated response. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send primary email to globalhr@rashmigroup.com only
    const mailOptions = {
      from: `"Koove Organic Careers" <${process.env.HR_EMAIL_USER}>`,
      to: process.env.HR_EMAIL_USER,
      subject: `Job Application: ${data.position} - ${data.firstName} ${data.lastName} - Ref: ${appId}`,
      html: htmlContent,
      attachments: [] as any[],
    };

    // Add resume as attachment if available
    if (resumeFile) {
      mailOptions.attachments.push({
        filename: `${data.firstName}_${data.lastName}_Resume.${resumeFile.originalname.split(".").pop()}`,
        content: resumeFile.buffer,
        contentType: resumeFile.mimetype,
      });
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Job application email sent to ${process.env.HR_EMAIL_USER} - Ref: ${appId}`,
      );
      console.log("SMTP Response:", {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      });
    } catch (error) {
      console.error(
        `Error sending HR application email - Ref: ${appId}:`,
        error,
      );
      // Continue to send confirmation email even if HR email fails
    }

    // Send confirmation email to the applicant with retry logic
    let confirmationSent = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!confirmationSent && attempts < maxAttempts) {
      try {
        await transporter.sendMail({
          from: `"Koove Organic HR" <${process.env.HR_EMAIL_USER}>`,
          to: data.email,
          subject: `Your Application for ${data.position} - Ref: ${appId}`,
          html: confirmationHtml,
          headers: {
            "X-Reference-ID": appId,
          },
        });
        confirmationSent = true;
        console.log(`Application confirmation email sent to ${data.email}`);
      } catch (error) {
        attempts++;
        console.error(
          `Error sending application confirmation email (attempt ${attempts}):`,
          error,
        );

        if (attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, attempts)),
          );
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error in job application email process:", error);
    return false;
  }
};
