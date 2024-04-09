import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Register</Text>
      </View>
    </SafeAreaView>
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
