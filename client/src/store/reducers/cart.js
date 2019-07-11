import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/actionTypes';
import {
    updateObject,
    updateCart,
    getCartTotalPrice,
    getCartTotalItems,
    removeItemFromCart,
} from '../../utils/helpers';

const cartData = localStorage.cart ? JSON.parse(localStorage.cart) : null;

const initialState = {
    items: cartData ? cartData.items : [],
    totalPrice: cartData ? cartData.totalPrice : 0,
    totalItems: cartData ? cartData.totalItems : 0,
};

const addToCart = (state, action) => {
    const { product } = action.payload;
    const items = updateCart(state.items, product);

    const newState = updateObject(state, {
        items,
        totalPrice: getCartTotalPrice(items),
        totalItems: getCartTotalItems(items),
    });

    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
};

const removeFromCart = (state, action) => {
    const { product } = action.payload;
    const items = removeItemFromCart(state.items, product._id);

    const newState = updateObject(state, {
        items,
        totalPrice: getCartTotalPrice(items),
        totalItems: getCartTotalItems(items),
    });

    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return addToCart(state, action);
        case CART_REMOVE_ITEM:
            return removeFromCart(state, action);
        default:
            return state;
    }
};

export default reducer;
