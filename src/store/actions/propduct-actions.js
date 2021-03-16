import {PRODUCTS_LOADED} from "../../action-types";

const productsLoaded = (newItems) => {
    return {
        type: PRODUCTS_LOADED,
        payload: newItems
    }
}

export {
    productsLoaded
}