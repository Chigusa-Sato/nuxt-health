import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDOKh1B4kgRitJtks0IMWGDpU6X4yXEvhk",
    authDomain: "health-app-5b4a4.firebaseapp.com",
    projectId: "health-app-5b4a4",
    storageBucket: "health-app-5b4a4.appspot.com",
    messagingSenderId: "185938200484",
    appId: "1:185938200484:web:33e704d02fcc3823616331",
    measurementId: "G-3K0N6C6W94"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);

}

export default firebase;
