import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

export const emailSignUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
