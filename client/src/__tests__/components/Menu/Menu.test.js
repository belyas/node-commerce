import React from 'react';
import { shallow } from 'enzyme';

import Menu from '../../../components/Menu/Menu';

describe('<Menu />', () => {
    it('should have spinner to load categories', () => {
        const wrapper = shallow(<Menu loading />);

        expect(wrapper.find('Spinner')).toBeTruthy();
    });

    it('should load categories', () => {
        const categories = [
            { _id: 123, name: 'cat 1' },
            { _id: 243, name: 'cat 2' },
            { _id: 389, name: 'cat 3' },
        ];
        const wrapper = shallow(
            <Menu loading={false} categories={categories} />
        );

        expect(wrapper.find('li')).toHaveLength(categories.length);
        expect(
            wrapper
                .find('.nav-link')
                .last()
                .props().to
        ).toEqual(`/category/${categories[categories.length - 1]._id}`);
    });
});
