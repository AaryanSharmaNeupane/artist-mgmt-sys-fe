import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { baseUrl } from "../api/BaseUrl";
import Cookies from "cookie-universal";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateAuth = async () => {
    const token = Cookies().get("auth");

    try {
      const response = await axios.post(`${baseUrl}auth/validate/`, {
        token: token,
      });
      if (response.data.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    validateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, validateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
