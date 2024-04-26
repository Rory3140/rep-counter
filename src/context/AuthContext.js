import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [image, setImage] = useState(null);

  const refreshUserData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      getUserData(token);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshUserData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

        getUserData(userToken);
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

        getUserData(userToken);
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
    return axios
      .post(`https://getuserdata-yet5ypcxwq-uc.a.run.app`, { uid })
      .then((res) => {
        setUserData(res.data);
        AsyncStorage.setItem("userData", JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      });
  };

  const updateProfile = (data, setHeight, setWeight) => {
    setIsLoading(true);
    const { lastLogin, photoURL, height, weight } = data;
    const updateData = {};
    if (lastLogin) {
      updateData.lastLogin = lastLogin;
    }
    if (photoURL) {
      updateData.photoURL = photoURL;
    }
    if (height) {
      updateData.height = height;
    }
    if (weight) {
      updateData.weight = weight;
    }
    return axios
      .post(`https://updateprofile-yet5ypcxwq-uc.a.run.app`, {
        uid: userToken,
        updateData,
      })
      .then((res) => {
        getUserData(userToken);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        if (setHeight && setWeight) {
          setHeight("");
          setWeight("");
        }
        setIsLoading(false);
      });
  };

  const addWorkout = (workout) => {
    setIsLoading(true);
    return axios
      .post(`https://addworkout-yet5ypcxwq-uc.a.run.app`, {
        uid: userToken,
        workout,
      })
      .then((res) => {
        let newUserData = userData;
        newUserData.workouts.push(workout);
        setUserData(newUserData);

        updateWorkoutStreak(newUserData);
        getUserData(userToken);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteWorkout = (workout) => {
    setIsLoading(true);
    return axios
      .post(`https://deleteworkout-yet5ypcxwq-uc.a.run.app`, {
        uid: userToken,
        workout,
      })
      .then((res) => {
        let newUserData = userData;
        const newWorkouts = newUserData.workouts.filter(
          (item) => item !== workout
        );
        newUserData.workouts = newWorkouts;

        setUserData(newUserData);
        updateWorkoutStreak(newUserData);
        AsyncStorage.setItem("userData", JSON.stringify(newUserData));
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function stringToDate(dateString) {
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  }

  const updateWorkoutStreak = (userDataParam) => {
    if (userDataParam.workouts.length === 0) {
      setWorkoutStreak(0);
      return;
    }
    const workouts = userDataParam.workouts;

    let lastWorkoutDate = workouts[workouts.length - 1].date;
    lastWorkoutDate = stringToDate(lastWorkoutDate);

    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    let workoutDates = workouts.map((workout) => {
      let workoutDate = workout.date;
      return stringToDate(workoutDate);
    });

    let uniqueDatesSet = new Set();
    let uniqueWorkoutDates = [];

    workoutDates.forEach((date) => {
      let timeNumber = date.getTime();

      if (!uniqueDatesSet.has(timeNumber)) {
        uniqueDatesSet.add(timeNumber);
        uniqueWorkoutDates.push(date);
      }
    });
    workoutDates = uniqueWorkoutDates;

    if (lastWorkoutDate < twoDaysAgo) {
      setWorkoutStreak(0);
    } else {
      let streak = 0;
      let workoutCounter = lastWorkoutDate;

      for (let i = workoutDates.length - 1; i >= 0; i--) {
        if (workoutDates[i].getTime() === workoutCounter.getTime()) {
          streak++;
          workoutCounter.setDate(workoutCounter.getDate() - 1);
        } else {
          break;
        }
      }
      setWorkoutStreak(streak);
    }
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
    //AsyncStorage.clear();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        signup,
        getUserData,
        updateProfile,
        addWorkout,
        deleteWorkout,
        logout,
        userToken,
        userInfo,
        userData,
        workoutStreak,
        updateWorkoutStreak,
        image,
        setImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
