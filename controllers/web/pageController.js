const { Page } = require('../../models');

exports.getPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ where: { slug } });
    if (!page) {
      return res.status(404).render('404', { title: 'Page Not Found' });
    }
    res.render('page', {
      title: page.metaTitle || page.title,
      metaDescription: page.metaDescription || '',
      page,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};