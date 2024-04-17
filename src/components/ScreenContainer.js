import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { Loading } from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const ScreenContainer = ({ isScrollable = false, style, children }) => {
  const { isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!isScrollable) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={[style, styles.innerContainer]}>{children}</View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%", backgroundColor: colors.offWhite }}
      >
        <View style={[style, styles.innerContainer]}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  innerContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
