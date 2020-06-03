import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "./Context";
import { useContext, useEffect, useCallback } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { API } from "Utils/ApiCalls/API";
import { Dialogues } from "Utils/Dialogues";

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
        title: Dialogues.updatedYourInfoSuccessfully,
        text: Dialogues.yourInfoIsSubmitted,
      });
    Swal.fire({
      icon: "success",
      title: Dialogues.Wellcome,
      text: Dialogues.welcomeToTerme,
    });
  }
  const logout = useCallback(() => {
    setSession(null, tokenKey);
    setIsAuthenticated(false);
    Swal.fire({
      icon: "success",
      title: Dialogues.exit,
      text: Dialogues.exitedSuccessfully,
    });
  }, [setIsAuthenticated, tokenKey]);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      logout();
    } else {
      setSession(token, tokenKey);
    }
  }, [logout, tokenKey]);

  return { login, logout, isAuthenticated };
};
