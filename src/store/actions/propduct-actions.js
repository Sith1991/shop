import {PRODUCTS_ERROR, PRODUCTS_LOADED, PRODUCTS_REQUESTED} from "../../action-types";

const productsLoaded = (newItems) => {
    return {
        type: PRODUCTS_LOADED,
        payload: newItems
    }
}

const productsRequested = () => {
    return {
        type: PRODUCTS_REQUESTED,
    }
}

const productsError = (error) => {
    return {
        type: PRODUCTS_ERROR,
        payload: error,
    }
}

export {
    productsLoaded,
    productsRequested,
    productsError
}