import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { ContactFormData } from "../types/contact";

console.log("DEBUG: contactUsService module loaded");

/** Prefer ENQUIRY_*; fall back to EMAIL_USER / EMAIL_PASS so .env matches docs. */
function getEnquirySmtpCredentials(): { user: string; pass: string } {
  const user = (process.env.ENQUIRY_EMAIL_USER || process.env.EMAIL_USER || "").trim();
  const pass = (process.env.ENQUIRY_EMAIL_PASS || process.env.EMAIL_PASS || "").trim();
  return { user, pass };
}

// Create email transporter strictly for General Inquiries
const createTransporter = () => {
  const { user, pass } = getEnquirySmtpCredentials();

  if (!user || !pass) {
    console.error(
      "General Inquiry Email configuration missing: set ENQUIRY_EMAIL_USER + ENQUIRY_EMAIL_PASS (or EMAIL_USER + EMAIL_PASS)",
    );
    throw new Error("Email service safely blocked: Credentials not configured");
  }

  const smtpConfig = {
    host: process.env.EMAIL_HOST || "smtp.office365.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: { user, pass },
    requireTLS: true,
    pool: false, // Ensures a clean socket pipe for each transmission
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(smtpConfig);
};

export const sendContactUsEmail = async (
  data: ContactFormData,
): Promise<boolean> => {
  try {
    const creds = getEnquirySmtpCredentials();
    if (!creds.user || !creds.pass) {
      console.error(
        "Contact form: set ENQUIRY_EMAIL_USER + ENQUIRY_EMAIL_PASS (or EMAIL_USER + EMAIL_PASS)",
      );
      return false;
    }
    const transporter = createTransporter();
    // Generate secure reference ID for the UI and tracking
    const refId = `RMQ-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Fallback if organization is passed via subject from frontend (Subject - Organization)
    let displaySubject = data.subject || "General Inquiry";
    let organization = "Not Provided";

    // We mapped Organization -> Subject on the frontend, extract it nicely
    if (displaySubject.includes(' - ')) {
      const parts = displaySubject.split(' - ');
      organization = parts.pop() || "Not Provided";
      displaySubject = parts.join(' - ');
    }

    // Modern HTML Mailer Template for the Office Inbox
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f5f5; color: #1c1f1e; }
          .wrapper { width: 100%; min-height: 100vh; padding: 40px 20px; box-sizing: border-box; background-color: #f4f5f5; }
          .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(4,120,87,0.08); border: 1px solid #e1dfda; }
          
          /* Header */
          .header { background-color: #047857; color: #ffffff; padding: 30px 40px; text-align: left; position: relative; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -0.5px; }
          .header .token { position: absolute; top: 32px; right: 40px; background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 12px; letter-spacing: 1px; color: #d1fae5; }
          
          /* Content Body */
          .content { padding: 40px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
          .meta-item { border-bottom: 1px solid #f0efea; padding-bottom: 12px; }
          .label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8a908e; margin-bottom: 6px; font-weight: 600; }
          .value { display: block; font-size: 15px; color: #1c1f1e; font-weight: 500; }
          .value a { color: #047857; text-decoration: none; }
          
          /* Payload Box */
          .payload-box { background-color: #f9f9f8; border-left: 4px solid #047857; padding: 24px; border-radius: 0 8px 8px 0; margin-top: 20px; font-size: 15px; line-height: 1.6; color: #4a504e; white-space: pre-wrap; }
          
          /* Footer */
          .footer { background-color: #1c1f1e; color: #8a908e; padding: 24px 40px; text-align: center; font-size: 12px; }
          .footer p { margin: 4px 0; }
          .footer strong { color: #d1cfc9; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <table class="container" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td class="header" style="background-color: #047857; padding: 30px 40px; color: white;">
                <table width="100%">
                  <tr>
                     <td align="left"><h1 style="margin: 0; font-weight: 300;">Digital Inbox Transmission</h1></td>
                     <td align="right"><span style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #d1fae5;">REF: ${refId}</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="content" style="padding: 40px;">
                <p style="margin: 0 0 30px 0; color: #8a908e; font-size: 14px;">A new direct inquiry has been generated via the Contact Us portal from <strong style="color: #047857;">${data.name}</strong>.</p>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                  <tr>
                    <td width="50%" valign="top" style="padding-bottom: 20px; border-bottom: 1px solid #f0efea;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 4px;">Transmitter Name</span>
                      <strong style="font-size: 15px; color: #1c1f1e;">${data.name}</strong>
                    </td>
                    <td width="50%" valign="top" style="padding-bottom: 20px; border-bottom: 1px solid #f0efea;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 4px;">Corporate Entity</span>
                      <strong style="font-size: 15px; color: #1c1f1e;">${organization}</strong>
                    </td>
                  </tr>
                    <td width="50%" valign="top" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0efea;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 4px;">Reply-To Email</span>
                      <a href="mailto:${data.email}" style="font-size: 15px; color: #047857; text-decoration: none; font-weight: bold;">${data.email}</a>
                    </td>
                    <td width="50%" valign="top" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0efea;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 4px;">Phone Number</span>
                      <strong style="font-size: 15px; color: #1c1f1e;">${data.phone || 'Not Provided'}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0efea;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 4px;">Timestamp</span>
                      <span style="font-size: 15px; color: #1c1f1e;">${new Date().toLocaleString()}</span>
                    </td>
                  </tr>
                </table>

                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a908e; margin-bottom: 10px;">Encrypted Payload (Message)</span>
                <div style="background-color: #f9f9f8; border-left: 4px solid #047857; padding: 24px; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; color: #4a504e;">
                  ${data.message.replace(/\n/g, "<br>")}
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer" style="background-color: #1c1f1e; color: #8a908e; padding: 24px; text-align: center; font-size: 12px;">
                <p>This automated transmission was strictly generated by the <strong>Koove Organic</strong> corporate firewall.</p>
                <p>System Token ID: ${refId}</p>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    // Modern HTML Auto-Responder
    const confirmationHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background-color: #f9f9f9; color: #333333;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table max-width="600" width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding: 40px; text-align: center; border-bottom: 1px solid #eeeeee;">
                    <h2 style="margin: 0; color: #047857; font-weight: 300; font-size: 28px;">Thank You for Contacting Us</h2>
                    <p style="margin: 15px 0 0 0; color: #666666; font-size: 16px;">Your message has been received and is being processed.Our team has received your inquiry and will get back to you as soon as possible.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #555555;">Our digital reception desk has successfully picked up your inquiry regarding <strong>${displaySubject}</strong>.</p>  
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #555555;">Your message <strong>${data.message}</strong></p>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #555555;">For urgent assistance, please contact us directly at <a href="mailto:globalenquiry@rashmigroup.com">globalenquiry@rashmigroup.com</a> or call us at +91 33 2269 0730.</p>
                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #555555;">A representative from our network will evaluate your payload and communicate back with you very shortly.</p>
                </td>
                </tr>
                <tr>
                  <td style="background-color: #1c1f1e; color: #8a908e; padding: 30px; text-align: center; font-size: 12px;">
                    <p style="margin: 0 0 10px 0;">Regards,<br><strong>Koove Organic Team</strong></p>
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Koove Organic Chemicals Pvt. Ltd. All rights reserved.</p>
                    <p style="margin: 0 0 10px 0;">Koove Organic is a division of Rashmi Metaliks Ltd.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 1. Send Primary Email
    try {
      await transporter.sendMail({
        from: `"Koove Organic Contact" <${creds.user}>`,
        to: creds.user,
        subject: `${displaySubject} - ${refId}`,
        html: htmlContent,
        headers: { "X-Priority": "1", "X-Reference-ID": refId },
      });
      console.log(`General Contact primary email dispatched - Ref: ${refId}`);
    } catch (error) {
      console.error("Critical error dispatching primary contact email:", error);
      return false; // Halt transmission and return failure
    }

    // 2. Send Auto-Responder (Asynchronously so we don't block the frontend user)
    const fireConfirmation = async () => {
      let confirmationSent = false;
      let attempts = 0;
      while (!confirmationSent && attempts < 3) {
        try {
          await transporter.sendMail({
            from: `"Koove Organic" <${creds.user}>`,
            to: data.email,
            subject: `Transmission Received. - Ref: ${refId}`,
            html: confirmationHtml,
            headers: { "X-Reference-ID": refId },
          });
          confirmationSent = true;
          console.log(`Auto-responder confirmed delivery to ${data.email}`);
        } catch (error) {
          attempts++;
          console.error(`Auto-responder bounce (attempt ${attempts}):`, error);
          if (attempts < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
          }
        }
      }
    };

    // Trigger in backround
    fireConfirmation().catch(e => console.error("Fatal auto-responder error:", e));

    return true;
  } catch (error) {
    console.error("General Inquiry mailing service system failure:", error);
    return false;
  }
};
