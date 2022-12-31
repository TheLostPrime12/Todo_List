import firebase from 'firebase'
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-3tnnV5ZErkKDajfS02F-3z3O29RgSfg",
    authDomain: "todolist-3f859.firebaseapp.com",
    projectId: "todolist-3f859",
    storageBucket: "todolist-3f859.appspot.com",
    messagingSenderId: "1092390459141",
    appId: "1:1092390459141:web:9172f5cdc6b55bc62c896c"
}

class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            }else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {callback(error);
                    });
                }
            
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            });
            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid
    }

    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists");
    }

    detach() {
        this.unsubscribe();
    }

}

export default Fire;


