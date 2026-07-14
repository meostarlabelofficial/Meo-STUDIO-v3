import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "valiant-antler-96rpq",
  appId: "1:223697566417:web:b8a1021a05c68f998b23f0",
  apiKey: "AIzaSyCv2IWewbbHlrc0j7LO9TcFcOHe9_cM8mc",
  authDomain: "valiant-antler-96rpq.firebaseapp.com",
  storageBucket: "valiant-antler-96rpq.firebasestorage.app",
  messagingSenderId: "223697566417"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-meostudio-ca569103-5801-4a1d-b34d-4702bc1ef3f8");
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
