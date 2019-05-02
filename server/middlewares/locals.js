export default (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();

    let errMessage = req.flash('error');
    res.locals.errorMessage = errMessage.length ? errMessage[0] : null;
    let successMessage = req.flash('success');
    res.locals.successMessage = successMessage.length ? successMessage[0] : null;

    next();
};
