import { all } from 'redux-saga/effects';

import {
    getProductsSaga,
    getCategoryProductsSaga,
    getSinlgeProductSaga,
} from './products';
import { getCategoriesSaga } from './categories';

export default function* rootSaga() {
    yield all([
        getProductsSaga(),
        getCategoryProductsSaga(),
        getSinlgeProductSaga(),

        getCategoriesSaga(),
    ]);
}
