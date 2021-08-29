import axios from 'axios';
import {AUTH_SAVE_TOKEN, AUTH_SAVE_USER, TOKEN_IN_LOCAL, USER_IN_LOCAL} from '../constants';
import {loadingActions} from './loading.actions';
import {toastActions} from './toast.actions';

function doRemoteVend(name, qr, machine, token) {
    return dispatch => {
        dispatch(loadingActions.showLoading());
        const bodyFormData = new FormData();
        bodyFormData.append('machine_id', machine);
        bodyFormData.append('customer_name', name);
        bodyFormData.append('vend_id', qr);
        bodyFormData.append('aisle_number', '10');

        axios.post(
            "http://tcn.vendportal.com/index.php/api/Remote_Vend_API_Controller", 
            bodyFormData,
            {
                headers: { 
                    "Content-Type": 'multipart/form-data',
                    "Authorization": token,
                },
            }
        )
        .then(res => {
            dispatch(loadingActions.hideLoading());
            console.log(res);
            if(res.data.status === 'fail')
            {
                dispatch(toastActions.showToast(res.data.message));
            }
            else
            {
                // dispatch(saveToken(res.data.id_token));
                dispatch(toastActions.showToast("Remote Vend is successfully done"));
            }
        })
        .catch(err => {
            dispatch(toastActions.showToast("Error occured"));
        });
    }
}

export const vendActions = {
    doRemoteVend
};
