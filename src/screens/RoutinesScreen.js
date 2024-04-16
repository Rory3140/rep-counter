import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
import { Container } from "../components/Container";

export const RoutinesScreen = () => {
  return (
    <ScreenContainer>
      <CustomButton label={"Create New Routine"} onPress={() => {}} />
      <Container style={styles.Line}></Container>
      <CustomButton
        label={"Routine 1(White backround)Arrow to right"}
        style={styles.routineButton}
        onPress={() => {}}
        textColor={colors.black}
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
    height: "fit-content",
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
