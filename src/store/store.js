import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
  productsReducer,
  propertiesReducer,
  productCardReducer,
  notificationsReducer,
  isAuthReducer,
} from './reducers';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  products: productsReducer,
  properties: propertiesReducer,
  selectedProduct: productCardReducer,
  notifications: notificationsReducer,
  isAuth: isAuthReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;