import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";
import { useState } from "react";
import { InputField } from "../components/InputField";
import { useEffect } from "react";

export const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [startTime, setTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [inputValue, setInputValue] = useState("");
  const [exerciseCount, setExerciseCount] = useState(0);
  const [exercise, setExercise] = useState("");

  const handleWorkoutNameChange = (text) => {
    setWorkoutName(text);
  };

  React.useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  const getTime = () => {
    setEndTime(new Date().toLocaleTimeString());
  };

  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 3);
    setInputValue(numericValue);
  };

  const addExercise = () => {
    setExerciseCount(exerciseCount + 1);
  };

  const handletext = (text) => {
    setExercise(text);
  };

  return (
    <ScrollView>
      <ScreenContainer style={styles.infoPlace}>
        <Container style={styles.infoContainer}>
          <Container style={[styles.nameBox]}>
            <InputField
              label={"Workout Name"}
              keyboardType="default"
              value={workoutName}
              onChangeText={handleWorkoutNameChange}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                borderBottomWidth: 0,
              }}
            />
          </Container>
          <Container
            style={[styles.textbox, { justifyContent: "space-between" }]}
          >
            <Text style={styles.text}>Start time:</Text>
            <Text style={styles.text}>{startTime}</Text>
          </Container>
          <Container
            style={[styles.textbox, { justifyContent: "space-between" }]}
          >
            <Text style={styles.text}>End time:</Text>
            <Text style={styles.text}>{endTime}</Text>
          </Container>
          <Container
            style={[styles.textbox, { justifyContent: "space-between" }]}
          >
            <Text style={styles.text}>BodyWeight:</Text>
            <TextInput
              style={styles.text}
              onChangeText={handleChange}
              value={inputValue}
              keyboardType="number-pad"
              returnKeyType={"done"}
              placeholder="numbers only"
              placeholderTextColor="#999"
            />
          </Container>
        </Container>

        {[...Array(exerciseCount)].map((_, index) => (
          <Container
            key={index}
            style={{
              padding: 0,
            }}
          >
            <Container style={styles.exerciseNameContainer}>
              <TextInput
                style={styles.text}
                onChangeText={handletext}
                value={inputValue}
                keyboardType="default"
                placeholder="Exercise Name"
                placeholderTextColor="#999"
              />
            </Container>
            <Text>Exercise {index + 1}</Text>
          </Container>
        ))}

        <CustomButton
          style={styles.exersiceButtonContainer}
          label={"Add Exersice"}
          onPress={() => {
            addExercise();
          }}
        ></CustomButton>
        <CustomButton
          style={styles.finishWorkout}
          label={"Finish Workout"}
          onPress={() => {
            getTime();
          }}
        ></CustomButton>
      </ScreenContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "fit-content",
    marginBottom: 20,
  },

  infoPlace: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  nameBox: {
    width: "98%",
    height: "fit-content",
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  textbox: {
    display: "flex",
    flexDirection: "row",
    boarderwidth: 1,
    width: "98%",
    height: 50,
    marginTop: 4,
    marginBottom: 0,
    justifyContent: "left",
    alignItems: "center",
    padding: 0,
  },

  text: {
    marginLeft: 10,
    marginRight: 10,
  },

  exerciseNameContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 0,
    borderBottomColor: "#ccc",
    borderColor: "white",
    width: "100%",
    height: 50,
    justifyContent: "left",
    alignItems: "center",
    padding: 0,
    marginBottom: 0,
  },

  exersiceButtonContainer: {
    height: 50,
  },
  finishWorkout: {
    height: 50,
  },
});
