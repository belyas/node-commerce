import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

import UserModel from '../../models/user';

export default class Auth {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Something went wrong.', user });
            }

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                return res.status(401).json({ error: 'Something went wrong.' });
            }

            const token = jwt.sign(
                {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    userId: user._id.toString(),
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({ token, userId: user._id.toString() });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static checkUserStatus(req, res) {
        res.status(200).json({ success: true });
    }

    static async signup(req, res) {
        const { firstname, lastname, email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });

            if (user) {
                return res
                    .status(200)
                    .json({ error: 'You cannot create this account!' });
            }

            const lengthRange = { min: 3, max: 30 };
            // validate fields
            if (
                validator.isEmpty(firstname) ||
                !validator.isAlpha(firstname) ||
                !validator.isLength(firstname, lengthRange)
            ) {
                return res.status(401).json({ error: 'Invalid first name!' });
            }

            if (
                validator.isEmpty(lastname) ||
                !validator.isAlpha(lastname) ||
                !validator.isLength(lastname, lengthRange)
            ) {
                return res.status(401).json({ error: 'Invalid last name!' });
            }

            if (!validator.isEmail(email) || validator.isEmpty(email)) {
                return res
                    .status(401)
                    .json({ error: 'Invalid email address!' });
            }

            if (
                validator.isEmpty(password) ||
                !password.match(/^[a-zA-Z0-9]{3,30}$/)
            ) {
                return res.status(401).json({
                    error:
                        'Invalid password, please use only letters and numbers!',
                });
            }

            try {
                const genSalt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, genSalt);
                const userObj = new UserModel({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                });

                const savedUser = await userObj.save();

                if (savedUser) {
                    return res
                        .status(201)
                        .json({ success: true, error: false });
                }

                res.status(401).json({
                    error: 'Ooops! could not save your data!',
                });
            } catch (err) {
                req.flash('error', err);
                res.redirect(AUTH_ROUTE_SIGNUP);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
