// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import dotenv from 'dotenv';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // use import.meta.env.VITE_ to access environment variables instead of process.env which is not supported in ES modules
    authDomain: "mern-blog-a73ed.firebaseapp.com",
    projectId: "mern-blog-a73ed",
    storageBucket: "mern-blog-a73ed.appspot.com",
    messagingSenderId: "844286176109",
    appId: "1:844286176109:web:721cc7a70c384cc5d58864"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);