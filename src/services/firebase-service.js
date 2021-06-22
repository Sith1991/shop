import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const getItems = (dispatch, items, itemsLoaded) => {
    const db = firebase.database();                     // нельзя выносить как общую переменную, иначе выдает ошибку
    const dbDataRef = db.ref().child(`${items}`);
    dbDataRef.on('value', snap => {
        const data = snap.val();
        if (data === null) {
            dispatch((itemsLoaded([])))
        } else {
            dispatch((itemsLoaded(data)))
        }
    })
};

const deleteItem = async (key, path, itemError, deletedItem) => {
    const db = firebase.database();
    const ref = db.ref(`${path}`);
    const dbDataRef = ref.child(key);
    await dbDataRef.set(null, function (error) {        // отправляем null для того чтобы удалть полностью свойство по ключу key
        if (error) {
            itemError(error);
        } else {
            deletedItem();
        }
    });
}

const getSelectedProduct = (dispatch, selectedProductLoaded, itemId) => {
    const db = firebase.database();
    const dbDataRef = db.ref().child('products');
    dbDataRef.on('value', snap => {
        const data = snap.val();
        if (data === null) {
            dispatch((selectedProductLoaded([])))
        } else {
            dispatch((selectedProductLoaded(data, itemId)))
        }
    })
}

const getUserAuth = (dispatch, userIsLoggedIn, userIsNotLoggedIn) => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                dispatch(userIsLoggedIn(firebaseUser.email));
            } else {
                dispatch(userIsNotLoggedIn());
            }
        }
    )
}

const userLogOut = () => {
    firebase.auth().signOut()
        .then(e => console.log(e))
        .catch(e => console.log(e));
}

export {
    getItems,
    deleteItem,
    getSelectedProduct,
    getUserAuth,
    userLogOut,
}
