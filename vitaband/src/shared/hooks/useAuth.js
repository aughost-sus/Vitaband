import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LS_USER_DATA } from "../../utils/constants";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [accountType, setAccountType] = useState(1);
  const navigate = useNavigate();

  const login = useCallback((uid, token, firstname, lastname, accType, expirationDate) => {
    let TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
    const tokenExpirationDate = !!expirationDate ? expirationDate < new Date() ? TOKEN_EXPIRATION : expirationDate : TOKEN_EXPIRATION;
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      LS_USER_DATA,
      JSON.stringify({
        userId: uid,
        token,
        firstname,
        lastname,
        expiration: tokenExpirationDate.toISOString(),
        accountType: accType
      })
    );
    setUserId(uid);
    setLastname(lastname);
    setFirstname(firstname);
    setToken(token);
    setAccountType(accType);
    navigate("/");
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setFirstname(null);
    setLastname(null);
    localStorage.removeItem(LS_USER_DATA);
    navigate("/");
  }, []);

  useEffect(() => {
    console.log('>>>>>>>>>>>>>')
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
        console.log(tokenExpirationDate.getTime());
        console.log(new Date().getTime());
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
        storedData.accountType,
        new Date(storedData.expiration),
      );
    }
  }, [login]);

  return { token, login, logout, userId, lastname, firstname, accountType };
};
