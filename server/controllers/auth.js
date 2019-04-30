import bcrypt from 'bcryptjs';
import User from '../models/user';

export default class Auth {
    static login (req, res) {
        res.render('auth/login', {
            title: 'Login',
            currentPath: req.baseUrl
        });
    }

    static async postLogin (req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/auth/login');
            }

            try {
                const passwordMatched = await bcrypt.compare(password, user.password);

                if (passwordMatched) {
                    req.session.isLoggedIn = true;
                    delete user.password;
                    req.session.user = user;

                    return req.session.save(err => {
                        if (err) {
                            throw new Error(err);
                        }

                        res.redirect('/');
                    });
                }

                req.flash('error', 'Invalid email or password.');
                res.redirect('/auth/login');
            } catch (error) {
                console.log('[Bcrypt::compare]', error);
                req.flash('error', error.message);
                res.redirect('/auth/login');
            }
        } catch (error) {
            req.flash('error', error);
            res.redirect('/auth/login');
        }
    }

    static logout (req, res) {
        return req.session.destroy(err => {
            if (err) {
                throw new Error(err);
            }

            res.redirect('/');
        });
    }
}
