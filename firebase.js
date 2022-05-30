import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwy0SVH8ojq0CfaBBPLgTjCJj11_evYas",
    authDomain: "signal-clone-4127e.firebaseapp.com",
    projectId: "signal-clone-4127e",
    storageBucket: "signal-clone-4127e.appspot.com",
    messagingSenderId: "657332609440",
    appId: "1:657332609440:web:c04f117a98e7eefea4c4c5"
  };

  let app;

  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
  }
  else{
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};