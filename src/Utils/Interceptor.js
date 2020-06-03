import { useEffect } from "react";
import { useAuth } from "./Authentication/Auth";
import { API } from "./ApiCalls/API";

const Interceptor = ({ children }) => {
  const { logout } = useAuth();

  useEffect(() => {
    API.interceptors.response.use(null, (error) => {
      if (error.response.data.error === 403) {
        logout();
      }
    });
  }, [logout]);
  return children;
};

export default Interceptor;
