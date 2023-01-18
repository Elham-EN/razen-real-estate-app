import useForm from "../hooks/useForm";
import KeyImage from "../assets/key.jpg";

export default function SignIn(): JSX.Element {
  const [formData, handleChange] = useForm();

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold font-mono">Sign In</h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img className="w-full rounded-2xl" src={KeyImage} alt="key" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className="w-full"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
