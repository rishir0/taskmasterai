// src/lib/pricing-firebase.ts
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from './firebase'; // Make sure this matches whatever you're exporting from firebase.ts

const auth = getAuth(app);

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
