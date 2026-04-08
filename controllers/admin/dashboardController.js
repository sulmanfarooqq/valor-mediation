const { Blog, Page, Contact } = require('../../models');

exports.getDashboard = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const pageCount = await Page.countDocuments();
    const contactCount = await Contact.countDocuments();
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      blogCount,
      pageCount,
      contactCount,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};