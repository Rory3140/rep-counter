import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Button } from "../components/Button";
import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const RoutinesScreen = () => {
  const navigation = useNavigation();
  return (
    <ScreenContainer isScrollable={true}>
      <Button
        label={"Create New Routine"}
        onPress={() => navigation.navigate("CreateRoutine")}
      />
      <Container style={styles.Line}></Container>
      <Button
        label={"Routine 1"}
        style={styles.routineButton}
        onPress={() => {}}
        textColor={colors.black}
        isVis={true}
        flexDirection={"row"}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Line: {
    backgroundColor: colors.offWhite,
    borderRadius: 0,
    borderTopColor: colors.darkGrey,
    borderTopWidth: 3,
    borderWidth: 0,
    width: "95%",
    padding: 0,
    margin: 0,
  },

  routineButton: {
    backgroundColor: colors.white,
    width: "95%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizes.md,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
});
