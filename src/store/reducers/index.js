const initialState = {
    items: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ITEMS_LOADED':
            return {
                items: action.payload
            }
        default: return state
    }
}

export default reducer;