import React, { useState } from "react";
import { auth, googleauth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

export default function Authentication() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(auth?.currentUser?.email);
  const signin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const GoggleSignin = async () => {
    try {
      await signInWithPopup(auth, googleauth);
    } catch (err) {
      console.log(err);
    }
  };
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ margin: "0px auto" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={signin}>SignIn</button>
        <button onClick={signout}>SignOut</button>
        <br />
        <br />
        <button onClick={GoggleSignin}>Google Sign in</button>
      </div>
    </>
  );
}
