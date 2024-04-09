import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./src/navigation/AuthStack";
import { AppStack } from "./src/navigation/AppStack";

import { colors } from "./src/utils/colors";
import { sizes, fontSizes } from "./src/utils/spacing";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer style={styles.container}>
        <AppStack />
        {/* <AuthStack /> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
