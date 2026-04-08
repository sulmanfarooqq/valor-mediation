const { Blog } = require('../../models');

exports.getBlogIndex = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .populate('author', 'name');
      
    res.render('blog/index', {
      title: 'Mediation Blog | Insights & Resources | Valor Mediation, LLC',
      metaDescription: 'Read our blog for insights on mediation, dispute resolution, and conflict management.',
      blogs,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: 'published' })
      .populate('author', 'name');
      
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
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};