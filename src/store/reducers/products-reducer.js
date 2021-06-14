import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS} from "../../action-types";

const productsReducer = (state, action) => {

    if (state === undefined) {
        return {
            products: [],
            loading: true,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                products: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default productsReducer;