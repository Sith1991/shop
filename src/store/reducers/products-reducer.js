const initialState = {
    products: [],
    term: '',
    columnName: 'itemName',
    loading: true,
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                ...state,
                loading: true,
                error: null,
            }
        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        case 'PRODUCTS_ERROR':
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