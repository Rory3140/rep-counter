import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { TitleBar } from "./src/components/TitleBar";
import { NavBar } from "./src/components/NavBar";
import { Home } from "./src/screens/Home";
import { colors } from "./src/utils/colors";
import { sizes, fontSizes } from "./src/utils/spacing";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TitleBar />
      {/* <Home />
      <NavBar /> */}
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
