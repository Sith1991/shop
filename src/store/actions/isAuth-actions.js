import firebase from 'firebase/app';
import 'firebase/database';
import {USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT} from "../../action-types";

const userIsAuth = () => (dispatch) => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                dispatch(userIsLoggedIn(firebaseUser.email));
            } else {
                dispatch(userIsNotLoggedIn());
            }
        }
    )
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

const userLogOut = () => () => {
    firebase.auth().signOut();
}

export {
    userIsAuth,
    userLogOut
}