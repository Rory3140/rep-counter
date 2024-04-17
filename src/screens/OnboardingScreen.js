import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Title } from "../components/Title";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const OnboardingScreen = ({ navigation }) => {
  const { isLoading } = React.useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });

  if (isLoading || !fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title />
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

  button: {
    backgroundColor: colors.primary,
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
