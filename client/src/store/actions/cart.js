import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './actionTypes';

export const addToCart = product => ({
    type: CART_ADD_ITEM,
    payload: { product },
});

export const removeFromCart = product => ({
    type: CART_REMOVE_ITEM,
    payload: { product },
});
