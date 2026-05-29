import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config({ path: path.join(__dirname, "../../.env") });

const run = async () => {
  console.log("Testing Email Configuration...");
  console.log(`User: ${process.env.HR_EMAIL_USER}`);
  console.log(`Host: ${process.env.EMAIL_HOST}`);

  if (!process.env.HR_EMAIL_PASS) {
    console.error("Error: HR_EMAIL_PASS is missing!");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.office365.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.HR_EMAIL_USER,
      pass: process.env.HR_EMAIL_PASS,
    },
    requireTLS: true,
  });

  try {
    console.log("Attempting to send mail...");
    const info = await transporter.sendMail({
      from: process.env.HR_EMAIL_USER,
      to: process.env.HR_EMAIL_USER, // Send to self
      subject: "Test Email from Server Debug Script",
      text: "If you receive this, the SMTP configuration is working correctly.",
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

run();
