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
        .then(() => console.log('sign out'))
        .catch(e => console.log(e));
}

const submitLogIn = (values) => {
    const {email, password} = values;
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password)

}

const submitRegistration = (values) => {
    const {email, password} = values;
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password)

}

const postItemsToDatabase = async (newValues, path, itemError, itemSpinnerClose, notificationItem) => {
    const db = firebase.database();
    const ref = db.ref(`${path}`);
    const dbDataRef = ref.push();
    await dbDataRef.set(newValues, function (error) {
        if (error) {
            itemError(error);
        } else {
            itemSpinnerClose();
            notificationItem();
        }
    });
}

export {
    getItems,
    deleteItem,
    getSelectedProduct,
    getUserAuth,
    userLogOut,
    submitLogIn,
    submitRegistration,
    postItemsToDatabase
}
