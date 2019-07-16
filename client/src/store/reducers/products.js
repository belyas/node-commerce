import {
    PRODUCTS_FAIL,
    PRODUCTS_FETCHED,
    PRODUCTS_FETCHING,
    CATEGORY_PRODUCTS_FETCHED,
    SINGLE_PRODUCT_FETCHED,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
    error: null,
    loading: false,
    products: [],
    category_products: {},
    category_id: 0,
    single_product: {},
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

const fetchedCategoryProducts = (state, action) => {
    const { category_id, products } = action.payload;

    return updateObject(state, {
        loading: false,
        category_id,
        category_products: {
            ...state.category_products,
            [category_id]: products,
        },
    });
};

const fetchedSingleProduct = (state, action) => {
    const { product_id, product } = action.payload;

    return updateObject(state, {
        loading: false,
        single_product: {
            ...state.single_product,
            [product_id]: product,
        },
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
        case CATEGORY_PRODUCTS_FETCHED:
            return fetchedCategoryProducts(state, action);
        case SINGLE_PRODUCT_FETCHED:
            return fetchedSingleProduct(state, action);
        default:
            return state;
    }
};

export default reducer;
