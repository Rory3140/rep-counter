import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { LogScreen } from "../screens/LogScreen";
import { StartWorkout } from "../screens/StartWorkout";
import { WorkoutScreen } from "../screens/WorkoutScreen";
import { RoutinesScreen } from "../screens/RoutinesScreen";
import { StatsScreen } from "../screens/StatsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TitleBar } from "../components/TitleBar";

import HomeIcon from "../../assets/icons/home";
import LogIcon from "../../assets/icons/log";
import WorkoutIcon from "../../assets/icons/dumbell";
import RoutinesIcon from "../../assets/icons/repeat";
import StatsIcon from "../../assets/icons/graph";

import { colors } from "../utils/colors";

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <TitleBar />,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarActiveTintColor: colors.primary,
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
        name="StartWorkout"
        component={StartWorkout}
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
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => (
            <TitleBar showBackButton={true} showProfileButton={false} />
          ),
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          header: () => <TitleBar showBackButton={true} />,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
