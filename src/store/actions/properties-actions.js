import {
    FETCH_PROPERTIES_FAILURE,
    FETCH_PROPERTIES_REQUEST,
    FETCH_PROPERTIES_SUCCESS
} from "../../action-types";
import firebase from 'firebase/app';
import 'firebase/database';

const propertiesLoaded = (newItems) => {
    const objectsToArray = Object.values(newItems);
    const getKeysToArray = Object.keys(newItems);
    for (let i = 0; i < getKeysToArray.length; i++) {       // добавляю свойство key для того что бы через него редактировать или удалять необходимые объекты
        objectsToArray[i].key = getKeysToArray[i]
    }
    return {
        type: FETCH_PROPERTIES_SUCCESS,
        payload: objectsToArray
    }
}

const propertiesRequested = () => {
    console.log('Request')
    return {
        type: FETCH_PROPERTIES_REQUEST,
    }
}

const propertiesError = (error) => {
    return {
        type: FETCH_PROPERTIES_FAILURE,
        payload: error,
    }
}

const fetchProperties = () => (dispatch) => {
    dispatch(propertiesRequested());
    const db = firebase.database();
    const dbDataRef = db.ref().child('properties');
    dbDataRef.on('value', snap => {
        const data = snap.val();
        if (data === null) {
            dispatch((propertiesLoaded([])))
        } else {
            dispatch((propertiesLoaded(data)))
        }
    })
}

export {
    fetchProperties
}