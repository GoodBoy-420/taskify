import { useState } from "react";

import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("taskify_auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
