/**
 * PORTFOLIO BACKEND API
 * =====================
 * This Express server handles the contact form submissions and email sending
 * using Nodemailer with Gmail SMTP configuration.
 * 
 * Features:
 * - POST /send-email endpoint for contact form submissions
 * - CORS enabled for frontend communication
 * - Environment-based configuration
 * - Error handling and validation
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

/**
 * MIDDLEWARE SETUP
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * CONFIGURATION
 * Get email credentials from environment variables
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a .env file in the server directory with:
 *    EMAIL_USER=your-gmail@gmail.com
 *    EMAIL_PASSWORD=your-app-specific-password
 *    RECIPIENT_EMAIL=your-email@example.com
 * 
 * 2. To get Gmail App Password:
 *    - Enable 2FA on your Google account
 *    - Go to myaccount.google.com/apppasswords
 *    - Select Mail and Windows (or your device)
 *    - Copy the 16-character password
 *    - Use this in EMAIL_PASSWORD
 */
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

/**
 * NODEMAILER TRANSPORTER
 * Configured for Gmail SMTP
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates for development
  }
});

/**
 * ROUTES
 */

/**
 * GET / - Health Check
 * Returns server status
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running',
    endpoints: {
      sendEmail: 'POST /send-email'
    }
  });
});

/**
 * POST /send-email
 * Handles contact form submissions
 * 
 * Expected body:
 * {
 *   name: string (required)
 *   email: string (required)
 *   message: string (required)
 * }
 * 
 * Response:
 * Success: { success: true, message: 'Email sent successfully' }
 * Error: { success: false, error: 'Error description' }
 */
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required',
      });
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    // LOG INCOMING REQUEST (for debugging)
    console.log(`📨 New contact form submission:
      From: ${name} <${email}>
      Message: ${message.substring(0, 50)}...`);

    /**
     * PRODUCTION EMAIL SENDING
     * Uncomment the block below to enable real email sending
     * Make sure your .env file has EMAIL_USER, EMAIL_PASSWORD, and RECIPIENT_EMAIL configured
     */
    const mailOptions = {
      from: `"${name}" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6938EF;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #888; font-size: 12px; text-align: center;">
            Reply to this email to contact ${name}
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    };

    // SEND EMAIL
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });

    /*
    /**
     * DEVELOPMENT MODE - MOCK RESPONSE
     * In production, comment out this block and uncomment the real email sending above
     */
    console.log('✅ [DEMO MODE] Email would be sent successfully');
    res.json({
      success: true,
      message: 'Email submitted successfully (Demo Mode)',
      data: { name, email, message }
    });
    

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * 404 - NOT FOUND
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

/**
 * ERROR HANDLING MIDDLEWARE
 */
app.use((err, req, res, next) => {
  console.error('🔴 Unhandled Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
});

/**
 * SERVER STARTUP
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║    Portfolio Backend API                  ║
║    🚀 Server running on port ${PORT}      ║
║    📧 Email endpoint: POST /send-email    ║
╚═══════════════════════════════════════════╝
  `);

  // CHECK IF ENV VARIABLES ARE SET
  if (!EMAIL_USER || !EMAIL_PASSWORD || !RECIPIENT_EMAIL) {
    console.warn(`
⚠️  WARNING: Email configuration incomplete
    Create a .env file with:
    - EMAIL_USER=your-gmail@gmail.com
    - EMAIL_PASSWORD=your-app-password
    - RECIPIENT_EMAIL=recipient@example.com
    
    Running in DEMO MODE - emails will not be sent
    `);
  } else {
    console.log('✅ Email configuration found - Ready to send emails');
  }
});
