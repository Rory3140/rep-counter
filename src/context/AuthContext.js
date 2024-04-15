import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = (email, password, setPassword) => {
    setIsLoading(true);
    return axios
      .post(`https://login-yet5ypcxwq-uc.a.run.app`, { email, password })
      .then((res) => {
        const userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        const userToken = userInfo.user.uid;
        setUserToken(userToken);
        AsyncStorage.setItem("userToken", userToken);

        return getUserData(userToken);
      })
      .catch((err) => {
        setPassword("");
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signup = (
    email,
    displayName,
    password,
    setPassword,
    setConfirmPassword
  ) => {
    setIsLoading(true);
    return axios
      .post(`https://signup-yet5ypcxwq-uc.a.run.app`, {
        email,
        displayName,
        password,
      })
      .then((res) => {
        const userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        const userToken = userInfo.user.uid;
        setUserToken(userToken);
        AsyncStorage.setItem("userToken", userToken);

        return getUserData(userToken);
      })
      .catch((err) => {
        setPassword("");
        setConfirmPassword("");
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUserData = (uid) => {
    setIsLoading(true);
    return axios
      .post(`https://getuserdata-yet5ypcxwq-uc.a.run.app`, { uid })
      .then((res) => {
        setUserData(res.data);
        AsyncStorage.setItem("userData", JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateProfile = (height, weight, setHeight, setWeight) => {
    setIsLoading(true);
    return axios
      .post(`https://updateprofile-yet5ypcxwq-uc.a.run.app`, {
        uid: userToken,
        height: height,
        weight: weight,
      })
      .then((res) => {
        setUserData(res.data);
        AsyncStorage.setItem("userData", JSON.stringify(res.data));

        return getUserData(userToken);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setHeight("");
        setWeight("");
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    setUserToken(null);
    setUserData(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userData");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem("userToken");
    let userInfo = await AsyncStorage.getItem("userInfo");
    let userData = await AsyncStorage.getItem("userData");

    if (token) {
      setUserToken(token);
    }
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
    if (userData) {
      setUserData(JSON.parse(userData));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        signup,
        getUserData,
        updateProfile,
        logout,
        userToken,
        userInfo,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
