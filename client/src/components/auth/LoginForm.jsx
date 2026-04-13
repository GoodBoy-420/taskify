import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Email from "../../assets/email.svg";
import Lock from "../../assets/lock.svg";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formObject,
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      const { user, token } = data.data;

      const authData = {
        user,
        authToken: token.token,
        refreshToken: token.refreshToken,
      };

      setAuth(authData);
      localStorage.setItem("taskify_auth", JSON.stringify(authData));

      navigate("/tasks");
    } catch (error) {
      setErrorMsg(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="w-80 md:w-96 bg-white shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center"
    >
      <h2 className="text-3xl text-purple-600 font-semibold">Sign in</h2>

      <p className="text-sm text-gray-500/90 mt-3 mb-6 text-center">
        Welcome back! Please sign in to continue
      </p>

      {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

      {/* Email */}
      <div className="flex items-center w-full border border-purple-200 h-12 rounded-full pl-4 gap-2 focus-within:ring-2 focus-within:ring-purple-300">
        <img src={Email} alt="email" />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="bg-transparent outline-none text-sm w-full h-full"
          required
        />
      </div>

      {/* Password */}
      <div className="flex items-center mt-5 w-full border border-purple-200 h-12 rounded-full px-4 gap-2 focus-within:ring-2 focus-within:ring-purple-300">
        <img src={Lock} alt="lock" />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="bg-transparent outline-none text-sm w-full h-full"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-xs text-purple-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Button */}
      <button
        disabled={loading}
        type="submit"
        className="mt-7 w-full h-11 rounded-full text-white bg-purple-500 hover:bg-purple-600 transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
