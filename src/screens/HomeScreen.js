import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Container } from "../components/Container";
import { ScreenContainer } from "../components/ScreenContainer";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const HomeScreen = () => {
  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
  },
});
