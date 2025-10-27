const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Send contact message
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('subject').notEmpty().trim(),
  body('message').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // In a real application, you would send an email here
    // For demo purposes, we'll just log it and return success
    
    console.log('Contact Form Submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending (replace with actual nodemailer code)
    // const transporter = nodemailer.createTransporter({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    // await transporter.sendMail({
    //   from: email,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `Church Contact: ${subject}`,
    //   html: `
    //     <h3>New Contact Message</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // });

    res.json({ 
      message: 'Message sent successfully! We will get back to you soon.',
      success: true 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Error sending message. Please try again later.',
      success: false 
    });
  }
});

module.exports = router;