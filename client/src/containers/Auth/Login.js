import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validateLoginAuth } from '../../utils/validateAuth';
import { auth } from '../../store/actions';
import LoginComponent from '../../components/Auth/Login/Login';

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

        this.setState({
            errors: validationErrors,
        });
    };

    render() {
        const props = {
            ...this.props,
            ...this.state,
        };
        return (
            <LoginComponent
                {...props}
                toggleLoginHandler={this.toggleLoginHandler}
                submitHanlder={this.onSubmitHanlder}
                changeHandler={this.onChangeHandler}
                blurHandler={this.onBlurHandler}
            />
        );
    }
}

Login.propTypes = {
    loading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string,
    onAuth: PropTypes.func.isRequired,
};

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
        onAuth: (email, password) => dispatch(auth(email, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
