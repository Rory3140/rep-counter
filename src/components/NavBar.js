import React from "react";
import { StyleSheet, View } from "react-native";
import { NavIcon } from "../components/NavIcon";
import { SvgXml } from "react-native-svg";
import { icons } from "../utils/svgIcons";
import { colors } from "../utils/colors";

export const NavBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <NavIcon svg={icons.homeIcon} color={colors.darkGrey} />
        <NavIcon svg={icons.logIcon} color={colors.darkGrey} />
        <NavIcon svg={icons.dumbellIcon} color={colors.darkGrey} />
        <NavIcon svg={icons.repeatIcon} color={colors.darkGrey} />
        <NavIcon svg={icons.graphIcon} color={colors.darkGrey} />
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
    width: "95%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
