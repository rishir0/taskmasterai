// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaMAlQRMXiDsZ4P0b06P18id3y5xBiZ1k",
  authDomain: "deepworkai-c3419.firebaseapp.com",
  projectId: "deepworkai-c3419",
  storageBucket: "deepworkai-c3419.appspot.com",
  messagingSenderId: "367439182644",
  appId: "1:367439182644:web:751eceb9cbf4a54d68c361",
  measurementId: "G-QSH2KK5Q4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db references for use in other parts of your app
export { auth, db };
