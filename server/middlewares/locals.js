import { formatStringDate } from '../utils/date';
import { ltrim, capitalize } from '../utils/string';

export default (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    const _token = req.csrfToken();
    res.locals.csrfToken = _token;
    res.cookie('CSRF-TOKEN', _token);

    let errMessage = req.flash('error');
    res.locals.errorMessage = errMessage.length ? errMessage[0] : null;
    let successMessage = req.flash('success');
    res.locals.successMessage = successMessage.length ? successMessage[0] : null;

    res.locals.formatStringDate = formatStringDate;
    res.locals.ltrim = ltrim;
    res.locals.capitalize = capitalize;

    next();
};
