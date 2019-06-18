import axios from '../../axios';

import {
    PRODUCTS_FETCHING,
    PRODUCTS_FETCHED,
    PRODUCTS_FAIL,
    CATEGORY_PRODUCTS_FETCHED,
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

export const fetchedCategoryProducts = (products, category_id) => ({
    type: CATEGORY_PRODUCTS_FETCHED,
    payload: { products, category_id },
});

export const getProducts = () => {
    return async dispatch => {
        dispatch(fetchingProducts());

        try {
            const res = await axios.get('/products');
            const data = await res.data;

            dispatch(fetchedProducts(data.data));
        } catch (err) {
            dispatch(failedFetchingProducts(err.message));
        }
    };
};

export const getCategoryProducts = category_id => {
    return async dispatch => {
        dispatch(fetchingProducts());

        try {
            const res = await axios.get(`/products/${category_id}`);
            const data = await res.data;

            dispatch(fetchedCategoryProducts(data.data, category_id));
        } catch (err) {
            dispatch(failedFetchingProducts(err.message));
        }
    };
};
