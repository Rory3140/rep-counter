import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { homeIcon } from "../../assets/icons/home.svg";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const NavBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <homeIcon style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },

  iconWrapper: {
    width: 60,
    height: 60,
  },

  icon: {
    width: 60,
    height: 60,
    color: colors.black,
  },
});
