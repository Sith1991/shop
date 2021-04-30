import {
    FETCH_SELECTED_PRODUCT_FAILURE,
    FETCH_SELECTED_PRODUCT_REQUEST,
    FETCH_SELECTED_PRODUCT_SUCCESS
} from "../../action-types";
import firebase from 'firebase/app';
import 'firebase/database'

const selectedProductLoaded = (products, itemId) => {
    const objectsToArray = Object.values(products);
    const getKeysToArray = Object.keys(products);
    for (let i = 0; i < getKeysToArray.length; i++) {       // добавляю свойство id для того что бы через него редактировать или удалять необходимые объекты
        objectsToArray[i].id = getKeysToArray[i]
    }
    const product = objectsToArray.find(({id}) => id == itemId);
    console.log('products:', products, 'itemId:', itemId, 'product:', product);
    return {
        type: FETCH_SELECTED_PRODUCT_SUCCESS,
        payload: product
    }
}

const selectedProductRequested = () => {
    return {
        type: FETCH_SELECTED_PRODUCT_REQUEST,
    }
}

const selectedProductError = (error) => {
    return {
        type: FETCH_SELECTED_PRODUCT_FAILURE,
        payload: error,
    }
}

const fetchSelectedProduct = (itemId) => (dispatch) => {
    dispatch(selectedProductRequested());
    const db = firebase.database();
    const dbDataRef = db.ref().child('data');
    dbDataRef.on('value', snap => {
        const data = snap.val();
        if (data === null) {
            dispatch((selectedProductLoaded([])))
        } else {
            dispatch((selectedProductLoaded(data, itemId)))
        }
    })
}

export {
    fetchSelectedProduct
}