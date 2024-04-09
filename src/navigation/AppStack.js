import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { LogScreen } from "../screens/LogScreen";
import { WorkoutScreen } from "../screens/WorkoutScreen";
import { RoutinesScreen } from "../screens/RoutinesScreen";
import { StatsScreen } from "../screens/StatsScreen";

import HomeIcon from "../../assets/icons/home";
import LogIcon from "../../assets/icons/log";
import WorkoutIcon from "../../assets/icons/dumbell";
import RoutinesIcon from "../../assets/icons/repeat";
import StatsIcon from "../../assets/icons/graph";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon width={50} height={50} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Log"
        component={LogScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <LogIcon width={50} height={50} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <WorkoutIcon width={50} height={50} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <RoutinesIcon width={50} height={50} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <StatsIcon width={50} height={50} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
