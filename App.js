import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { TitleBar } from "./src/components/TitleBar";
import { NavBar } from "./src/components/NavBar";
import { Home } from "./src/screens/Home";
import { Log } from "./src/screens/Log";
import { Workout } from "./src/screens/Workout";
import { Routines } from "./src/screens/Routines";
import { Stats } from "./src/screens/Stats";
import { colors } from "./src/utils/colors";
import { sizes, fontSizes } from "./src/utils/spacing";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const changeScreen = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar />
      {currentScreen === "Home" && <Home />}
      {currentScreen === "Log" && <Log />}
      {currentScreen === "Workout" && <Workout />}
      {currentScreen === "Routines" && <Routines />}
      {currentScreen === "Stats" && <Stats />}
      <NavBar changeScreen={changeScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    alignItems: "center",
  },
});
