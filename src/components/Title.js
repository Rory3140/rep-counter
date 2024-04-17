import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const Title = () => {
  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <Text style={styles.title}>Rep-Counter</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "norwester",
    color: colors.black,
    fontSize: fontSizes.xxl,
  },
});
