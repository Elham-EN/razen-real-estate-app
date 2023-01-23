import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase.config";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

  //use the useEffect hook to handle the onAuthStateChanged() observer from
  //Firebase Authentication, because it allows you to synchronize the component
  //with the user's authentication state.
  useEffect(() => {
    // const auth = getAuth();
    /**
     * Set an authentication state observer and get user data. Attach the
     * observer using the onAuthStateChanged method. When a user successfully
     * signs in, you can get information about the user in the observer.
     * This observer gets called whenever the user's sign-in state changes.
     */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        //User is signed in
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
    //when the component unmounts, the unsubscribe() function is called automatically,
    //which stops the observer from listening to the user's authentication state, it
    //prevents any memory leaks.
    return () => unsubscribe();
  }, []);

  return { loggedIn, checkingStatus };
}
