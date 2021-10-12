import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCyfU5QnPL3PNm5x52GooGclBF8wcBIOAE",
  authDomain: "educred-78f39.firebaseapp.com",
  projectId: "educred-78f39",
  storageBucket: "educred-78f39.appspot.com",
  messagingSenderId: "170621206655",
  appId: "1:170621206655:web:5524bbba4d53cd5b253f4a"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;