import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBqzyhjRSQnQiJdwh2_P2W-wS6XMhowBuI',
  authDomain: 'shop-app-firebase.firebaseapp.com',
  databaseURL:
    'https://shop-app-firebase-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'shop-app-firebase',
  storageBucket: 'shop-app-firebase.appspot.com',
  messagingSenderId: '159676401640',
  appId: '1:159676401640:web:ef06138de6d79548f6065d',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const getItems = async (dispatch, items, itemsLoaded) => {
  const db = firebase.database(); // нельзя выносить как общую переменную, иначе выдает ошибку
  const dbDataRef = db.ref().child(`${items}`);
  await dbDataRef.on('value', (snap) => {
    const data = snap.val();
    if (data === null) {
      dispatch(itemsLoaded([]));
    } else {
      dispatch(itemsLoaded(data));
    }
  });
};

const deleteItem = async (key, path, itemError, deletedItem) => {
  const db = firebase.database();
  const ref = db.ref(`${path}`);
  const dbDataRef = ref.child(key);
  await dbDataRef.set(null, function (error) {
    // отправляем null для того чтобы удалть полностью свойство по ключу key
    if (error) {
      itemError(error);
    } else {
      deletedItem();
    }
  });
};

const getSelectedProduct = async (dispatch, selectedProductLoaded, itemId) => {
  const db = firebase.database();
  const dbDataRef = db.ref().child('products');
  await dbDataRef.on('value', (snap) => {
    const data = snap.val();
    if (data === null) {
      dispatch(selectedProductLoaded([]));
    } else {
      dispatch(selectedProductLoaded(data, itemId));
    }
  });
};

const getUserAuth = (dispatch, userIsLoggedIn, userIsNotLoggedIn) => {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      dispatch(userIsLoggedIn(firebaseUser.email));
    } else {
      dispatch(userIsNotLoggedIn());
    }
  });
};

const userLogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch(() => {});
};

const submitLogIn = (values) => {
  const { email, password } = values;
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

const submitRegistration = (values) => {
  const { email, password } = values;
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};

const postItemsToDatabase = async (
  newValues,
  path,
  itemError,
  itemSpinnerClose,
  notificationItem
) => {
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
};

const putItemsToDatabase = async (
  newValues,
  itemId,
  path,
  itemError,
  itemSpinnerClose,
  notificationItem
) => {
  const db = firebase.database();
  const ref = db.ref(`${path}`);
  const dbDataRef = ref.child(itemId);
  await dbDataRef.set(newValues, function (error) {
    if (error) {
      itemError(error);
    } else {
      itemSpinnerClose();
      notificationItem();
    }
  });
};

// получение таймстампа с сервера Firebase
const getDateOfChange = () => {
  return firebase.database.ServerValue.TIMESTAMP;
};

export {
  storage,
  getItems,
  deleteItem,
  getSelectedProduct,
  getUserAuth,
  userLogOut,
  submitLogIn,
  submitRegistration,
  postItemsToDatabase,
  putItemsToDatabase,
  getDateOfChange,
};
