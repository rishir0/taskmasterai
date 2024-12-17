// src/lib/pricing-firebase.ts
import { firebase } from './firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(firebase);

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
