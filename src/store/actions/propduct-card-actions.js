import {
  CLEAR_SELECTED_PRODUCT,
  FETCH_SELECTED_PRODUCT_FAILURE,
  FETCH_SELECTED_PRODUCT_REQUEST,
  FETCH_SELECTED_PRODUCT_SUCCESS,
} from '../action-types';
import { getSelectedProduct } from '../../services';

const selectedProductLoaded = (products, itemId) => {
  const objectsToArray = Object.values(products);
  const getKeysToArray = Object.keys(products);
  for (let i = 0; i < getKeysToArray.length; i++) {
    // добавляю свойство id для того что бы через него
    objectsToArray[i].id = getKeysToArray[i]; // редактировать или удалять необходимые объекты
  }
  const product = objectsToArray.find(({ id }) => id === itemId);
  if (product === undefined) {
    return selectedProductError(new Error('Some Error'));
  }

  return {
    type: FETCH_SELECTED_PRODUCT_SUCCESS,
    payload: product,
  };
};

const clearSelectedProduct = () => {
  // зачищаем выбранный товар, т.к. если этого не делать, то при переключении
  // на другой товар, до его загрузки отображается предыдущий выбранный.
  return {
    type: CLEAR_SELECTED_PRODUCT,
  };
};

const selectedProductRequested = () => {
  return {
    type: FETCH_SELECTED_PRODUCT_REQUEST,
  };
};

const selectedProductError = (error) => {
  return {
    type: FETCH_SELECTED_PRODUCT_FAILURE,
    payload: error,
  };
};

const fetchSelectedProduct = (itemId) => (dispatch) => {
  dispatch(selectedProductRequested());
  getSelectedProduct(dispatch, selectedProductLoaded, itemId);
};

export { fetchSelectedProduct, clearSelectedProduct };
