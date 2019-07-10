import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    validateLoginAuth,
    validateSignupAuth,
} from '../../utils/validateAuth';
import { auth, signupAuthRequest } from '../../store/actions';
import AuthComponent from '../../components/Auth/Auth';

class Auth extends Component {
    state = {
        isLogin: true,
        errors: {},
        error: null,
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    };

    toggleLoginHandler = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin,
                error: null,
                errors: {},
            };
        });
    };

    onLoginSubmitHanlder = e => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    };

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onBlurHandler = () => {
        let validationErrors = {};
        const { email, password, firstname, lastname } = this.state;

        if (this.state.isLogin) {
            validationErrors = validateLoginAuth({ email, password });
        } else {
            validationErrors = validateSignupAuth({
                email,
                password,
                firstname,
                lastname,
            });
        }

        this.setState({
            errors: validationErrors,
        });
    };

    onSignupSubmitHanlder = e => {
        e.preventDefault();
        const { email, password, firstname, lastname, errors } = this.state;

        if (errors && Object.keys(errors).length > 0) {
            this.setState({
                error: 'Please correct all errors before you continue!',
            });
        } else {
            // Sign up call
            this.props.onSignupAuth(firstname, lastname, email, password);
            this.setState({ error: null });
        }
    };

    render() {
        const props = {
            ...this.props,
            ...this.state,
            error: this.state.error ? this.state.error : this.props.error,
        };
        return (
            <AuthComponent
                {...props}
                toggleLoginHandler={this.toggleLoginHandler}
                loginSubmitHanlder={this.onLoginSubmitHanlder}
                changeHandler={this.onChangeHandler}
                blurHandler={this.onBlurHandler}
                signupSubmitHanlder={this.onSignupSubmitHanlder}
            />
        );
    }
}

Auth.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string,
    onAuth: PropTypes.func.isRequired,
    onSignupAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        signupSuccess: state.auth.signupSuccess,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password)),
        onSignupAuth: (firstname, lastname, email, password) =>
            dispatch(signupAuthRequest(firstname, lastname, email, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
