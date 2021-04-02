import {applyMiddleware, combineReducers, createStore} from "redux";
import productsReducer from "./reducers/products-reducer";
import propertiesReducer from "./reducers/properties-reducer";
import thunk from "redux-thunk";


const reducers = combineReducers({
    products: productsReducer,
    properties: propertiesReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;