import {FETCH_PROPERTIES_FAILURE, FETCH_PROPERTIES_REQUEST, FETCH_PROPERTIES_SUCCESS} from "../../action-types";

const propertiesReducer = (state, action) => {

    if (state === undefined) {
        return {
            properties: [],
            loading: true,
            error: null,
        }
    }

    switch (action.type) {
        case FETCH_PROPERTIES_SUCCESS:
            return {
                properties: action.payload,
                loading: false,
                error: null,
            };

        case FETCH_PROPERTIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case FETCH_PROPERTIES_FAILURE:
            return {
                properties: [],
                loading: false,
                error: action.payload,
            }

        default: return state
    }
}

export default propertiesReducer;