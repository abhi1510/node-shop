exports.getIndex = (req, res, next) => {
    return res.render('index', {
        pageTitle: 'Home',
        path: '/'
    });
}