
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCUuNYI-G8xQQRaMIE0wQcXq8g9sy1MzT8",
    authDomain: "facebook-clone-92afe.firebaseapp.com",
    databaseURL: "https://facebook-clone-92afe.firebaseio.com",
    projectId: "facebook-clone-92afe",
    storageBucket: "facebook-clone-92afe.appspot.com",
    messagingSenderId: "404909957101",
    appId: "1:404909957101:web:383e1e457d3d5a7a84d1e4",
    measurementId: "G-F3G8TW2S4Q"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider, storage};
  export default db;