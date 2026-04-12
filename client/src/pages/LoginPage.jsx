import { Link } from "react-router-dom";

import Login from "../assets/login.jpg";
import LoginForm from "../components/auth/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div>
      <div className="flex h-175 w-full">
        <div className="w-full hidden md:inline-block">
          <img className="h-full ml-15" src={Login} alt="Login Image" />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <LoginForm />
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?
            <Link className="text-indigo-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
          <div className="w-full flex items-center justify-center mt-8 text-gray-500/80">
            <Link className="text-sm underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
