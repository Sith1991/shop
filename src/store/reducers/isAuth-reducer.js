import {USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT} from "../../action-types";

const isAuthReducer = (state, action) => {
    if (state === undefined) {
        return {
            logIn: false,
            email: null,
        }
    }

    switch (action.type) {
        case USER_IS_LOGGED_IN:
            return {
                logIn: true,
                email: action.payload,
            }

        case USER_IS_LOGGED_OUT:
            return {
                logIn: false,
                email: null,
            }

        default:
            return state
    }
}

export default isAuthReducer;