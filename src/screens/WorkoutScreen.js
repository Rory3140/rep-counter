import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";

export const WorkoutScreen = () => {
  return (
    <ScreenContainer style={styles.infoPlace}>
      <Container style={styles.infoContainer}>
        <Text>workout info</Text>
      </Container>
      <CustomButton
        style={styles.exersiceContainer}
        label={"Add Exersice"}
      ></CustomButton>
      <CustomButton
        style={styles.finishWorkout}
        label={"Finish Workout"}
      ></CustomButton>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  infoContainer: {},

  infoPlace: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  exersiceContainer: {
    height: 50,
  },
  finishWorkout: {
    height: 50,
  },
});
