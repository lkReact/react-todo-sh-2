import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA7GPTRWG9fNk_AesUoRdeOGmsyxvxIYaA",
  authDomain: "cakesproject-ff7cd.firebaseapp.com",
  projectId: "cakesproject-ff7cd",
  storageBucket: "cakesproject-ff7cd.appspot.com",
  messagingSenderId: "196770645584",
  appId: "1:196770645584:web:f25c359faff82b3ec17355"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db