import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useSignUpAuth() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
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
      await signInWithPopup(auth, provider);
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
