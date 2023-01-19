import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  AuthError,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestoreDB } from "../firebase.config";
import { toast } from "react-toastify";

export default function useAuth() {
  //   const [user, setUser] = useState<User | null>(null);
  // const [errorExist, setErrorExist] = useState<boolean>(false);
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
      navigateTo("/");
      setIsPending(false);
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
      setIsPending(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const authError = err as AuthError;
    }
  };

  return { signUp, signIn, isPending };
}
