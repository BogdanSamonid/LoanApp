import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDWB0Ej8EWzJtLNvXlXC-8p6SyfqjuefgE",
    authDomain: "loanapp-a4cca.firebaseapp.com",
    projectId: "loanapp-a4cca",
    storageBucket: "loanapp-a4cca.appspot.com",
    messagingSenderId: "925688735344",
    appId: "1:925688735344:web:976fee548562764e5d76b5"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
