import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserData {
  firstName?: string;
  lastName?: string;
}

export function useSignUpAuth() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUpWithEmail = async (email: string, password: string, userData?: UserData) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store additional user data in Firestore
      if (userData && userCredential.user) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: email,
          createdAt: new Date().toISOString()
        });
      }
      
      window.location.href = '/splashscreen.html';
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Store additional user data from Google profile
      if (result.user) {
        const names = result.user.displayName?.split(' ') || ['', ''];
        await setDoc(doc(db, 'users', result.user.uid), {
          firstName: names[0],
          lastName: names.slice(1).join(' '),
          email: result.user.email,
          createdAt: new Date().toISOString()
        });
      }
      
      window.location.href = '/splashscreen.html';
    } catch (err) {
      setError('Failed to sign up with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, signUpWithEmail, signUpWithGoogle };
}
