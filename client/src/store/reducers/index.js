import { combineReducers } from 'redux';

import authReducer from './auth';
import categoryReducer from './categories';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
});

export default rootReducer;
