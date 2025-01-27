import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const CreateRoutineScreen = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

  const { addRoutine } = useContext(AuthContext); // Accessing addRoutine from context
  const navigation = useNavigation();

  const addExercise = () => {
    const newExercise = {
      exerciseName: "",
      sets: [],
    };
    setExercises([...exercises, newExercise]);
  };

  const createRoutine = async () => {
    const routine = {
      workoutName,
      exercises,
    };

    try {
      await addRoutine(routine); // Calling addRoutine from AuthContext
      navigation.navigate("Routines", {
        createdRoutine: routine,
      });
        } catch (error) {
      alert("Failed to create routine. Please try again.");
      console.error(error);
    }
  };

  return (
    <ScreenContainer isScrollable>
      <Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Routine Name:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setWorkoutName(text)}
            value={workoutName}
            keyboardType="default"
            returnKeyType="done"
            placeholder="Workout Name"
            maxLength={20}
          />
        </Container>
      </Container>

      {exercises.map((exercise, index) => (
        <Container key={index}>
          <Container style={styles.textbox}>
            <Text style={styles.text}>Exercise Name:</Text>
            <TextInput
              style={styles.textInput}
              value={exercise.exerciseName}
              onChangeText={(text) => {
                const updatedExercises = [...exercises];
                updatedExercises[index].exerciseName = text;
                setExercises(updatedExercises);
              }}
              keyboardType="default"
              returnKeyType="done"
              placeholder="Exercise Name"
              maxLength={20}
            />
          </Container>

          <TouchableOpacity
            onPress={() => {
              const updatedExercises = [...exercises];
              updatedExercises.splice(index, 1);
              setExercises(updatedExercises);
            }}
          >
            <Text style={styles.textButton}>Delete Exercise</Text>
          </TouchableOpacity>
        </Container>
      ))}

      <Button
        label={"Add Exercise"}
        onPress={() => {
          addExercise();
        }}
      />

      <Button
        label={"Create Routine"}
        onPress={() => {
          createRoutine();
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textbox: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
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
    width: 100,
    margin: 10,
    textAlign: "center",
  },

  textButton: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.md,
    margin: 10,
  },
});
