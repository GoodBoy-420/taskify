import { Link } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full flex flex-col items-center justify-center">
        <LoginForm />

        <p className="text-gray-500/90 text-sm mt-4">
          Don’t have an account?
          <Link className="text-purple-500 hover:underline ml-1" to="/signup">
            Sign up
          </Link>
        </p>

        <div className="w-full flex items-center justify-center mt-4 text-gray-500/80">
          <Link
            className="text-sm underline text-purple-500"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
