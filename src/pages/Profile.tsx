import { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { auth, firestoreDB } from "../firebase.config";
import { updateProfile, AuthError } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Profile(): JSX.Element {
  const [formData, handleChange] = useForm();
  const [changeDetail, setChangeDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { signOutUser } = useAuth();

  useEffect(() => {
    //Update the input field, get the current authenticated user info
    handleChange("fullname", auth.currentUser?.displayName as string);
    handleChange("email", auth.currentUser?.email as string);
  }, []);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleChange("fullname", event.target.value);
  };

  const handleSignOut = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await signOutUser();
  };

  //Update user fullname
  const onSubmit = async () => {
    try {
      if (
        auth.currentUser?.displayName !== formData.fullname &&
        auth.currentUser
      ) {
        //Udpate display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: formData.fullname,
        });
        //Update fullname in the firestore
        const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          fullname: formData.fullname,
        });
      }
      toast.success("User Profile details updated");
    } catch (err) {
      const authError = err as AuthError;
      toast.error(authError.message);
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[55%] mt-6 mx-auto">
          <form>
            <input
              type="text"
              id="name"
              value={formData.fullname}
              placeholder="Update your full name"
              disabled={!changeDetail}
              onChange={handleChangeName}
              className={`w-full px-4 py-2 text-xl placeholder-gray-300 border-gray-300 
                rounded cursor-pointer text-gray-600 ${
                  changeDetail && "bg-red-200 focus:bg-red-200"
                }`}
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Update your email"
              disabled
              className="w-full px-4 py-2 text-xl placeholder-gray-300 border-gray-300 
                rounded mt-6 cursor-pointer  text-gray-600"
            />
            <div className="flex justify-between whitespace-nowrap mt-5 ">
              <p>
                Do you want to change your name?{" "}
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="ml-1 text-red-600 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={handleSignOut}
                className="text-blue-600 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
