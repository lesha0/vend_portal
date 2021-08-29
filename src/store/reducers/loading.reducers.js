import { LOADING_SHOW, LOADING_HIDE } from "../constants"

const initialState = {dialog_show:false, dialog_msg:""}
export const loadingReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case LOADING_SHOW:
            return {loading_show:true, loading_msg:action.payload};
        case LOADING_HIDE:
            return {loading_show:false, loading_msg:''};
        default:
            return state;
    }
}
