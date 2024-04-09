import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { TitleBar } from "../components/TitleBar";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TitleBar />
      <View style={styles.container}>
        <Text>Profile</Text>
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
