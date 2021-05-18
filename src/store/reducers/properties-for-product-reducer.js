import {SET_LAST_PROPERTIES} from "../../action-types";

const propertiesForProductReducer = (state, action) => {

    if (state === undefined) {
        return {
            selectedProperties: [],
            lastProperties: [],
        }
    }

    switch (action.type) {
        case SET_LAST_PROPERTIES:
            return {
                selectedProperties: [],
                lastProperties: action.payload,
            }
        default:
            return state
    }
}

export default propertiesForProductReducer;