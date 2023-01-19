import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  AuthError,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestoreDB } from "../firebase.config";

export default function useAuth() {
  //   const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const signUp = async (email: string, password: string, fullname: string) => {
    setError(null);
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

      setIsPending(false);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      setIsPending(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    }
  };

  return { signUp, signIn, error, isPending };
}
