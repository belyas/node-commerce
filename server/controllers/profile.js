import bcrypt from 'bcryptjs';
import User from '../models/user';

export default class Profile {
    static profile (req, res) {
        res.render('profile/index', {
            title: 'Edit profile'
        });
    }

    static updateProfile (req, res) {

    }
}
