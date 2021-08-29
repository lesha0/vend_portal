import axios from 'axios';
import {AUTH_SAVE_TOKEN, AUTH_SAVE_USER, TOKEN_IN_LOCAL, USER_IN_LOCAL} from '../constants';
import {loadingActions} from './loading.actions';
import {toastActions} from './toast.actions';

function saveToken(token) {
    return async (dispatch) => {
        console.log('save token');
        localStorage.setItem(TOKEN_IN_LOCAL, JSON.stringify(token));
        return dispatch({type: AUTH_SAVE_TOKEN, payload:token});
    };
}


function getTokenFromServer()
{
    return dispatch => {
        dispatch(loadingActions.showLoading(""));
        const bodyFormData = new FormData();
        bodyFormData.append('login_key', '111245');
        bodyFormData.append('password', 'xpo@552');
        bodyFormData.append('terms_and_condition', 'true');
        bodyFormData.append('imei_number', '');
        axios.post("http://tcn.vendportal.com/index.php/api/User_API_Controller", 
                    bodyFormData,  
                    {
                        headers: { 
                            "Content-Type": 'multipart/form-data',
                        },
                    })
            .then((res) => {
                dispatch(loadingActions.hideLoading());
                if(res.data.status === 'fail')
                {
                    dispatch(toastActions.showToast(res.data.message));
                }
                else
                {
                    dispatch(saveToken(res.data.id_token));
                    dispatch(toastActions.showToast("Token Generated And Saved."));
                }
            })
            .catch((err) => {
                dispatch(toastActions.showToast("Error occured"));
                dispatch(loadingActions.hideLoading());
            });
    }
}

export const authActions = {
    saveToken,
    getTokenFromServer
};
