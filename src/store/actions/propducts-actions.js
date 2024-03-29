import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SPINNER_OPEN,
  FETCH_PRODUCTS_SPINNER_CLOSE,
  FETCH_PRODUCTS_SUCCESS,
} from '../action-types';
import { getItems } from '../../services';

const productsLoaded = (newItems) => {
  const objectsToArray = Object.values(newItems);
  const getKeysToArray = Object.keys(newItems);
  for (let i = 0; i < getKeysToArray.length; i++) {
    objectsToArray[i].id = getKeysToArray[i];
  }
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: objectsToArray,
  };
};

const productsSpinnerOpen = () => {
  return {
    type: FETCH_PRODUCTS_SPINNER_OPEN,
  };
};

const productsSpinnerClose = () => {
  return {
    type: FETCH_PRODUCTS_SPINNER_CLOSE,
  };
};

const productsError = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

const fetchProducts = () => (dispatch) => {
  dispatch(productsSpinnerOpen());
  getItems(dispatch, 'products', productsLoaded);
};

export { fetchProducts, productsError, productsSpinnerOpen, productsSpinnerClose, productsLoaded };