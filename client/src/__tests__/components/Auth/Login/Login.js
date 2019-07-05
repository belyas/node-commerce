import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Login from '../../../../components/Auth/Login/Login';

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

        expect(wrapper.props().isAuthenticated).toBeFalsy();
        expect(loginForm).toHaveLength(1);
        // signup form must be hidden
        expect(wrapper.find('form').prop('style')).toEqual({ display: 'none' });
    });
});
