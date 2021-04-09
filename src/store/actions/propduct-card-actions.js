import {
    FETCH_SELECTED_PRODUCT_FAILURE,
    FETCH_SELECTED_PRODUCT_REQUEST,
    FETCH_SELECTED_PRODUCT_SUCCESS
} from "../../action-types";
import firebase from 'firebase/app';
import 'firebase/database'

const selectedProductLoaded = (products, itemId) => {
    const product = products.find(({id}) => id == itemId);
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