import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Stats = () => {
  return (
    <View style={styles.container}>
      <Text>Stats</Text>
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
