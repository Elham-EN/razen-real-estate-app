import useForm from "../hooks/useForm";

export default function Profile(): JSX.Element {
  const [formData, handleChange] = useForm();
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
              disabled
              className="w-full px-4 py-2 text-xl placeholder-gray-300 border-gray-300 rounded cursor-pointer"
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Update your email"
              disabled
              className="w-full px-4 py-2 text-xl placeholder-gray-300 border-gray-300 rounded mt-6 cursor-pointer"
            />
            <div className="flex justify-between whitespace-nowrap mt-5 ">
              <p>
                Do you want to change your name?{" "}
                <span className="ml-1 text-red-600 cursor-pointer">Edit</span>
              </p>
              <p className="text-blue-600 cursor-pointer">Sign Out</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
