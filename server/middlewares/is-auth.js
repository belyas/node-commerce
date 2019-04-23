module.exports = (req, res, next) => {
    if (false) {
        return res.redirect('/');
    }

    next();
}