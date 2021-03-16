const initialState = {
    products: [],
    term: '',
    columnName: 'itemName'
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload
            };
        default: return state
    }
}

export default productsReducer;