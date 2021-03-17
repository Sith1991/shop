const initialState = {
    products: [],
    term: '',
    columnName: 'itemName',
    loading: true,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        default: return state
    }
}

export default productsReducer;