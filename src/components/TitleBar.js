import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

import Profile from "../../assets/icons/profile";

export const TitleBar = ({ changeScreen }) => {
  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rep-Counter</Text>
      <TouchableOpacity
        style={styles.profileIconWrapper}
        onPress={() => changeScreen("Profile")}
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
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },

  title: {
    fontFamily: "norwester",
    color: colors.black,
    fontSize: fontSizes.xxl,
  },

  profileIconWrapper: {
    position: "absolute",
    right: sizes.sm,
  },

});
