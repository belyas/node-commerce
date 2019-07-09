import {
    CART_ADD_ITEM,
    CART_EMPTY_ITEMS,
    CART_REMOVE_ITEM,
} from '../actions/actionTypes';
import {
    updateObject,
    updateCart,
    getCartTotalPrice,
    getCartTotalItems,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return addToCart(state, action);
        default:
            return state;
    }
};

export default reducer;
