'use client';

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";
import SignIn from "./signin";

import { onAuthStateChangedHelper } from "../firebase/firebase"; 
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Navbar() {
    // init  user state  
    const [user, setUser] = useState<User| null>(null);
   
    useEffect (()=>  {
     const unsubsribe = onAuthStateChangedHelper((user) => {

        setUser(user);

        })
        return () => unsubsribe();
    });

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image width={90} height={20}
          src="/youtube-logo.svg" alt="Renewtube Logo"/>
      </Link>
      {
        
      }
      <SignIn user = {user}/>
    </nav>
  );
}
