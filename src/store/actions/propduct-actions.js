import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS} from "../../action-types";
import firebase from 'firebase/app';
import 'firebase/database'

const productsLoaded = (newItems) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: newItems
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
    const db = firebase.database();
    const dbDataRef = db.ref().child('data');
    dbDataRef.on('value', snap => {
        const data = snap.val();
        dispatch((productsLoaded(data)))
    })
}

const fetchProducts1 = (shopService, dispatch) => () => {
    dispatch(productsRequested());   // для отображения спинера при переходе на данную страницу с других страниц
    shopService.getItems()
        .then((data) => dispatch(productsLoaded(data)))
        .catch((error) => dispatch(productsError(error)))
}

/*const fetchProducts = (shopService, dispatch) => () => {
    dispatch(productsRequested());   // для отображения спинера при переходе на данную страницу с других страниц
                dispatch(productsLoaded(data))

        .catch((error) => dispatch(productsError(error)))
};*/

export {
    fetchProducts
}