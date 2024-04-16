import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../components/Container";
import { ScreenContainer } from "../components/ScreenContainer";
import { CustomButton } from "../components/CustomButton";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Container style={styles.workoutStreakWrapper}>
        <Text style={styles.text}>Workout Streak</Text>
      </Container>

      <Container>
        <Text style={styles.text}>Quick Workout</Text>
        <CustomButton
          label="Start Workout"
          onPress={() => navigation.navigate("Workout")}
        />
      </Container>

      <Container style={styles.quoteOfTheDayWrapper}>
        <Text style={styles.text}>Quote of the Day</Text>
      </Container>

      <Container style={styles.statsWrapper}>
        <Text style={styles.text}>Stats</Text>
      </Container>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: fontSizes.lg,
  },

  workoutStreakWrapper: {
    flex: 1,
  },

  quoteOfTheDayWrapper: {
    height: 100,
  },

  statsWrapper: {
    flex: 1,
  },
});
