'use client'; // converting client side to the server side 

import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";

import styles from './signin.module.css';
import { User } from "firebase/auth";

interface SignInProps {
    user: User| null;
}

export default function SignIn({user}: SignInProps) {
    // good to explicitly set the type of this


// if the user is signed in, the sign out button gets rendered
// the the user is signed out, the sign in button get renders, subtle difference, important to differentiate
    return (
        <Fragment>
            {
                user ? 
                (
                <button className={styles.signin } onClick={signOut}>
                Sign Out 
                </button>

                ):(
                <button className={styles.signin } onClick={signInWithGoogle}>
                Sign In 
                </button>
                )
            }
        </Fragment>
    )
}

