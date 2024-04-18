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

export const WorkoutScreen = () => {
  const { addWorkout } = useContext(AuthContext);

  const [finishedWorkout, setFinishedWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const startTime = new Date().toLocaleTimeString();
    setStartTime(startTime);

    const date = new Date().toLocaleDateString();
    setDate(date);
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
      date,
      startTime,
      endTime,
      exercises,
    };
    addWorkout(workout);
  };

  const resetWorkout = () => {
    setFinishedWorkout(false);
    setWorkoutName("");
    setStartTime(new Date().toLocaleTimeString());
    setEndTime("");
    setExercises([]);
  };

  return (
    <ScreenContainer isScrollable>
      <Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Workout Name:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setWorkoutName(text)}
            value={workoutName}
            keyboardType="default"
            returnKeyType="done"
            placeholder="Workout Name"
            maxLength={20}
            editable={!finishedWorkout}
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

        {!finishedWorkout && (
          <TouchableOpacity onPress={resetWorkout}>
            <Text style={styles.textButton}>Restart Workout</Text>
          </TouchableOpacity>
        )}
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
              editable={!finishedWorkout}
            />
          </Container>

          {exercise.sets.map((set, setIndex) => (
            <Container key={setIndex}>
              <Container style={styles.textbox}>
                <Text style={styles.text}>Reps:</Text>
                <TextInput
                  style={styles.textInput}
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
                  editable={!finishedWorkout}
                />
              </Container>

              <Container style={styles.textbox}>
                <Text style={styles.text}>Weight:</Text>
                <TextInput
                  style={styles.textInput}
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
                  editable={!finishedWorkout}
                />
              </Container>

              <Container style={styles.textbox}>
                <Text style={styles.text}>Note:</Text>
                <TextInput
                  style={styles.textInput}
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
                  editable={!finishedWorkout}
                />
              </Container>

              {!finishedWorkout && (
                <TouchableOpacity
                  onPress={() => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].sets.splice(setIndex, 1);
                    setExercises(updatedExercises);
                  }}
                >
                  <Text style={styles.textButton}>Delete Set</Text>
                </TouchableOpacity>
              )}
            </Container>
          ))}

          {!finishedWorkout && (
            <>
              <Button label={"Add Set"} onPress={() => addSet(index)} />
              <TouchableOpacity
                onPress={() => {
                  const updatedExercises = [...exercises];
                  updatedExercises.splice(index, 1);
                  setExercises(updatedExercises);
                }}
              >
                <Text style={styles.textButton}>Delete Exercise</Text>
              </TouchableOpacity>
            </>
          )}
        </Container>
      ))}

      {!finishedWorkout ? (
        <>
          <Button
            label={"Add Exercise"}
            onPress={() => {
              addExercise();
            }}
          />

          <Button
            label={"Finish Workout"}
            onPress={() => {
              setFinishedWorkout(true);
              createWorkout();
            }}
          />
        </>
      ) : (
        <Button
          label={"Start New Workout"}
          onPress={() => {
            resetWorkout();
          }}
        />
      )}
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
