import {LOADING_SHOW, LOADING_HIDE} from '../constants';

function showLoading(msg) {
    return (dispatch) => {
        return dispatch({type: LOADING_SHOW, payload:msg});
    };
}

function hideLoading()
{
    return (dispatch) => 
    {
        return dispatch({type:LOADING_HIDE});
    }
}

export const loadingActions = {
    showLoading,
    hideLoading
};
