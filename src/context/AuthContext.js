import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password, setPassword) => {
    setIsLoading(true);
    axios
      .post(`https://login-yet5ypcxwq-uc.a.run.app`, { email, password })
      .then((res) => {
        const userInfo = res.data;
        setUserInfo(userInfo);
        const userToken = userInfo.user.uid;
        setUserToken(userToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userToken);
      })
      .catch((err) => {
        setPassword("");
        alert(err.response.data.message);
        console.log(err.response.data);
      });
    setIsLoading(false);
  };

  const signup = (
    email,
    displayName,
    password,
    setPassword,
    setConfirmPassword
  ) => {
    setIsLoading(true);
    axios
      .post(`https://signup-yet5ypcxwq-uc.a.run.app`, {
        email,
        displayName,
        password,
      })
      .then((res) => {
        const userInfo = res.data;
        setUserInfo(userInfo);
        const userToken = userInfo.user.uid;
        setUserToken(userToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userToken);
      })
      .catch((err) => {
        setPassword("");
        setConfirmPassword("");
        alert(err.response.data.message);
        console.log(err.response.data);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserInfo(null);
      setUserToken(null);
      AsyncStorage.removeItem("userInfo");
      AsyncStorage.removeItem("userToken");
      setIsLoading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem("userToken");
    let userInfo = await AsyncStorage.getItem("userInfo");

    if (token) {
      setUserToken(token);
    }
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
