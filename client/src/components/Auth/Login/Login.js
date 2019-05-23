import React, { useState } from 'react';

import { concatClasses } from '../../../utils/helpers';
import styles from './Login.module.css';

const Login = () => {
    let [isLogin, setLogin] = useState(true);
    let hideForm = { display: 'none' };
    const toggleLoginHandler = () => {
        setLogin(!isLogin);
    };

    return (
        <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
            <div className={concatClasses(styles.autoMg, styles.formContent)}>
                <form action="#" method="POST" style={isLogin ? {} : hideForm}>
                    <h2
                        className={concatClasses(
                            styles.fadeIn,
                            styles.first,
                            styles.formTitle
                        )}>
                        Login
                    </h2>
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.second)}
                        name="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        type="password"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="button"
                        className={concatClasses(styles.fadeIn, styles.fourth)}
                        value="Log In"
                    />
                </form>

                <form action="#" method="POST" style={isLogin ? hideForm : {}}>
                    <h2
                        className={concatClasses(
                            styles.fadeIn,
                            styles.first,
                            styles.formTitle
                        )}>
                        Signup
                    </h2>
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.second)}
                        name="firstname"
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.second)}
                        name="lastname"
                        placeholder="Last name"
                        required
                    />
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        type="password"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="button"
                        className={concatClasses(styles.fadeIn, styles.fourth)}
                        value="Register"
                    />
                </form>

                <div className={concatClasses(styles.formFooter)}>
                    <a
                        href="#/"
                        className={concatClasses(
                            styles.underlineHover,
                            styles.switchSignup
                        )}
                        onClick={toggleLoginHandler}
                        style={isLogin ? {} : hideForm}>
                        Don't have an account yet? <b>Signup</b>
                    </a>
                    <a
                        href="#/"
                        className={concatClasses(
                            styles.underlineHover,
                            styles.switchSignin
                        )}
                        onClick={toggleLoginHandler}
                        style={isLogin ? hideForm : {}}>
                        Already registered? <b>Loign</b>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
