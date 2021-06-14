import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import productsReducer from "./reducers/products-reducer";
import propertiesReducer from "./reducers/properties-reducer";
import productCardReducer from "./reducers/product-card-reducer";
import thunk from "redux-thunk";
import notificationsReducer from "./reducers/notifications-reducer";

const reducers = combineReducers({
    products: productsReducer,
    properties: propertiesReducer,
    selectedProduct: productCardReducer,
    notifications: notificationsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;