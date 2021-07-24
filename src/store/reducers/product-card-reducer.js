import {
  CLEAR_SELECTED_PRODUCT,
  FETCH_SELECTED_PRODUCT_FAILURE,
  FETCH_SELECTED_PRODUCT_REQUEST,
  FETCH_SELECTED_PRODUCT_SUCCESS,
} from '../action-types';

const productCardReducer = (state, action) => {
  if (state === undefined) {
    return {
      selectedProduct: {},
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case FETCH_SELECTED_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SELECTED_PRODUCT_SUCCESS:
      return {
        selectedProduct: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_SELECTED_PRODUCT_FAILURE:
      return {
        selectedProduct: {},
        loading: false,
        error: action.payload,
      };

    case CLEAR_SELECTED_PRODUCT:
      return {
        selectedProduct: {},
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

export { productCardReducer };