import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

import Profile from "../../assets/icons/profile";
import { Title } from "./Title";

export const TitleBar = () => {
  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title />
      <TouchableOpacity
        style={styles.profileIconWrapper}
        onPress={() => navigation.navigate("Profile")}
      >
        <Profile width={50} height={50} fill={colors.darkGrey} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    height: Platform.OS === "ios" ? 120 : 80,
  },

  profileIconWrapper: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 60 : 20,
  },
});
