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
      localStorage.setItem("booknest_auth", JSON.stringify(authData));

      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // if (errorMsg) {
  //   return <p className="text-sm text-gray-500/90 mt-3 my-5">{errorMsg}</p>;
  // }

  return (
    <form
      onSubmit={submitForm}
      className="md:w-96 w-80 flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
      <p className="text-sm text-gray-500/90 mt-3 my-5">
        Welcome back! Please sign in to continue
      </p>

      <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <img src={Email} alt="email" />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
          required
        />
      </div>

      <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <img src={Lock} alt="lock" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
          required
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        {loading ? "Signing In" : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
