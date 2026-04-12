import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Email from "../../assets/email.svg";
import Lock from "../../assets/lock.svg";
import Name from "../../assets/name.svg";

const RegistrtationForm = () => {
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
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        formObject,
      );
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/signin");
    } catch (error) {
      setErrorMsg(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errorMsg && <p> {errorMsg} </p>}
      <form
        onSubmit={submitForm}
        className="md:w-96 w-80 flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome! Please sign up to continue
        </p>

        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
          <img src={Name} alt="email" />
          <input
            name="name"
            type="name"
            placeholder="Enter your name"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
          <img src={Email} alt="email" />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <img src={Lock} alt="lock" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default RegistrtationForm;
