import {SET_LAST_PROPERTIES} from "../../action-types";


const updSelectedProperties = () => {

}

const setLastProperties = (props) => {
    return {
        type: SET_LAST_PROPERTIES,
        payload: props,
    }
}

export {updSelectedProperties}