import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
} from "../../action-types";
import firebase from 'firebase/app';
import 'firebase/database'

const productsLoaded = (newItems) => {
    const objectsToArray = Object.values(newItems);
    const getKeysToArray = Object.keys(newItems);
    for (let i = 0; i < getKeysToArray.length; i++) {       // добавляю свойство id для того что бы через него редактировать или удалять необходимые объекты
        objectsToArray[i].id = getKeysToArray[i]
    }
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: objectsToArray
    }
}

const productsRequested = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
    }
}

const productsError = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error,
    }
}

const fetchProducts = () => (dispatch) => {
    dispatch(productsRequested());
    const db = firebase.database();
    const dbDataRef = db.ref().child('products');
    dbDataRef.on('value', snap => {
        const data = snap.val();
        if (data === null) {
            dispatch((productsLoaded([])))
        } else {
            dispatch((productsLoaded(data)))
        }
    })
}

export {
    fetchProducts,
    productsError
}