const nodemailer = require('nodemailer');
const config = require('../config/env');

let transporter;
if (config.email.user && config.email.pass) {
  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
} else {
  console.warn('Email credentials not set. Email sending disabled.');
  transporter = null;
}

const sendContactNotification = async (contact, type = 'general') => {
  if (!transporter) {
    console.log(`[${type}] New contact:`, contact);
    return;
  }

  const subject = type === 'consultation' ? 'New Consultation Request' : 
                  type === 'question' ? 'New Question from Website' : 'New Contact Form Submission';
  const text = `Type: ${type}\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\nMessage: ${contact.message}`;
  const mailOptions = {
    from: config.email.from,
    to: config.email.from,
    subject,
    text,
    replyTo: contact.email,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

module.exports = { sendContactNotification };