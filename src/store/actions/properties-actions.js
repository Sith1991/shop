import {
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTIES_SPINNER_CLOSE,
  FETCH_PROPERTIES_SPINNER_OPEN,
  FETCH_PROPERTIES_SUCCESS,
} from '../action-types';
import { getItems } from '../../services';

const propertiesLoaded = (newItems) => {
  const objectsToArray = Object.values(newItems);
  const getKeysToArray = Object.keys(newItems);
  for (let i = 0; i < getKeysToArray.length; i++) {
    objectsToArray[i].id = getKeysToArray[i];
  }
  return {
    type: FETCH_PROPERTIES_SUCCESS,
    payload: objectsToArray,
  };
};

const propertiesSpinnerOpen = () => {
  return {
    type: FETCH_PROPERTIES_SPINNER_OPEN,
  };
};

const propertiesSpinnerClose = () => {
  return {
    type: FETCH_PROPERTIES_SPINNER_CLOSE,
  };
};

const propertiesError = (error) => {
  return {
    type: FETCH_PROPERTIES_FAILURE,
    payload: error,
  };
};

const fetchProperties = () => (dispatch) => {
  dispatch(propertiesSpinnerOpen());
  getItems(dispatch, 'properties', propertiesLoaded);
};

export { fetchProperties, propertiesError, propertiesSpinnerOpen, propertiesSpinnerClose, propertiesLoaded };