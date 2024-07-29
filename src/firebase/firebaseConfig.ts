import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIza....",
    authDomain: "voting-system-90d8d.firebaseapp.com",
    databaseURL: "https://voting-system-90d8d.firebaseio.com",
    projectId: "voting-system-90d8d",  // Ensure you have projectId
    storageBucket: "voting-system-90d8d.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"  // Ensure you have appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
