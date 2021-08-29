import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { loadingReducer } from './loading.reducers';
import { toastReducer } from './toast.reducers';

const reducers = combineReducers({
    authReducer,
    loadingReducer,
    toastReducer
});

export default reducers; 
