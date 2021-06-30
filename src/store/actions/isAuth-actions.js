import {USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT, USER_IS_LOGGED_REQUEST} from "../../action-types";
import {getUserAuth} from "../../services/firebase-service";

const userIsAuth = () => (dispatch) => {
    dispatch(userIsAuthRequest());
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

const userIsAuthRequest = () => {
    return {
        type: USER_IS_LOGGED_REQUEST
    }
}

export {
    userIsAuth,
    userIsLoggedIn,
    userIsNotLoggedIn
}