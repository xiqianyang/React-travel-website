import { createStore, combineReducers } from 'redux';
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';

const store = createStore(languageReducer);

export type RootState = ReturnType<typeof store.getState>

export default store;