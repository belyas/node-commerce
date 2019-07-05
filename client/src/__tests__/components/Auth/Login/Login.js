import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Login from '../../../../components/Auth/Login/Login';
import LoginForm from '../../../../components/Auth/LoginForm/LoginForm';

describe('Login component', () => {
    it('should display three inputs and h2 login heading', () => {
        const props = {
            isAuthenticated: false,
            isLogin: true, // indicate the login form
            errors: {},
            email: null,
            password: null,
            error: null,
            blurHandler: () => ({}),
            changeHandler: () => ({}),
            submitHanlder: () => ({}),
            toggleLoginHandler: () => ({}),
        };
        const wrapper = shallow(<Login {...props} />);
        const loginForm = wrapper.find('LoginForm');
        const signupForm = wrapper.find('SignupForm');

        expect(wrapper.props().isAuthenticated).toBeFalsy();
        expect(loginForm).toHaveLength(1);
        expect(signupForm).toHaveLength(1);
        // signup form must be hidden
        expect(signupForm.prop('hideForm')).toEqual({ display: 'none' });
        expect(wrapper.find('a')).toHaveLength(2);
        expect(
            wrapper
                .find('a')
                .first()
                .text()
        ).toEqual("Don't have an account yet? Signup");
        expect(
            wrapper
                .find('a')
                .last()
                .text()
        ).toEqual('Already registered? Loign');
    });

    it('should display Login form component', () => {
        const props = {
            isLogin: true, // indicate the login form
            errors: {},
            email: 'yassine.belkaid87@gmail.com',
            password: '123456',
            error: null,
            blurHandler: () => ({}),
            changeHandler: () => {
                wrapper.setProps({ email: 'new.email@example.com' });
            },
            submitHanlder: () => {
                wrapper.setProps({ error: 'Invalid email or password' });
            },
        };
        const wrapper = shallow(<LoginForm {...props} />);

        expect(wrapper.find('h2').text()).toEqual('Login');
        expect(wrapper.find('input')).toHaveLength(3);

        wrapper.simulate('submit');
        expect(wrapper.find('.alert-danger').text()).toEqual(
            'Invalid email or password'
        );

        wrapper.find('input[name="email"]').simulate('change');
        const currentHTML = wrapper.html();
        expect(currentHTML).not.toContain(props.email);
        expect(currentHTML).toContain('new.email@example.com');
    });
});
