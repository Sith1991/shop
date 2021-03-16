const initialState = {
    properties: []
};

const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROPERTIES_LOADED':
            return {
                properties: action.payload
            };
        default: return state
    }
}

export default propertiesReducer;