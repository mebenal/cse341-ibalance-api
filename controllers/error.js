exports.get404 = (req, res, next) => {
  res
    .status(404)
    .json({
      pageTitle: 'Page Not Found',
      path: '/404',
      url: req.url
    });
};

exports.get500 = (req, res, next) => {
  res
    .status(500)
    .json({
      pageTitle: 'Error!',
      path: '/500',
    });
};
