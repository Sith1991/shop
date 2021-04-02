import firebase from 'firebase/app';
import 'firebase/database'


export default class FirebaseShopService {

    data = [];

    newData = (newArr) => {
        console.log(this.data)
        return (
            this.data = newArr.splice(0)
            )
    }

    db = firebase.database();
    dbDataRef = this.db.ref().child('data');
    res = this.dbDataRef.on('value', snap => {
        this.newData(snap.val())
        console.log('this data',this.data);
        console.log('snap',snap.val());
    })

    getItems = async () => {
        await this.res;
        console.log('this data in service',this.data);
        return this.data;
    }
};
