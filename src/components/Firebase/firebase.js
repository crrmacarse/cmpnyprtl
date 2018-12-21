import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
    Configurations are saved inside .env file

    Firebase class is instantiated upon start on index.js

    READ MORE HERE: https://firebase.google.com/docs/web/setup
*/
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);

    // personalized function call to firebase db

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users/');

    businessUnits = () => this.db.ref('bussinessUnit/');

    items = (businessunit) => this.db.ref('data/items/'+businessunit);

    doCreateItem = (businessunit) => this.db.ref('data/items/'+businessunit);

    calendar = () => this.db.ref('calendar/');

}

export default Firebase