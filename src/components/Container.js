import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const Container = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "95%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizes.md,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: sizes.sm,
    marginBottom: sizes.sm,
    padding: sizes.md,
  },
});
