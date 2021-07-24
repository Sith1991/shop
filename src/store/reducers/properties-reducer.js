import {
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTIES_SPINNER_CLOSE,
  FETCH_PROPERTIES_SPINNER_OPEN,
  FETCH_PROPERTIES_SUCCESS,
} from '../action-types';

const propertiesReducer = (state, action) => {
  if (state === undefined) {
    return {
      properties: [],
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case FETCH_PROPERTIES_SUCCESS:
      return {
        properties: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PROPERTIES_SPINNER_OPEN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROPERTIES_SPINNER_CLOSE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case FETCH_PROPERTIES_FAILURE:
      return {
        properties: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { propertiesReducer };