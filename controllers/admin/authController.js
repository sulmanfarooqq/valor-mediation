const passport = require('passport');

exports.getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { title: 'Admin Login', error: req.flash('error') });
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin/login',
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/admin/dashboard');
    }
    res.redirect('/admin/login');
  });
};