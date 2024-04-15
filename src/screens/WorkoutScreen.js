import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";

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

  const handleWorkoutNameChange = (text) => {
    setWorkoutName(text);
  };

  React.useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  const getTime = () => {
    setEndTime(new Date().toLocaleTimeString());
  };

  const [inputValue, setInputValue] = useState("");

  const handleChange = (text) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 3);
    setInputValue(numericValue);
  };

  return (
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
      <CustomButton
        style={styles.exersiceContainer}
        label={"Add Exersice"}
      ></CustomButton>
      <CustomButton
        style={styles.finishWorkout}
        label={"Finish Workout"}
        onPress={() => {
          getTime();
        }}
      ></CustomButton>
    </ScreenContainer>
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
    boarderColor: colors.black,
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

  exersiceContainer: {
    height: 50,
  },
  finishWorkout: {
    height: 50,
  },
});
