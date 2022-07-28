import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppActions} from "./actions/types/actions";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);

export const persistor = persistStore(store);
