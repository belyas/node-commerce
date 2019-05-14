import bcrypt from 'bcryptjs';
import validator from 'validator';
import UserModel from '../../models/user';

const AUTH_ROUTE_LOGIN = '/auth/login';
const AUTH_ROUTE_SIGNUP = '/auth/signup';

export default class Auth {
    static login (req, res) {
        res.render('auth/login', {
            title: 'Login',
            currentPath: req.baseUrl,
            signup: false
        });
    }

    static async postLogin (req, res) {
        const { email, password } = req.body;
        // validate email|password
        if (!validator.isEmail(email) || validator.isEmpty(email) ||
            validator.isEmpty(password) || !password.match(/^[a-zA-Z0-9]{4,30}$/)) {
            req.flash('error', 'Please enter a valid email & password');
            res.redirect(AUTH_ROUTE_LOGIN);
        }

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect(AUTH_ROUTE_LOGIN);
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

                        req.flash('success', 'You have been successfully logged in.');
                        res.redirect('/');
                    });
                }

                req.flash('error', 'Invalid email or password.');
                res.redirect(AUTH_ROUTE_LOGIN);
            } catch (err) {
                req.flash('error', err);
                res.redirect(AUTH_ROUTE_LOGIN);
            }
        } catch (err) {
            req.flash('error', err);
            res.redirect(AUTH_ROUTE_LOGIN);
        }
    }

    static signup (req, res) {
        res.render('auth/login', {
            title: 'Signup',
            currentPath: req.baseUrl,
            signup: true
        });
    }

    static async postSignup (req, res) {
        const { firstname, lastname, email, password } = req.body;
        const lengthRange = { min: 4, max: 30 };

        // validate fields
        if (validator.isEmpty(firstname) || !validator.isAlpha(firstname) ||
            !validator.isLength(firstname, lengthRange)) {
            req.flash('error', 'Invalid first name');
            res.redirect(AUTH_ROUTE_SIGNUP);
        }

        if (validator.isEmpty(lastname) || !validator.isAlpha(lastname) ||
            !validator.isLength(lastname, lengthRange)) {
            req.flash('error', 'Invalid last name');
            res.redirect(AUTH_ROUTE_SIGNUP);
        }

        if (!validator.isEmail(email) || validator.isEmpty(email)) {
            req.flash('error', 'Invalid email');
            res.redirect(AUTH_ROUTE_SIGNUP);
        }

        if (validator.isEmpty(password) || !password.match(/^[a-zA-Z0-9]{4,30}$/)) {
            req.flash('error', 'Invalid password');
            res.redirect(AUTH_ROUTE_SIGNUP);
        }

        try {
            const user = await UserModel.findOne({ email });

            if (user) {
                req.flash('error', 'Invalid email.');
                return res.redirect(AUTH_ROUTE_SIGNUP);
            }

            try {
                const genSalt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, genSalt);
                const userObj = new UserModel({
                    firstname,
                    lastname,
                    email,
                    password: hash
                });

                const savedUser = await userObj.save();

                if (savedUser) {
                    req.session.isLoggedIn = true;
                    delete savedUser.password;
                    req.session.user = savedUser;

                    return req.session.save(err => {
                        if (err) {
                            throw new Error(err);
                        }

                        res.redirect('/');
                    });
                }

                req.flash('error', 'Ooops! could not save your data.');
                res.redirect(AUTH_ROUTE_SIGNUP);
            } catch (err) {
                req.flash('error', err);
                res.redirect(AUTH_ROUTE_SIGNUP);
            }
        } catch (err) {
            req.flash('error', err);
            res.redirect(AUTH_ROUTE_SIGNUP);
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
