import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestoreDB } from "../firebase.config";
import { toast } from "react-toastify";

export default function useAuth() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigateTo = useNavigate();

  const signUp = async (email: string, password: string, fullname: string) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential) {
        throw new Error("Could not complete signup");
      }
      await updateProfile(userCredential.user, { displayName: fullname });
      // Store user credential info into Firestore Database in users collection
      const timestamp = serverTimestamp();
      await setDoc(doc(firestoreDB, "users", userCredential.user.uid), {
        fullname: userCredential.user.displayName,
        email: userCredential.user.email,
        timestamp,
      });
      toast.success("User sign up successfully");
      setTimeout(() => {
        setIsPending(false);
        navigateTo("/");
      }, 2000);
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
      setIsPending(false);
    }
  };

  const googleAuth = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = userCredential.user;
      const timestamp = serverTimestamp();

      // Check if the user does exist in the user collections
      const docRef = doc(firestoreDB, "users", uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        // Store user credential info into Firestore Database in users collection
        await setDoc(doc(firestoreDB, "users", uid), {
          fullname: displayName,
          email,
          timestamp,
        });
        toast.success("User sign up successfully");
        setTimeout(() => {
          setIsPending(false);
          navigateTo("/");
        }, 2000);
      } else {
        toast.error("User already signed up");
      }
    } catch (error) {
      toast.error("Could not authorize with Google Server");
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("signed in successfully");
        setTimeout(() => {
          setIsPending(false);
          navigateTo("/");
        }, 2000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
      setIsPending(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
      navigateTo("/sign-in");
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
    }
  };

  return { signUp, signIn, googleAuth, forgotPassword, signOutUser, isPending };
}
