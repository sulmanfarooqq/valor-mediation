const { Blog, Page, Contact } = require('../../models');

exports.getDashboard = async (req, res) => {
  try {
    const blogCount = await Blog.count();
    const pageCount = await Page.count();
    const contactCount = await Contact.count();
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      blogCount,
      pageCount,
      contactCount,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};