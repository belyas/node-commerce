import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../../components/Header/Header';

describe('<Header />', () => {
    it('should contains login link', () => {
        const wrapper = shallow(<Header isAuthenticated={false} />);

        expect(
            wrapper
                .find('.nav-link')
                .first()
                .props().to
        ).toEqual('/login');
        expect(wrapper.find('li').length).toBe(2);
    });

    it('should contains logout link', () => {
        const wrapper = shallow(<Header isAuthenticated />);

        expect(
            wrapper
                .find('.nav-link')
                .first()
                .props().to
        ).toEqual('/logout');
        expect(wrapper.find('li').length).toBe(2);
    });

    it('should contains cart menu component', () => {
        const wrapper = shallow(<Header isAuthenticated />);

        expect(wrapper.find('CartMenu')).not.toBeFalsy();
    });
});
