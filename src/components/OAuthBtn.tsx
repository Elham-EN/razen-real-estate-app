import { FcGoogle } from "react-icons/fc";
export default function OAuthBtn(): JSX.Element {
  return (
    <button className="flex items-center justify-center bg-red-600 py-3 text-white transition duration-300 ease-in-out hover:bg-red-700 font-medium shadow-md hover:shadow-lg active:shadow-lg rounded">
      <FcGoogle className="mr-3 text-2xl bg-white rounded-full" />
      <p className="uppercase">continue with google</p>
    </button>
  );
}