import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export const WorkoutScreen = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <ScreenContainer style={styles.infoPlace}>
      <Container style={styles.infoContainer}>
        <Container style={styles.textbox}>
          <Text style={styles.text}>workout info</Text>
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Start time</Text>
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            onChange={onChange}
          />
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>End time</Text>
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>BodyWeight</Text>
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
    height: 35,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "left",
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
