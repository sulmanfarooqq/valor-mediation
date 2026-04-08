const { Blog } = require('../../models');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('admin/blogs/index', { title: 'Manage Blogs', blogs, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Server Error' });
  }
};

exports.getCreateBlog = (req, res) => {
  res.render('admin/blogs/create', { title: 'Create Blog', blog: null, user: req.user });
};

exports.postCreateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, status, metaTitle, metaDescription } = req.body;
    await Blog.create({
      title,
      content,
      excerpt,
      status,
      metaTitle,
      metaDescription,
      author: req.user._id,
    });
    req.flash('success', 'Blog created successfully');
    res.redirect('/admin/blogs');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating blog');
    res.redirect('/admin/blogs/create');
  }
};

exports.getEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      req.flash('error', 'Blog not found');
      return res.redirect('/admin/blogs');
    }
    res.render('admin/blogs/edit', { title: 'Edit Blog', blog, user: req.user });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading blog');
    res.redirect('/admin/blogs');
  }
};

exports.postUpdateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, status, metaTitle, metaDescription } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
      excerpt,
      status,
      metaTitle,
      metaDescription,
    });
    req.flash('success', 'Blog updated successfully');
    res.redirect('/admin/blogs');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating blog');
    res.redirect(`/admin/blogs/edit/${req.params.id}`);
  }
};

exports.postDeleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash('success', 'Blog deleted successfully');
    res.redirect('/admin/blogs');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting blog');
    res.redirect('/admin/blogs');
  }
};