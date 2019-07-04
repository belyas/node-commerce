import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Login from '../../../../components/Auth/Login/Login';
import { wrap } from 'module';

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
        const forms = wrapper.find('form');
        const loginForm = forms.at(0);

        expect(wrapper.props().isAuthenticated).toBeFalsy();
        // we have two forms Login/Signup to toggle between
        expect(forms).toHaveLength(2);
        expect(loginForm.find('h2').text()).toEqual('Login');
        expect(loginForm.find('input')).toHaveLength(3);
    });
});
