const { Setting } = require('../../models');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({ key: 'general' });
    const settingsValue = settings ? settings.value : {};
    res.render('admin/settings', { title: 'Site Settings', settings: settingsValue, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Server Error' });
  }
};

exports.postSettings = async (req, res) => {
  try {
    const { siteName, phone, email, address } = req.body;
    await Setting.findOneAndUpdate(
      { key: 'general' },
      { value: { siteName, phone, email, address } },
      { upsert: true, new: true }
    );
    req.flash('success', 'Settings saved successfully');
    res.redirect('/admin/settings');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error saving settings');
    res.redirect('/admin/settings');
  }
};