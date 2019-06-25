import { takeLatest, put, call } from 'redux-saga/effects';

import axios from '../axios';
import {
    PRODUCT_FETCH_REQUESTED,
    CATEGORY_PRODUCTS_FETCH_REQUEST,
} from '../store/actions/actionTypes';
import {
    fetchedProducts,
    fetchingProducts,
    failedFetchingProducts,
    fetchedCategoryProducts,
} from '../store/actions';

function* fetchAllProducts() {
    yield put(fetchingProducts());

    try {
        const res = yield call(axios.get, '/products');
        const data = yield res.data;

        yield put(fetchedProducts(data.data));
    } catch (err) {
        yield put(failedFetchingProducts(err.message));
    }
}

function* fetchCategoryProducts(action) {
    yield put(fetchingProducts());

    try {
        const { category_id } = action.payload;
        const res = yield call(axios.get, `/products/category/${category_id}`);
        const data = yield res.data;

        yield put(fetchedCategoryProducts(data.data, category_id));
    } catch (err) {
        yield put(failedFetchingProducts(err.message));
    }
}

export function* getProductsSaga() {
    yield takeLatest(PRODUCT_FETCH_REQUESTED, fetchAllProducts);
}

export function* getCategoryProductsSaga() {
    yield takeLatest(CATEGORY_PRODUCTS_FETCH_REQUEST, fetchCategoryProducts);
}
