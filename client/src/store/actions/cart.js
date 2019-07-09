import {
    CART_ADD_ITEM,
    CART_EMPTY_ITEMS,
    CART_REMOVE_ITEM,
} from './actionTypes';

export const addToCart = product => ({
    type: CART_ADD_ITEM,
    payload: { product },
});
