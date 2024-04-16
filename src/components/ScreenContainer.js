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
import { sizes, fontSizes } from "../utils/spacing";

export const ScreenContainer = ({ style, children }) => {
  const { isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%", backgroundColor: colors.offWhite }}>
        <View style={[styles.innerContainer, style]}>{children}</View>
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
    justifyContent: "flex-start",
  },
});
