import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB31ucwAQ1qks38tuvDjwBH2voL3-6HatA",
    authDomain: "car-loan-backend.firebaseapp.com",
    projectId: "car-loan-backend",
    storageBucket: "car-loan-backend.firebasestorage.app",
    messagingSenderId: "771945877742",
    appId: "1:771945877742:web:13d8d2fec9651b579423ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);