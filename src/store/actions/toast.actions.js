import {TOAST_SHOW, TOAST_HIDE} from '../constants';

function showToast(msg) {
    return (dispatch) => {
        return dispatch({type: TOAST_SHOW, payload:msg});
    };
}

function hideToast()
{
    return (dispatch) => 
    {
        return dispatch({type:TOAST_HIDE});
    }
}

export const toastActions = {
    showToast,
    hideToast
};
