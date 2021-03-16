import {PROPERTIES_LOADED} from "../../action-types";

const propertiesLoaded = (newItems) => {
    return {
        type: PROPERTIES_LOADED,
        payload: newItems
    }
}

export {
    propertiesLoaded
}