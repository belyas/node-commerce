import axios from '../../axios';

import {
    PRODUCTS_FETCHING,
    PRODUCTS_FETCHED,
    PRODUCTS_FAIL,
} from './actionTypes';

export const fetchingProducts = () => ({
    type: PRODUCTS_FETCHING,
});

export const failedFetchingProducts = error => ({
    type: PRODUCTS_FAIL,
    payload: { error },
});

export const fetchedProducts = products => ({
    type: PRODUCTS_FETCHED,
    payload: { products },
});

export const getProducts = () => {
    return async dispatch => {
        dispatch(fetchingProducts());

        try {
            const res = await axios.get('/products');
            const data = await res.data;

            dispatch(fetchedProducts(data.data));
        } catch (err) {
            dispatch(failedFetchingProducts(err.toString()));
        }
    };
};
