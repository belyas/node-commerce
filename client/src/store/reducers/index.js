import { combineReducers } from 'redux';

import authReducer from './auth';
import categoryReducer from './categories';
import productReducer from './products';
import cartReducer from './cart';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
});

export default rootReducer;
