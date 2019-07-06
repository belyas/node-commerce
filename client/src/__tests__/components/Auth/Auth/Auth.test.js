import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Auth from '../../../../components/Auth/Auth';
import LoginForm from '../../../../components/Auth/LoginForm/LoginForm';
import SignupForm from '../../../../components/Auth/SignupForm/SignupForm';

describe('Auth component and sub components', () => {
    it('should verify the right rendered components and dom elements', () => {
        const props = {
            isAuthenticated: false,
            isLogin: true, // indicate the login form
            errors: {},
            email: null,
            password: null,
            error: null,
            blurHandler: () => ({}),
            changeHandler: () => ({}),
            loginSubmitHanlder: () => ({}),
            toggleLoginHandler: () => ({}),
            signupSubmitHanlder: () => ({}),
        };
        const wrapper = shallow(<Auth {...props} />);
        const loginForm = wrapper.find('LoginForm');
        const signupForm = wrapper.find('SignupForm');

        expect(wrapper.html()).toMatchSnapshot();
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

    it('should redirect if isAuthenticated is set to true', () => {
        const props = {
            isAuthenticated: true,
            isLogin: true, // indicate the login form
            errors: {},
            email: null,
            password: null,
            error: null,
            blurHandler: () => ({}),
            changeHandler: () => ({}),
            loginSubmitHanlder: () => ({}),
            toggleLoginHandler: () => ({}),
            signupSubmitHanlder: () => ({}),
        };
        const wrapper = shallow(<Auth {...props} />);

        // this is basically complaining about using Redirect in Login component
        expect(() => wrapper.html()).toThrow();
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
            loginSubmitHanlder: () => {
                wrapper.setProps({ error: 'Invalid email or password' });
            },
        };
        const wrapper = shallow(<LoginForm {...props} />);

        expect(wrapper.html()).toMatchSnapshot();
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

    it('should display signup form component', () => {
        const props = {
            isLogin: false, // indicate the signup form is displayed
            errors: {},
            email: 'yassine.belkaid87@gmail.com',
            password: '',
            firstname: 'yassine',
            lastname: 'belkaid',
            error: null,
            hideForm: {},
            blurHandler: () => {
                wrapper.setProps({ errors: { password: 'Password required' } });
            },
            changeHandler: () => {
                wrapper.setProps({ firstname: 'alex', lastname: 'wolf' });
            },
            signupSubmitHanlder: () => {
                wrapper.setProps({ error: 'Something went wrong!' });
            },
        };
        const wrapper = shallow(<SignupForm {...props} />);

        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.find('h2').text()).toEqual('Signup');
        expect(wrapper.find('input')).toHaveLength(4);
        expect(wrapper.find('button')).toHaveLength(1);

        wrapper.find('input[name="firstname"]').simulate('change');
        wrapper.find('input[name="lastname"]').simulate('change');
        const currentHTML = wrapper.html();
        expect(currentHTML).toContain('alex');
        expect(currentHTML).toContain('wolf');

        wrapper.simulate('submit');
        expect(wrapper.find('.alert-danger').text()).toBe(
            'Something went wrong!'
        );

        wrapper.find('input[name="password"]').simulate('blur');
        expect(wrapper.find('.password-error').text()).toBe(
            'Password required'
        );
    });
});
