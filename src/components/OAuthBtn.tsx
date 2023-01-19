import { MouseEvent } from "react";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

export default function OAuthBtn(): JSX.Element {
  const { googleAuth } = useAuth();
  const onGoogleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await googleAuth();
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center bg-blue-600 py-3 text-white transition duration-300 ease-in-out hover:bg-blue-700 font-medium shadow-md hover:shadow-lg active:shadow-lg rounded"
    >
      <FcGoogle className="mr-3 text-2xl bg-white rounded-full" />
      <p className="uppercase">continue with google</p>
    </button>
  );
}
