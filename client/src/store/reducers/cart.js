import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/actionTypes';
import {
    updateObject,
    updateCart,
    getCartTotalPrice,
    getCartTotalItems,
    removeItemFromCart,
} from '../../utils/helpers';

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
};

const addToCart = (state, action) => {
    const { product } = action.payload;
    const items = updateCart(state.items, product);

    return updateObject(state, {
        items,
        totalPrice: getCartTotalPrice(items),
        totalItems: getCartTotalItems(items),
    });
};

const removeFromCart = (state, action) => {
    const { product } = action.payload;
    const items = removeItemFromCart(state.items, product._id);

    return updateObject(state, {
        items,
        totalPrice: getCartTotalPrice(items),
        totalItems: getCartTotalItems(items),
    });
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
