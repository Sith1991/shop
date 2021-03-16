const initialState = {
    products: [
        {
            id: 0,
            itemName: 'Mercedes S550 4matic',
            price: 118000,
            dateOfChange: '31.10.18'
        },
        {
            id: 1,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 2,
            itemName: 'DURUN DURUN HOUSE',
            price: 1216000,
            dateOfChange: '01.11.18'
        },
    ],
    term: '',
    columnName: 'itemName'
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