import { all } from 'redux-saga/effects';

import {
    getProductsSaga,
    getCategoryProductsSaga,
    getSinlgeProductSaga,
} from './products';

export default function* rootSaga() {
    yield all([
        getProductsSaga(),
        getCategoryProductsSaga(),
        getSinlgeProductSaga(),
    ]);
}
