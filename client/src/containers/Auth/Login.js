import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { concatClasses } from '../../utils/helpers';
// import useFormValidation from '../../../hooks/useFormValidation';
import { validateLoginAuth } from '../../utils/validateAuth';
import styles from './Login.module.css';
import * as actions from '../../store/actions';

// const INITIAL_STATE = {
//     email: '',
//     password: '',
// };
// const {
//     values,
//     onChangeHandler,
//     onBlurHandler,
//     errors,
//     isSubmitting,
// } = useFormValidation(INITIAL_STATE, validateLoginAuth);
let hideForm = { display: 'none' };

class Login extends Component {
    state = {
        isLogin: true,
        errors: null,
        email: '',
        password: '',
    };

    toggleLoginHandler = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin,
            };
        });
    };

    onSubmitHanlder = e => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    };

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onBlurHandler = () => {
        const validationErrors = validateLoginAuth({
            email: this.state.email,
            password: this.state.password,
        });
        console.log('Onblur; ', validationErrors);
        this.setState({
            errors: validationErrors,
        });
    };

    render() {
        let redirectUrl = null;
        if (this.props.isAuthenticated) {
            redirectUrl = <Redirect to="/" />;
        }

        return (
            <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
                {redirectUrl}
                <div
                    className={concatClasses(
                        styles.autoMg,
                        styles.formContent
                    )}>
                    <form
                        onSubmit={this.onSubmitHanlder}
                        style={this.state.isLogin ? {} : hideForm}>
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
                            className={concatClasses(
                                styles.fadeIn,
                                styles.second
                            )}
                            name="email"
                            placeholder="Email address"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                            onBlur={this.onBlurHandler}
                            required
                        />
                        {this.state.errors && this.state.errors.email && (
                            <p className="alert alert-danger">
                                {this.state.errors.email}
                            </p>
                        )}
                        <input
                            type="password"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.third
                            )}
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            onBlur={this.onBlurHandler}
                            required
                        />
                        {this.state.errors && this.state.errors.password && (
                            <p className="alert alert-danger">
                                {this.state.errors.password}
                            </p>
                        )}
                        <input
                            type="submit"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.fourth
                            )}
                            value="Log In"
                        />
                        {this.props.error && (
                            <p className="alert alert-danger">
                                {this.props.error}
                            </p>
                        )}
                    </form>

                    <form
                        action="#"
                        method="POST"
                        style={this.state.isLogin ? hideForm : {}}>
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
                            className={concatClasses(
                                styles.fadeIn,
                                styles.second
                            )}
                            name="firstname"
                            placeholder="First name"
                            required
                        />
                        <input
                            type="text"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.second
                            )}
                            name="lastname"
                            placeholder="Last name"
                            required
                        />
                        <input
                            type="text"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.third
                            )}
                            name="email"
                            placeholder="Email address"
                            required
                        />
                        <input
                            type="password"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.third
                            )}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <input
                            type="button"
                            className={concatClasses(
                                styles.fadeIn,
                                styles.fourth
                            )}
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
                            onClick={this.toggleLoginHandler}
                            style={this.state.isLogin ? {} : hideForm}>
                            Don't have an account yet? <b>Signup</b>
                        </a>
                        <a
                            href="#/"
                            className={concatClasses(
                                styles.underlineHover,
                                styles.switchSignin
                            )}
                            onClick={this.toggleLoginHandler}
                            style={this.state.isLogin ? hideForm : {}}>
                            Already registered? <b>Loign</b>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        checkUserStatus: () => dispatch(actions.authCheckState()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
