import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const OnboardingScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rep-Counter</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontFamily: "norwester",
    color: colors.black,
    fontSize: fontSizes.xxl,
  },

  button: {
    backgroundColor: colors.purple,
    padding: 20,
    width: "90%",
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
