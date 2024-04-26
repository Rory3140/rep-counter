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

export const WorkoutScreen = ({ route }) => {
  const { routine } = route.params || {};

  const { addWorkout } = useContext(AuthContext);

  const [finishedWorkout, setFinishedWorkout] = useState(false);
  const [startedWorkout, setStartedWorkout] = useState(false);

  const [workoutName, setWorkoutName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (routine) {
      setWorkoutName(routine.workoutName);
      setExercises(routine.exercises);
    }
  }, [routine]);

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
    const date = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    // remove empty sets
    let updatedExercises = exercises.map((exercise) => {
      const updatedSets = exercise.sets.filter(
        (set) => set.reps !== 0 || set.weight !== 0 || set.note !== ""
      );
      return { ...exercise, sets: updatedSets };
    });

    // remove empty exercises
    updatedExercises = updatedExercises.filter(
      (exercise) => exercise.exerciseName !== ""
    );

    setExercises(updatedExercises);

    // check if there is a workout name
    if (workoutName === "") {
      alert("Please enter a workout name");
      return;
    }

    // check if all exercises that have sets has a name
    const hasEmptyExerciseName = updatedExercises.some(
      (exercise) => exercise.exerciseName === ""
    );
    if (hasEmptyExerciseName) {
      alert("Please enter a name for all exercises");
      return;
    }

    // check if there are any exercises with sets
    if (updatedExercises.length === 0) {
      alert("Please enter at least one exercise with a set");
      return;
    }

    // check if all sets have reps
    const hasEmptyReps = updatedExercises.some((exercise) =>
      exercise.sets.some((set) => set.reps === 0)
    );
    if (hasEmptyReps) {
      alert("Please enter a rep count for all sets");
      return;
    }

    const workout = {
      workoutName,
      date,
      startTime,
      endTime,
      exercises: updatedExercises,
    };
    addWorkout(workout);
    setFinishedWorkout(true);
  };

  const resetWorkout = () => {
    setFinishedWorkout(false);
    setWorkoutName("");
    setStartTime(new Date().toLocaleTimeString());
    setEndTime("");
    setExercises([]);
  };

  const startWorkout = () => {
    if (workoutName === "") {
      alert("Please enter a workout name");
      return;
    }

    setStartedWorkout(true);
    setStartTime(new Date().toLocaleTimeString());
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
        {startedWorkout && (
          <>
            <Container style={styles.textbox}>
              <Text style={styles.text}>Start time:</Text>
              <Text style={styles.text}>{startTime}</Text>
            </Container>

            <Container style={styles.textbox}>
              <Text style={styles.text}>End time:</Text>
              <Text style={styles.text}>{endTime}</Text>
            </Container>
          </>
        )}
        {startedWorkout && !finishedWorkout && (
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

      {startedWorkout ? (
        !finishedWorkout ? (
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
        )
      ) : (
        <Button
          label={"Start Workout"}
          onPress={() => {
            startWorkout();
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
