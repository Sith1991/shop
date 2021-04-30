import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBqzyhjRSQnQiJdwh2_P2W-wS6XMhowBuI",
    authDomain: "shop-app-firebase.firebaseapp.com",
    databaseURL: "https://shop-app-firebase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-app-firebase",
    storageBucket: "shop-app-firebase.appspot.com",
    messagingSenderId: "159676401640",
    appId: "1:159676401640:web:ef06138de6d79548f6065d"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};