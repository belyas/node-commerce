import {
    PRODUCTS_FAIL,
    PRODUCTS_FETCHED,
    PRODUCTS_FETCHING,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
    error: null,
    loading: false,
    products: [],
};

const failedProducts = (state, action) => {
    return updateObject(state, { error: action.payload.error, loading: false });
};

const startFetchingProducts = state => {
    return updateObject(state, { loading: true });
};

const fetchedProducts = (state, action) => {
    return updateObject(state, {
        loading: false,
        products: action.payload.products,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_FAIL:
            return failedProducts(state, action);
        case PRODUCTS_FETCHING:
            return startFetchingProducts(state);
        case PRODUCTS_FETCHED:
            return fetchedProducts(state, action);
        default:
            return state;
    }
};

export default reducer;
