import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";

import Home from "../../assets/icons/home";
import Log from "../../assets/icons/log";
import Workout from "../../assets/icons/dumbell";
import Routines from "../../assets/icons/repeat";
import Stats from "../../assets/icons/graph";

export const NavBar = ({ changeScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => changeScreen("Home")}>
          <Home
            width={50}
            height={50}
            fill={colors.darkGrey}
            storke={colors.darkGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeScreen("Log")}>
          <Log
            width={50}
            height={50}
            fill={colors.darkGrey}
            storke={colors.darkGrey}

          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeScreen("Workout")}>
          <Workout width={50} height={50} fill={colors.darkGrey} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeScreen("Routines")}>
          <Routines width={50} height={50} fill={colors.darkGrey} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeScreen("Stats")}>
          <Stats width={50} height={50} fill={colors.darkGrey} />
        </TouchableOpacity>
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
