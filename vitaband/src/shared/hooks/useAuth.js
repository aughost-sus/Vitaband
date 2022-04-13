import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LS_USER_DATA, TOKEN_EXPIRATION } from "../../utils/constants";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const navigate = useNavigate();

  const login = useCallback((uid, token, firstname, lastname, expirationDate) => {
    const tokenExpirationDate = expirationDate || TOKEN_EXPIRATION;
    console.log(tokenExpirationDate);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      LS_USER_DATA,
      JSON.stringify({
        userId: uid,
        token,
        firstname,
        lastname,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
    setLastname(lastname);
    setFirstname(firstname);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setFirstname(null);
    setLastname(null);
    localStorage.removeItem(LS_USER_DATA);
    navigate.push("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LS_USER_DATA));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.lastname,
        storedData.firstname,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, lastname, firstname };
};
