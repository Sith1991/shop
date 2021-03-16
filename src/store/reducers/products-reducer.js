const initialState = {
    products: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_LOADED':
            return {
                products: action.payload
            };
        default: return state
    }
}

export default productsReducer;