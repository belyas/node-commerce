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
        const validUser = await User.login({email, password});
        console.log(req.body, validUser);
        // res.render('auth/login', {
        //     title: 'Login',
        //     currentPath: req.baseUrl
        // });
        next();
    }
}
