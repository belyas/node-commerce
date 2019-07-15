import React from 'react';
import { shallow } from 'enzyme';

import { ProductCard } from '../../../../components/Product/ProductCard/ProductCard';

describe('<ProductCard />', () => {
    let product;

    beforeEach(() => {
        product = {
            name: 'Product 1',
            price: 34,
            image: '/some/image/123.jpg',
            _id: '123456',
        };
    });

    it('should have main elemts present', () => {
        const wrapper = shallow(
            <ProductCard product={product} setCartItem={() => ({})} />
        );

        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('div Link').props().to).toEqual(
            `/product/${product._id}`
        );
        expect(wrapper.find('div Link span').text()).toEqual(`${product.name}`);
        expect(
            wrapper
                .find('span')
                .at(1)
                .text()
        ).toEqual(`$${product.price}`);
        expect(
            wrapper
                .find('span')
                .last()
                .text()
        ).toEqual('Add to cart');
    });

    it('can add item to cart', () => {
        let addedToCart = false;
        const addToCart = _product => {
            addedToCart = _product._id === product._id;
        };
        const props = {
            product,
            setCartItem: addToCart,
        };
        const wrapper = shallow(<ProductCard {...props} />);

        wrapper
            .find('span')
            .last()
            .simulate('click');

        expect(addedToCart).toBeTruthy();
    });
});
