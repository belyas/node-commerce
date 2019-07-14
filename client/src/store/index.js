import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import rootSaga from '../sagas';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
