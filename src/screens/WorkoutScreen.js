import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";
import { InputField } from "../components/InputField";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const WorkoutScreen = () => {
  const [workout, setWorkout] = useState(null);

  const [workoutName, setWorkoutName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [bodyWeight, setBodyWeight] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setStartTime(new Date().toLocaleTimeString());
  }, []);

  const addExercise = () => {
    const newExercise = {
      exerciseName: "",
      sets: [],
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (index) => {
    const newSet = {
      reps: 0,
      weight: 0,
      note: "",
    };
    const updatedExercises = [...exercises];
    updatedExercises[index].sets.push(newSet);
    setExercises(updatedExercises);
  };

  const createWorkout = () => {
    const endTime = new Date().toLocaleTimeString();
    setEndTime(endTime);

    const workout = {
      workoutName,
      startTime,
      endTime,
      exercises,
    };
    setWorkout(workout);
  };

  return (
    <ScreenContainer>
      <Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Workout Name:</Text>
          <TextInput
            style={styles.text}
            onChangeText={(text) => setWorkoutName(text)}
            value={workoutName}
            keyboardType="default"
            returnKeyType="done"
            placeholder="Workout Name"
            maxLength={20}
          />
        </Container>

        <Container style={styles.textbox}>
          <Text style={styles.text}>Start time:</Text>
          <Text style={styles.text}>{startTime}</Text>
        </Container>

        <Container style={styles.textbox}>
          <Text style={styles.text}>End time:</Text>
          <Text style={styles.text}>{endTime}</Text>
        </Container>

        {/* <Container style={styles.textbox}>
          <Text style={styles.text}>Body Weight:</Text>
          <TextInput
            style={styles.text}
            value={bodyWeight}
            onChangeText={(text) => setBodyWeight(text)}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="numbers only"
            maxLength={3}
          />
        </Container> */}
      </Container>

      {exercises.map((exercise, index) => (
        <Container key={index}>
          <Container style={styles.textbox}>
            <Text style={styles.text}>Exercise Name:</Text>
            <TextInput
              style={styles.text}
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
          {exercise.sets.map((set, setIndex) => (
            <Container key={setIndex}>
              <Container style={styles.textbox}>
                <Text style={styles.text}>Reps:</Text>
                <TextInput
                  style={styles.text}
                  value={set.reps === 0 ? "" : set.reps.toString()}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].sets[setIndex].reps = text;
                    setExercises(updatedExercises);
                  }}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  placeholder="Rep Count"
                  maxLength={3}
                />
              </Container>
              <Container style={styles.textbox}>
                <Text style={styles.text}>Weight:</Text>
                <TextInput
                  style={styles.text}
                  value={set.weight === 0 ? "" : set.weight.toString()}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].sets[setIndex].weight = text;
                    setExercises(updatedExercises);
                  }}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  placeholder="Weight in lbs"
                  maxLength={3}
                />
              </Container>
              <Container style={styles.textbox}>
                <Text style={styles.text}>Note:</Text>
                <TextInput
                  style={styles.text}
                  value={set.note}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].sets[setIndex].note = text;
                    setExercises(updatedExercises);
                  }}
                  keyboardType="default"
                  returnKeyType="done"
                  placeholder="Note"
                  maxLength={20}
                />
              </Container>
              <TouchableOpacity
                onPress={() => {
                  const updatedExercises = [...exercises];
                  updatedExercises[index].sets.splice(setIndex, 1);
                  setExercises(updatedExercises);
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    textAlign: "center",
                    fontSize: fontSizes.md,
                    margin: 10,
                  }}
                >
                  Delete Set
                </Text>
              </TouchableOpacity>
            </Container>
          ))}
          <CustomButton label={"Add Set"} onPress={() => addSet(index)} />
        </Container>
      ))}

      <CustomButton
        label={"Add Exercise"}
        onPress={() => {
          addExercise();
        }}
      ></CustomButton>

      <CustomButton
        label={"Finish Workout"}
        onPress={() => {
          createWorkout();
        }}
      ></CustomButton>
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
  },
});
