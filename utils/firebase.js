// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCOMqNuuFtsBO-ZGbGPnjuEos56EJaJgM",
  authDomain: "excomarket-57a70.firebaseapp.com",
  projectId: "excomarket-57a70",
  storageBucket: "excomarket-57a70.appspot.com",
  messagingSenderId: "886619857597",
  appId: "1:886619857597:web:ae6800a8aa6578f8560dd4"
};

// Initialize Firebase
let app;

if (firebase.apps.length ===0){
    app =firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}



const auth = firebase.auth()

export { auth };