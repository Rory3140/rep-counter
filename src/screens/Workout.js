import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Workout = () => {
  return (
    <View style={styles.container}>
      <Text>Workout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
