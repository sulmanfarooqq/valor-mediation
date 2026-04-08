const { Contact } = require('../../models');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['id', 'DESC']] });
    res.render('admin/contacts', { title: 'Contact Messages', contacts, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};

exports.getContactDetail = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      req.flash('error', 'Contact not found');
      return res.redirect('/admin/contacts');
    }
    res.render('admin/contact-detail', { title: 'View Message', contact, user: req.user });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading contact');
    res.redirect('/admin/contacts');
  }
};

exports.postDeleteContact = async (req, res) => {
  try {
    await Contact.destroy({ where: { id: req.params.id } });
    req.flash('success', 'Message deleted successfully');
    res.redirect('/admin/contacts');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting message');
    res.redirect('/admin/contacts');
  }
};