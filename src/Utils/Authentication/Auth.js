import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "./Context";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { API } from "Utils/ApiCalls/API";

const setSession = (token, tokenKey) => {
  if (token) {
    localStorage.setItem(tokenKey, token);
    API.defaults.headers.common[tokenKey] = token;
  } else {
    localStorage.removeItem(tokenKey);
    delete API.defaults.headers.common[tokenKey];
  }
};

export const useAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    tokenKey,
    mainPageUrl,
  } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  function login(token, stateType) {
    setSession(token, tokenKey);
    setIsAuthenticated(true);
    let { from } = location.state || { from: { pathname: mainPageUrl } };
    history.replace(from);
    if (stateType)
      return Swal.fire({
        icon: "success",
        title: " مشخصات شما به روز شد",
        text: "مشخصات جدید شما در سیستم به ثبت رسید.",
      });
    Swal.fire({
      icon: "success",
      title: "خوش آمدید",
      text: "به سیستم انتخاب واحد ترمه خوش آمدید",
    });
  }
  function logout() {
    setSession(null, tokenKey);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      logout();
    } else {
      setSession(token, tokenKey);
    }
  }, []);

  return { login, logout, isAuthenticated };
};
