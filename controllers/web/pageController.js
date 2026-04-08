const { Page } = require('../../models');

exports.getPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug, status: 'published' });
    
    if (!page) {
      return res.status(404).render('404', { title: 'Page Not Found', user: req.user });
    }
    
    res.render('page', {
      title: page.metaTitle || page.title,
      metaDescription: page.metaDescription || '',
      page,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};