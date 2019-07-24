import cartReducer from '../../../store/reducers/cart';
import { addToCart, removeFromCart } from '../../../store/actions/cart';

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
};

describe('Cart reducer', () => {
    it('should return initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    it('should add new item to cart items', () => {
        const product = { _id: 1, qty: 2, price: 10 };
        const state = cartReducer(initialState, addToCart(product));

        expect(state.items[0]).toEqual(product);
        expect(state.totalPrice).toEqual(product.qty * product.price);
        expect(state.totalItems).toEqual(2);
    });

    it('should update existing product qty instead of adding new product', () => {
        const product = { _id: 1, qty: 2, price: 10 };

        // add first time
        const prevState = cartReducer(initialState, addToCart(product));
        // add same product second time
        const state = cartReducer(prevState, addToCart(product));

        expect(state.totalPrice).toEqual(state.totalItems * product.price);
        expect(state.totalItems).toEqual(4);
    });

    it('should remove existing product', () => {
        const product = { _id: 1, qty: 2, price: 10 };
        const prevState = {
            items: [product],
            totalPrice: product.price * product.qty,
            totalItems: product.qty,
        };

        expect(prevState.totalPrice).toEqual(product.qty * product.price);
        expect(prevState.totalItems).toEqual(product.qty);

        // remove item from state
        const newState = cartReducer(prevState, removeFromCart(product));
        expect(newState.totalPrice).toBeFalsy();
        expect(newState.totalItems).toBeFalsy();
        expect(newState.items).toEqual([]);
    });
});
