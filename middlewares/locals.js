const parseErrorMessage = (req) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    return message;
}

exports.resLocals = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.csrfToken = req.csrfToken();
    res.locals.errorMessage = parseErrorMessage(req);
    next();
}