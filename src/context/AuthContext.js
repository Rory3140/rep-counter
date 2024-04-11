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
        let userInfo = res.data;
        setUserInfo(userInfo);
        let userToken = userInfo.user.uid;
        setUserToken(userToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userToken);
      })
      .catch((err) => {
        switch (err.response.data.code) {
          case "auth/internal-error":
            err.response.data.message = "Incorrect email or password";
            break;
          case "auth/invalid-email":
            err.response.data.message = "Invalid email address";
            break;
          case "auth/wrong-password":
            err.response.data.message = "Incorrect password";
            break;
          default:
            break;
        }
        setPassword("");
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
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
