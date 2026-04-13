import { Link } from "react-router-dom";

import RegistrtationForm from "../components/auth/RegistrtationForm";
const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full flex flex-col items-center justify-center">
        <RegistrtationForm />

        <p className="text-gray-500/90 text-sm mt-4">
          Already have an account?
          <Link className="text-purple-500 hover:underline ml-1" to="/">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
