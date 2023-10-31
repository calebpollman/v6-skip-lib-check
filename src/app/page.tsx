"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Amplify } from "aws-amplify";
import React from "react";
import config from "./aws-exports";
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";

Amplify.configure(config);

let id = 0;
export default function Home() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    id++;
    console.log(`getCurrentUser call: ${id}`);

    getCurrentUser()
      .then(() => {
        console.log(`Success: ${id}`);
        setIsSignedIn(true);
      })
      .catch((e) => {
        console.log(`Failure: ${id}`);
        console.log("Error:", e);
        setIsSignedIn(false);
      });
  }, []);

  return (
    <main className={styles.main}>
      {!isSignedIn ? (
        <button
          onClick={async () => {
            try {
              console.log("signInWithRedirect call");
              await signInWithRedirect({ provider: "Google" });
            } catch (e) {
              console.log("Error", e);
            }
          }}
        >
          Go to Google
        </button>
      ) : (
        <button onClick={() => signOut({ global: true })}>Sign out</button>
      )}
    </main>
  );
}
