import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
}
