import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const TitleBar = () => {
  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rep-Counter</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
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
});
