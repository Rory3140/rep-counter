import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Container } from "../components/Container";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Container style={styles.workoutStreakWrapper}>
        <Text>Workout Streak</Text>
      </Container>

      <Container style={styles.quickWorkoutWrapper}>
        <Text>Quick Workout</Text>
      </Container>

      <Container style={styles.quoteOfTheDayWrapper}>
        <Text>Quote of the Day</Text>
      </Container>

      <Container style={styles.statsWrapper}>
        <Text>Stats</Text>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  workoutStreakWrapper: {
    flex: 1,
  },

  quickWorkoutWrapper: {
    height: 100,
  },

  quoteOfTheDayWrapper: {
    height: 100,
  },

  statsWrapper: {
    flex : 1,
  },
});
