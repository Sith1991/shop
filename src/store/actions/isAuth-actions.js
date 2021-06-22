import {USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT} from "../../action-types";
import {getUserAuth} from "../../services/firebase-service";

const userIsAuth = () => (dispatch) => {
    getUserAuth(dispatch, userIsLoggedIn, userIsNotLoggedIn);
}

const userIsLoggedIn = (email) => {
    return {
        type: USER_IS_LOGGED_IN,
        payload: email,
    }
}

const userIsNotLoggedIn = () => {
    return {
        type: USER_IS_LOGGED_OUT,
    }
}

export {
    userIsAuth,
    userIsLoggedIn,
    userIsNotLoggedIn
}