import { combineReducers } from 'redux';

import authReducer from './auth';
import categoryReducer from './categories';
import productReducer from './products';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
});

export default rootReducer;
