import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserToken("token");
      AsyncStorage.setItem("userToken", "token");
      setIsLoading(false);
    }, 1000);
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
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
