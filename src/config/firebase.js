import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBBZ211g4zCdHs-2f7k9v68x89_Le9npOg",
  authDomain: "learn-firebase-react-8815f.firebaseapp.com",
  projectId: "learn-firebase-react-8815f",
  storageBucket: "learn-firebase-react-8815f.appspot.com",
  messagingSenderId: "866004224422",
  appId: "1:866004224422:web:f1c92d3298fc6a32f0e767",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleauth = new GoogleAuthProvider(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
