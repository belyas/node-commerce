import { all } from 'redux-saga/effects';

import { getProductsSaga } from './products';

export default function* rootSaga() {
    yield all([getProductsSaga()]);
}
