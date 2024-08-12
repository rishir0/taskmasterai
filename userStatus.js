// userStatus.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Function to save or update user data
const saveUserData = async (user, onlineStatus) => {
    const db = getFirestore();
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Anonymous",
            online: onlineStatus,
            lastSeen: serverTimestamp() // Use server timestamp
        }, { merge: true });
        console.log(`User data saved and online status set to ${onlineStatus}`);
    } catch (error) {
        console.error("Error saving user data:", error);
    }
};

// Function to initialize user status tracking
export const initializeUserStatus = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            saveUserData(user, true); // Set status to online

            // Set status to offline when the tab or browser is closed
            window.addEventListener('beforeunload', () => {
                saveUserData(user, false); // Set status to offline
            });

            // Set status to offline when the user explicitly logs out
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    await saveUserData(user, false);
                    await auth.signOut();
                    window.location.href = "signin.html"; // Redirect to sign-in page after logging out
                });
            }
        }
    });
};
