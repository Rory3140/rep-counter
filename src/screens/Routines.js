import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Routines = () => {
  return (
    <View style={styles.container}>
      <Text>Routines</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
