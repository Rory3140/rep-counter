import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/HomeScreen";
import { LogScreen } from "../screens/LogScreen";
import { DisplayWorkout } from "../screens/DisplayWorkout";
import { StartWorkout } from "../screens/StartWorkout";
import { WorkoutScreen } from "../screens/WorkoutScreen";
import { RoutinesScreen } from "../screens/RoutinesScreen";
import { RoutinesCreation } from "../screens/RoutinesCreation";
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
const Stack = createStackNavigator();

const LogStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Log"
      screenOptions={{
        header: () => <TitleBar />,
      }}
    >
      <Stack.Screen name="Log" component={LogScreen} />
      <Stack.Screen
        name="DisplayWorkout"
        component={DisplayWorkout}
        options={{ header: () => <TitleBar showBackButton={true} /> }}
      />
    </Stack.Navigator>
  );
};

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
        name="LogStack"
        component={LogStack}
        options={{
          tabBarIcon: ({ color }) => (
            <LogIcon width={50} height={50} fill={color} />
          ),
          headerShown: false,
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
        name="RoutinesCreation"
        component={RoutinesCreation}
        options={{
          header: () => <TitleBar showBackButton={true} />,
          tabBarButton: () => null,
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
