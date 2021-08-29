import { TOAST_SHOW, TOAST_HIDE } from "../constants"

const initialState = {toast_show:false, toast_msg:""}
export const toastReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case TOAST_SHOW:
            return {toast_show:true, toast_msg:action.payload};
        case TOAST_HIDE:
            return {toast_show:false, toast_msg:''};
        default:
            return state;
    }
}
