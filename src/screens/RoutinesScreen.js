import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import cloneDeep from "lodash.clonedeep";

import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const RoutinesScreen = ({ route }) => {
  const { createdRoutine } = route.params || {};
  const navigation = useNavigation();
  const [routines, setRoutines] = useState([]);
  const { userData, deleteRoutine } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      setRoutines(userData.routines);
    }
  }, [userData]);

  useEffect(() => {
    if (createdRoutine) {
      const routineExists = routines.some(
        (routine) => routine.workoutName === createdRoutine.workoutName
      );
      
      if (!routineExists) {
        setRoutines((prevRoutines) => [...prevRoutines, createdRoutine]);
      }
    }
  }, [createdRoutine, routines]);
  

  const handleDelete = (routine) => {
    deleteRoutine(routine);
    setRoutines(routines.filter((item) => item !== routine));
  };

  const renderRightActions = (routine, progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [-15, 100],
      extrapolate: "clamp",
    });

    return (
      <RectButton onPress={() => handleDelete(routine)}>
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
    <ScreenContainer isScrollable={true}>
      <Button
        label={"Create New Routine"}
        onPress={() => navigation.navigate("CreateRoutine")}
      />
      {routines.map((routine, index) => {
        return (
          <Swipeable
            key={index}
            renderRightActions={(progress, dragX) =>
              renderRightActions(routine, progress, dragX)
            }
          >
            <Button
              label={routine.workoutName}
              onPress={() => {
                const routineCopy = cloneDeep(routine);
                navigation.navigate("Workout", {
                  routine: routineCopy,
                });
              }}
              style={styles.routineButton}
              textColor={colors.black}
              isVis={true}
              flexDirection={"row"}
            />
          </Swipeable>
        );
      })}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({

  routineContainer: {
    width: "95%",
    marginVertical: 10,
  },

  routineButton: {
    backgroundColor: colors.white,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizes.md,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 20,
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
