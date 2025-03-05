module.exports = {
  ensureAuthenticated: (req, res, next) => {
    console.log('Session:', req.session);
    if (req.session.userId) {
      return next();
    }
    res.redirect('/login');
  },
};