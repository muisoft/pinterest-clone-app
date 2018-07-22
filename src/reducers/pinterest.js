import * as ActionType from '../actions/ActionType';

const initialState = {
    pics: [],
    mypics: [],
    user: {},
    isloading: false,
    iserror: false,
    partialState: {},
    dialog: {
        visible: false,
        focusOnMount: true,
        containFocus: true,
        initialFocus: undefined
    },
    message: {}
}
 
export const pinterest = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ON_SUCCESS:
            return {
                ...state,
                pics: action.payload.pins,
                user: action.payload.user ? action.payload.user : {}
            }
        case ActionType.ON_SIGNIN:
            return {
                ...state,
                user: action.user
            }
        case ActionType.GET_MY_PICS:
            return {
                ...state,
                mypics: action.payload
            }
        case ActionType.ON_ERROR:
            return {
                ...state,
                iserror: action.status
            }
        case ActionType.ON_LOADING:
            return {
                ...state,
                isloading: action.status
            }
        case ActionType.IS_SAVED:
            return {
                ...state,
                message: action.payload,
                user: action.payload.user
            }
        case ActionType.SHOW_DIALOG:
            return {
                ...state,
                dialog: {
                    ...state.dialog,
                    visible: !state.dialog.visible
                }
            }
        case ActionType.SIGN_OUT:
            return initialState;
        default:
            return state;
    }
}
