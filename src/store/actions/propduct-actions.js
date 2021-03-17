import {PRODUCTS_LOADED, PRODUCTS_REQUESTED} from "../../action-types";

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

export {
    productsLoaded,
    productsRequested
}