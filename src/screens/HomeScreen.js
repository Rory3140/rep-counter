import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../components/Container";
import { ScreenContainer } from "../components/ScreenContainer";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";
import { quotes } from "../utils/quotes";

export const HomeScreen = () => {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");
  const { workoutStreak, updateWorkoutStreak, userData, updateProfile } =
    useContext(AuthContext);

  useEffect(() => {
    const dayIndex = new Date().getDay();
    setQuoteOfTheDay(quotes[dayIndex]);
    const lastLogin = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    updateProfile({ lastLogin });
  }, []);

  useEffect(() => {
    if (userData) {
      updateWorkoutStreak(userData);
    }
  }, [userData]);

  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Container style={styles.workoutStreakWrapper}>
        <Text style={styles.text}>Workout Streak</Text>
        <Text style={{ fontSize: fontSizes.xxl, fontWeight: "bold" }}>
          {workoutStreak}🔥
        </Text>
      </Container>

      <Container>
        <Text style={styles.text}>Quick Workout</Text>
        <Button
          label="Start Workout"
          onPress={() => navigation.navigate("Workout")}
        />
      </Container>

      <Container style={styles.quoteOfTheDayWrapper}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text
          style={{ fontSize: fontSizes.md, textAlign: "center", paddingTop: 5 }}
        >
          {quoteOfTheDay}
        </Text>
      </Container>

      <Container style={styles.statsWrapper}>
      {/*COLE START HERE----------------------------------------------------------- */}
        <Text style={styles.text}>Stats</Text>
      </Container>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: fontSizes.lg,
    fontWeight: "bold",
  },

  workoutStreakWrapper: {
    flex: 1,
  },

  quoteOfTheDayWrapper: {
    flex: 1,
  },

  statsWrapper: {
    flex: 1,
  },
});
