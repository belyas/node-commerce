import {
    CATEGORIES_FAIL,
    CATEGORIES_FETCHED,
    CATEGORIES_FETCHING,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
    categories: [],
    error: null,
    loading: false,
};

const failedCategories = (state, action) => {
    return updateObject(state, {
        error: action.payload.error,
    });
};

const fetchingCategories = state => {
    return updateObject(state, {
        loading: true,
    });
};

const fetchedCategories = (state, action) => {
    return updateObject(state, {
        loading: false,
        categories: action.payload.categories,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_FAIL:
            return failedCategories(state, action);
        case CATEGORIES_FETCHING:
            return fetchingCategories(state);
        case CATEGORIES_FETCHED:
            return fetchedCategories(state, action);
        default:
            return state;
    }
};

export default reducer;
