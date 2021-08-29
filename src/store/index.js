import { createStore, applyMiddleware } from "redux";
import reducers from './reducers/index';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk);
export const store = createStore(reducers, enhancer);;
