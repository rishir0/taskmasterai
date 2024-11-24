import { FormEvent, useEffect } from 'react';
import { auth, db } from '../lib/login-firebase';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function useLoginAuth() {
  const saveUserData = async (user: any, onlineStatus: boolean) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        online: onlineStatus,
        lastSeen: serverTimestamp()
      }, { merge: true });
      console.log(`User data saved and online status set to ${onlineStatus}`);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveUserData(user, true);
        window.addEventListener('beforeunload', () => {
          saveUserData(user, false);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveUserData(user, true);
      window.location.href = "/dashboard";
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/popup-closed-by-user":
          alert("Google login canceled.");
          break;
        case "auth/cancelled-popup-request":
          alert("Google login canceled.");
          break;
        case "auth/network-request-failed":
          alert("Network error. Please check your internet connection and try again.");
          break;
        default:
          console.error('Error with Google Sign-In:', errorCode, error.message);
          alert(`Unexpected error with Google Sign-In: ${errorCode}. Please try again.`);
      }
    }
  };

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await saveUserData(user, true);
      window.location.href = "/dashboard";
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email. Please check your email address.");
          break;
        case "auth/invalid-email":
          alert("The email address is not valid. Please check and try again.");
          break;
        case "auth/invalid-credential":
          alert("Invalid credentials. Please try again or reset your password.");
          break;
        default:
          console.error('Error signing in:', errorCode, error.message);
          alert(`Unexpected error signing in: ${errorCode} - ${error.message}`);
      }
    }
  };

  return {
    handleGoogleSignIn,
    handleEmailSignIn
  };
}
