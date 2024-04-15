import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";
import { useState } from "react";
import { InputField } from "../components/InputField";

export const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState("");

  const handleWorkoutNameChange = (text) => {
    setWorkoutName(text);
  };

  return (
    <ScreenContainer style={styles.infoPlace}>
      <Container style={styles.infoContainer}>
        <Container style={styles.textbox}>
          <InputField
            label={"Workout Name"}
            keyboardType="default"
            value={workoutName}
            onChangeText={handleWorkoutNameChange}
            style={{ marginBottom: 0 }}
          />
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Start time:</Text>
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>End time:</Text>
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>BodyWeight:</Text>
        </Container>
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
  infoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "fit-content",
  },

  infoPlace: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  textbox: {
    display: "flex",
    flexDirection: "row",
    boarderwidth: 1,
    boarderColor: colors.black,
    width: "98%",
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "left",
    alignItems: "center",
    padding: 0,
  },

  text: {
    marginLeft: 10,
  },

  exersiceContainer: {
    height: 50,
  },
  finishWorkout: {
    height: 50,
  },
});
