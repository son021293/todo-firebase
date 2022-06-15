import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBo5WijTbLqLzQUBaKcgroBDqViwIYYM2U",
    authDomain: "todosample-c0ff3.firebaseapp.com",
    projectId: "todosample-c0ff3",
    storageBucket: "todosample-c0ff3.appspot.com",
    messagingSenderId: "938006259277",
    appId: "1:938006259277:web:809bdc76484da3239a1e04",
    measurementId: "G-1J19RM6V5H"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp)

  export { db }