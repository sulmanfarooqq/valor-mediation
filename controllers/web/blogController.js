const { Blog, User } = require('../../models');

exports.getBlogIndex = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      order: [['publishedAt', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['name'] }],
    });
    res.render('blog/index', {
      title: 'Mediation Blog | Insights & Resources | Valor Mediation, LLC',
      metaDescription: 'Read our blog for insights on mediation, dispute resolution, and conflict management.',
      blogs,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      where: { slug, status: 'published' },
      include: [{ model: User, as: 'author', attributes: ['name'] }],
    });
    if (!blog) {
      return res.status(404).render('404', { title: 'Post Not Found' });
    }
    res.render('blog/single', {
      title: blog.metaTitle || blog.title,
      metaDescription: blog.metaDescription || blog.excerpt || '',
      blog,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};