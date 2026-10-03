// // src/auth.js
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "./firebase";

// /**
//  * Sign up new user
//  */
// export const signupUser = async (name, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     // Update display name
//     await updateProfile(userCredential.user, { displayName: name });
//     return userCredential.user;
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw error;
//   }
// };

// /**
//  * Login existing user
//  */
// export const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// /**
//  * Logout user
//  */
// export const logoutUser = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     console.error("Logout error:", error);
//     throw error;
//   }
// };

// /**
//  * Listen to auth state changes
//  */
// export const onAuthChange = (callback) => {
//   return onAuthStateChanged(auth, callback);
// };

// /**
//  * Get friendly error message
//  */
// export const getAuthErrorMessage = (errorCode) => {
//   const messages = {
//     "auth/email-already-in-use": "Ye email pehle se registered hai",
//     "auth/invalid-email": "Email sahi nahi hai",
//     "auth/weak-password": "Password kam se kam 6 characters ka hona chahiye",
//     "auth/user-not-found": "Is email se koi account nahi mila",
//     "auth/wrong-password": "Password galat hai",
//     "auth/invalid-credential": "Email ya password galat hai",
//     "auth/too-many-requests": "Bohot zyada attempts. Thodi der baad try karo",
//     "auth/network-request-failed": "Internet connection check karo",
//   };
//   return messages[errorCode] || "Kuch galat ho gaya. Dobara try karo";
// };





// src/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { saveUserToFirestore } from "./firestore";

/**
 * Sign up new user + save to Firestore
 */
export const signupUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    await updateProfile(userCredential.user, { displayName: name });

    // Save user document to Firestore
    await saveUserToFirestore(userCredential.user.uid, {
      name,
      email,
      cart: {},
      createdAt: new Date(),
    });

    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Login existing user
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get friendly error message
 */
export const getAuthErrorMessage = (errorCode) => {
  const messages = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password must be at least 6 characters",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-credential": "Invalid email or password",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed": "Check your internet connection",
  };
  return messages[errorCode] || "Something went wrong. Please try again";
};





