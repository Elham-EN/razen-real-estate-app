import { FormEvent } from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import KeyImage from "../assets/housekey2.jpg";

export default function ForgotPassword(): JSX.Element {
  const [formData, handleChange] = useForm();
  const { forgotPassword } = useAuth();

  const handleResetPasswordSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    forgotPassword(formData.email);
  };

  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-semibold font-sans">
        Forgot Password
      </h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img className="w-full rounded-2xl" src={KeyImage} alt="key" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form
            onSubmit={handleResetPasswordSubmit}
            className="flex flex-col gap-5"
          >
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

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Don't have account?
                <Link
                  className="text-red-600 transition duration-200 ease-in-out hover:text-red-800 ml-1"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 transition duration-1000 ease-in-out hover:text-blue-700"
                  to="/sign-in"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-600 w-full text-white py-3 rounded transition duration-300 ease-in-out hover:bg-blue-800 font-medium uppercase shadow-md hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              send reset email
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
