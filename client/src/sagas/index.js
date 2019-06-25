import { all } from 'redux-saga/effects';

import { getProductsSaga, getCategoryProductsSaga } from './products';

export default function* rootSaga() {
    yield all([getProductsSaga(), getCategoryProductsSaga()]);
}
