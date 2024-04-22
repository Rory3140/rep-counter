import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const DisplayWorkout = ({ route }) => {
  const { workout } = route.params;

  return (
    <ScreenContainer isScrollable>
      <Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Workout Name:</Text>
          <Text style={styles.text}>{workout.workoutName}</Text>
        </Container>

        <Container style={styles.textbox}>
          <Text style={styles.text}>Start time:</Text>
          <Text style={styles.text}>{workout.startTime}</Text>
        </Container>

        <Container style={styles.textbox}>
          <Text style={styles.text}>End time:</Text>
          <Text style={styles.text}>{workout.endTime}</Text>
        </Container>
      </Container>

      {workout.exercises.map((exercise, index) => (
        <Container key={index}>
          <Container style={styles.textbox}>
            <Text style={styles.text}>Exercise Name:</Text>
            <Text style={styles.text}>{exercise.exerciseName}</Text>
          </Container>

          {exercise.sets.map((set, setIndex) => (
            <Container key={setIndex}>
              <Container style={styles.textbox}>
                <Text style={styles.text}>Reps:</Text>
                <Text style={styles.text}>{set.reps}</Text>
              </Container>

              <Container style={styles.textbox}>
                <Text style={styles.text}>Weight:</Text>
                <Text style={styles.text}>{set.weight}</Text>
              </Container>

              <Container style={styles.textbox}>
                <Text style={styles.text}>Note:</Text>
                <Text style={styles.text}>{set.note}</Text>
              </Container>
            </Container>
          ))}
        </Container>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textbox: {
    display: "flex",
    flexDirection: "row",
    boarderwidth: 1,
    width: "98%",
    height: 50,
    margin: 5,
    marginBottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },

  text: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: fontSizes.md,
  },

  textInput: {
    height: 40,
    width: 120,
    margin: 10,
    padding: 10,
  },

  textButton: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.md,
    margin: 10,
  },
});
