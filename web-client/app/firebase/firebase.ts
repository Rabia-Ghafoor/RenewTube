// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider, 
    onAuthStateChanged, // detects if a user has signed in or signed out 
    User, 
 } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC39aaL9gWDXuMGXIvF2V-Yc4ZACglxPp8",
  authDomain: "renewtube-f9119.firebaseapp.com",
  projectId: "renewtube-f9119",
  //storageBucket: "renewtube-f9119.appspot.com",
  // already have my own storage bucket from the GCP
 // messagingSenderId: "513968607770",
  appId: "1:513968607770:web:579cb4ddcbc947d987b7a3",
 // measurementId: "G-RB0YTZVC2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/** 
 * Signs in a user with the google popup feature 
 * @return a promise that resolves with the user's credetials 
 */

export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider());


}


/**
 * Signs the user out 
 * @return a promise that gets resolved when the user signs out
 */

export function signOut(){
    return auth.signOut();
}


/**
 * This trigiers  a callback function when the user auth changes 
 * @return a function to unsubscribe callback
 */

export function onAuthStateChangedHelper (callback: ( user: User| null) => void ){
    return onAuthStateChanged(auth, callback);
}