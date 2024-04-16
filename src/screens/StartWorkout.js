import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const StartWorkout = () => {
  const navigation = useNavigation();

  return (
    <ScreenContainer style={{ justifyContent: "center" }}>
      <Container>
        <CustomButton
          label="Start Workout"
          onPress={() => navigation.navigate("Workout")}
        />
      </Container>
    </ScreenContainer>
  );
};
