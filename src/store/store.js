import {combineReducers, createStore} from "redux";
import productsReducer from "./reducers/products-reducer";
import propertiesReducer from "./reducers/properties-reducer";


const reducers = combineReducers({
    products: productsReducer,
    properties: propertiesReducer,
});

const store = createStore(reducers);

export default store;