import { all } from 'redux-saga/effects';

import {
    getProductsSaga,
    getCategoryProductsSaga,
    getSinlgeProductSaga,
} from './products';
import { getCategoriesSaga } from './categories';
import { signupSaga } from './auth';

export default function* rootSaga() {
    yield all([
        getProductsSaga(),
        getCategoryProductsSaga(),
        getSinlgeProductSaga(),

        getCategoriesSaga(),

        signupSaga(),
    ]);
}
