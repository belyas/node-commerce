import React from 'react';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import styles from '../Login/Login.module.css';

const SignupForm = ({ isLogin, hideForm }) => {
    return (
        <form style={isLogin ? hideForm : {}}>
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
    );
};

SignupForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    hideForm: PropTypes.object.isRequired,
};

export default SignupForm;
