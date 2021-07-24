import { USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT, USER_IS_LOGGED_REQUEST } from '../action-types';

const isAuthReducer = (state, action) => {
  if (state === undefined) {
    return {
      logIn: false,
      email: null,
      loading: true,
    };
  }

  switch (action.type) {
    case USER_IS_LOGGED_IN:
      return {
        logIn: true,
        email: action.payload,
        loading: false,
      };

    case USER_IS_LOGGED_OUT:
      return {
        logIn: false,
        email: null,
        loading: false,
      };

    case USER_IS_LOGGED_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export { isAuthReducer };