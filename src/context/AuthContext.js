import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    console.log(email, password);
    setIsLoading(true);
    axios.post(`${BASE_URL}/login`, { email, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setUserToken("token");
    // AsyncStorage.setItem("userToken", "token");
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserToken(null);
      AsyncStorage.removeItem("userToken");
      setIsLoading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
