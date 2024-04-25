import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

const WorkoutItem = ({ workout, deleteWorkout }) => {
  const navigation = useNavigation();

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [-15, 100],
      extrapolate: "clamp",
    });

    return (
      <RectButton
        onPress={() => {
          this.close;
          deleteWorkout(workout);
        }}
      >
        <Animated.View
          style={[
            styles.rightAction,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Text style={styles.actionText}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  return (
    <View style={styles.itemContainer}>
      <Swipeable renderRightActions={renderRightActions}>
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
      </Swipeable>
    </View>
  );
};

export const LogScreen = () => {
  const { userData, deleteWorkout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState(userData.workouts);

  useEffect(() => {
    if (userData) {
      setWorkouts(userData.workouts);
    }
  }, [userData]);

  const handleDelete = (workout) => {
    deleteWorkout(workout);
    setWorkouts(workouts.filter((item) => item !== workout));
  };

  return (
    <ScreenContainer isScrollable>
      {workouts
        .slice(0)
        .reverse()
        .map((workout, index) => {
          return (
            <Container key={index} style={{ padding: 0 }}>
              <WorkoutItem workout={workout} deleteWorkout={handleDelete} />
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

  itemContainer: {
    width: "100%",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: sizes.md,
  },

  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: sizes.md,
    height: "100%",
  },

  actionText: {
    color: "white",
    fontWeight: "600",
  },
});
