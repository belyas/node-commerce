import axios from '../../axios';

import {
    CATEGORIES_FETCHING,
    CATEGORIES_FETCHED,
    CATEGORIES_FAIL,
} from './actionTypes';

export const fetchingCategories = () => {
    return {
        type: CATEGORIES_FETCHING,
    };
};

export const categoriesFetchingFailed = error => {
    return {
        type: CATEGORIES_FAIL,
        payload: {
            error,
        },
    };
};

export const fetchedCategories = categories => {
    return {
        type: CATEGORIES_FETCHED,
        payload: {
            categories,
        },
    };
};

export const fetchCategories = () => {
    return async dispatch => {
        dispatch(fetchingCategories());

        try {
            const res = await axios.get('/categories');
            const data = await res.data;

            dispatch(fetchedCategories(data.data));
        } catch (err) {
            dispatch(categoriesFetchingFailed(err.message));
        }
    };
};
