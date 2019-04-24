export default (req, res, next) => {
    if (true) {
        return res.redirect('/');
    }

    next();
}