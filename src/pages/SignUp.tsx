import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OAuthBtn from "../components/OAuthBtn";
import useAuth from "../hooks/useAuth";
import KeyImage from "../assets/housekey.jpg";

export default function SignUp(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, handleChange] = useForm();
  const { isPending, signUp } = useAuth();

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { fullname, email, password } = formData;
    await signUp(email, password, fullname);
    formData.email = "";
    formData.password = "";
    formData.fullname = "";
  };

  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-semibold font-sans">
        Sign Up
      </h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img className="w-full rounded-2xl" src={KeyImage} alt="key" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-5">
            <div>
              <input
                className="w-full px-4 py-2 text-xl placeholder-gray-400 border-gray-300 rounded transition ease-in-out"
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={(e) => {
                  handleChange("fullname", e.target.value);
                }}
                placeholder="Full name"
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-2 text-xl placeholder-gray-400 border-gray-300 rounded transition ease-in-out"
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-2 text-xl placeholder-gray-400 border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange("password", e.target.value);
                }}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-[15px] top-[14px] text-xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-[15px] top-[14px] text-xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Have a account?
                <Link
                  className="text-red-600 transition duration-200 ease-in-out hover:text-red-800 ml-1"
                  to="/sign-in"
                >
                  Sign in
                </Link>
              </p>
            </div>
            {!isPending && (
              <button
                className="bg-blue-600 w-full text-white py-3 rounded transition duration-300 ease-in-out hover:bg-blue-800 font-medium uppercase shadow-md hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Sign Up
              </button>
            )}
            {isPending && (
              <button
                className="bg-blue-600 w-full text-white py-3 rounded transition duration-300 ease-in-out hover:bg-blue-800 font-medium uppercase shadow-md hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                loading...
              </button>
            )}
            <div className="flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuthBtn />
          </form>
        </div>
      </div>
    </section>
  );
}
