import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";


import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const LogScreen = () => {
  const { userData } = useContext(AuthContext);
  const workouts = userData.workouts;

  const navigation = useNavigation();

  return (
    <ScreenContainer isScrollable>
      {workouts
        .slice(0)
        .reverse()
        .map((workout, index) => {
          return (
            <Container key={index}>
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate("DisplayWorkout", { workout: workout })
                }
              >
                <View>
                  <Text style={styles.text}>{workout.workoutName}</Text>
                  <Text style={styles.date}>{workout.date}</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={22}
                  color={colors.black}
                />
              </TouchableOpacity>
            </Container>
          );
        })}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },

  date: {
    color: colors.black,
    fontSize: fontSizes.md,
  },

  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
