import React, { FormEvent, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function Login() {
  // Function to save or update user data
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

        // Set status to offline when the tab or browser is closed
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
      console.log('Google Sign-In successful:', user);
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
      console.log('Sign-In successful:', user);
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">Login</h1>
        <p className="text-gray-300 text-center mb-6">
          Create notes in minutes. Free forever. No credit card required.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 px-4 rounded-lg mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800/50 text-gray-400">OR</span>
          </div>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Sign Up
            </a>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-indigo-400 hover:text-indigo-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
