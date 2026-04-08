const { Contact } = require('../../models');
const emailService = require('../../services/email');

exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact Valor Mediation, LLC | Online Mediation Services via Zoom',
    metaDescription: 'Get in touch with Valor Mediation, LLC for confidential, professional mediation services across Texas.',
    user: req.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
};

exports.postConsultation = async (req, res) => {
  try {
    const { name, email, phone, preferredTime, message } = req.body;
    await Contact.create({
      name,
      email,
      phone,
      subject: 'Consultation Request',
      message: `${message}\nPreferred Time: ${preferredTime}`,
      mediumType: 'consultation',
      status: 'new',
    });
    
    await emailService.sendContactNotification({ 
      name, 
      email, 
      phone, 
      message: `Consultation Request: ${message}` 
    }, 'consultation');
    
    req.flash('success', 'Your consultation request has been sent. We will contact you shortly.');
    res.redirect('/contact');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
};

exports.postQuestion = async (req, res) => {
  try {
    const { name, email, question } = req.body;
    await Contact.create({
      name,
      email,
      subject: 'Question',
      message: question,
      mediumType: 'question',
      status: 'new',
    });
    
    await emailService.sendContactNotification({ 
      name, 
      email, 
      message: question 
    }, 'question');
    
    req.flash('success', 'Your question has been sent. We will get back to you soon.');
    res.redirect('/contact');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
};