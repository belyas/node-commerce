import { takeLatest, call, put } from 'redux-saga/effects';

import axios from '../axios';
import { CATEGORIES_FETCH_REQUEST } from '../store/actions/actionTypes';
import {
    fetchingCategories,
    categoriesFetchingFailed,
    fetchedCategories,
} from '../store/actions';

function* fetchCategories() {
    yield put(fetchingCategories());

    try {
        const res = yield call(axios.get, '/categories');
        const data = yield res.data;

        yield put(fetchedCategories(data.data));
    } catch (err) {
        yield put(categoriesFetchingFailed(err.message));
    }
}

export function* getCategoriesSaga() {
    yield takeLatest(CATEGORIES_FETCH_REQUEST, fetchCategories);
}
