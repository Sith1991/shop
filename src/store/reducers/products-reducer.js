import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SPINNER_CLOSE,
  FETCH_PRODUCTS_SPINNER_OPEN,
  FETCH_PRODUCTS_SUCCESS,
} from '../action-types';

const productsReducer = (state, action) => {
  if (state === undefined) {
    return {
      products: [],
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case FETCH_PRODUCTS_SPINNER_OPEN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SPINNER_CLOSE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { productsReducer };