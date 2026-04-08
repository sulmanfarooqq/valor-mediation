const { Resend } = require('resend');
const config = require('../config/env');

const resend = new Resend(config.resend.apiKey);

/**
 * Send contact notification email using Resend
 * @param {Object} contact - The contact object
 * @param {string} type - Type of submission (general, consultation, question)
 */
const sendContactNotification = async (contact, type = 'general') => {
  if (!config.resend.apiKey) {
    console.warn('⚠️  Resend API Key not set. Email sending skipped.');
    console.log(`[${type}] New contact data:`, contact);
    return;
  }

  const subject = type === 'consultation' ? 'New Consultation Request' : 
                  type === 'question' ? 'New Question from Website' : 'New Contact Form Submission';
  
  const html = `
    <h2>${subject}</h2>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${contact.message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const data = await resend.emails.send({
      from: config.email.from,
      to: config.adminEmail || config.email.from,
      subject: subject,
      html: html,
      reply_to: contact.email,
    });
    
    console.log('✅ Email sent successfully via Resend:', data.id);
  } catch (error) {
    console.error('❌ Resend email sending failed:', error.message);
  }
};

module.exports = { sendContactNotification };