const { Page } = require('../../models');

exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.render('admin/pages/index', { title: 'Manage Pages', pages, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};

exports.getEditPage = async (req, res) => {
  try {
    const page = req.params.id === 'new' ? null : await Page.findById(req.params.id);
    res.render('admin/pages/edit', { title: page ? 'Edit Page' : 'Create Page', page, user: req.user });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading page');
    res.redirect('/admin/pages');
  }
};

exports.postCreatePage = async (req, res) => {
  try {
    const { title, content, metaTitle, metaDescription } = req.body;
    await Page.create({ title, content, metaTitle, metaDescription, lastUpdatedBy: req.user._id });
    req.flash('success', 'Page created successfully');
    res.redirect('/admin/pages');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating page');
    res.redirect('/admin/pages/edit/new');
  }
};

exports.postUpdatePage = async (req, res) => {
  try {
    const { title, content, metaTitle, metaDescription } = req.body;
    await Page.findByIdAndUpdate(req.params.id, {
      title,
      content,
      metaTitle,
      metaDescription,
      lastUpdatedBy: req.user._id
    });
    req.flash('success', 'Page updated successfully');
    res.redirect('/admin/pages');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating page');
    res.redirect(`/admin/pages/edit/${req.params.id}`);
  }
};

exports.postDeletePage = async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    req.flash('success', 'Page deleted successfully');
    res.redirect('/admin/pages');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting page');
    res.redirect('/admin/pages');
  }
};