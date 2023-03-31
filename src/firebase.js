import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD0Bc0r9IHUYaP6PJvpC7Pt-7Nr_ShFxQ",
  authDomain: "clone-phim.firebaseapp.com",
  projectId: "clone-phim",
  storageBucket: "clone-phim.appspot.com",
  messagingSenderId: "106527827733",
  appId: "1:106527827733:web:03521be9b5592c239eab1c",
  measurementId: "G-NJYTK8TX3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase auth instance
const auth = getAuth(app);

// Export the Firebase auth instance and GoogleAuthProvider as named exports
export { auth, GoogleAuthProvider };
