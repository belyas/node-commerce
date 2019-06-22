import { takeLatest, put, call } from 'redux-saga/effects';

import axios from '../axios';
import { PRODUCT_FETCH_REQUESTED } from '../store/actions/actionTypes';
import {
    fetchedProducts,
    fetchingProducts,
    failedFetchingProducts,
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

export function* getProductsSaga() {
    yield takeLatest(PRODUCT_FETCH_REQUESTED, fetchAllProducts);
}
