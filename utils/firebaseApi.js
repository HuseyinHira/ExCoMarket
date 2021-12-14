// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxl_0VB_LBw_T-h-5zZo5SqfzuZUffi3o",
  authDomain: "deneme-d480a.firebaseapp.com",
  projectId: "deneme-d480a",
  storageBucket: "deneme-d480a.appspot.com",
  messagingSenderId: "661769384341",
  appId: "1:661769384341:web:3127277f35a34e7510869c"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0 ){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

export const auth = firebase.auth()

export const database = app.firestore()