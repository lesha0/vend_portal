import { TOKEN_IN_LOCAL,AUTH_SAVE_TOKEN, AUTH_SAVE_USER } from "../constants"

var initialState = {token:localStorage.getItem(TOKEN_IN_LOCAL)}
export const authReducer = (state=initialState, action) => {
    switch(action.type)
    {
        
        case AUTH_SAVE_TOKEN:
            return {...state, token:action.payload};
        case AUTH_SAVE_USER:
            return {user:action.payload};
        default:
            return state;
    }
}
