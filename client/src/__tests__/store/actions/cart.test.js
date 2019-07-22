import { addToCart, removeFromCart } from '../../../store/actions/cart';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from '../../../store/actions/actionTypes';

describe('Cart - action creators', () => {
    let product = {
        _id: 123,
        qty: 2,
        name: 'Product 1',
        image: 'some/image.jpg',
        price: 34,
        description: 'Product desc text',
    };

    it('should add item to cart', () => {
        const { type, payload } = addToCart(product);

        expect(type).toBe(CART_ADD_ITEM);
        expect(payload.product).toBe(product);
    });

    it('should remove item from cart', () => {
        const { type, payload } = removeFromCart(product);

        expect(type).toBe(CART_REMOVE_ITEM);
        expect(payload.product).toBe(product);
    });
});
