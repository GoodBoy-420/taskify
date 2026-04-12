import { Link } from "react-router-dom";

import RegistrationImage from "../assets/registration.jpg";

import RegistrtationForm from "../components/auth/RegistrtationForm";
const RegistrationPage = () => {
  return (
    <div>
      <div className="flex h-175 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <RegistrtationForm />

          <p className="text-gray-500/90 text-sm mt-4">
            Already Have an account?
            <Link className="text-indigo-400 hover:underline" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full hidden md:inline-block">
          <img
            className="h-full ml-10"
            src={RegistrationImage}
            alt="Registration Image"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
