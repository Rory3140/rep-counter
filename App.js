import * as React from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TitleBar } from "./src/components/TitleBar";
import { Home } from "./src/screens/Home";
import { Log } from "./src/screens/Log";
import { Workout } from "./src/screens/Workout";
import { Routines } from "./src/screens/Routines";
import { Stats } from "./src/screens/Stats";

import HomeIcon from "./assets/icons/home";
import LogIcon from "./assets/icons/log";
import WorkoutIcon from "./assets/icons/dumbell";
import RoutinesIcon from "./assets/icons/repeat";
import StatsIcon from "./assets/icons/graph";

import { colors } from "./src/utils/colors";
import { sizes, fontSizes } from "./src/utils/spacing";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <HomeIcon width={50} height={50} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Log"
            component={Log}
            options={{
              tabBarIcon: ({ color }) => (
                <LogIcon width={50} height={50} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Workout"
            component={Workout}
            options={{
              tabBarIcon: ({ color }) => (
                <WorkoutIcon width={50} height={50} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Routines"
            component={Routines}
            options={{
              tabBarIcon: ({ color }) => (
                <RoutinesIcon width={50} height={50} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{
              tabBarIcon: ({ color }) => (
                <StatsIcon width={50} height={50} fill={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>

      {/* <SafeAreaView style={styles.container}>
        <TitleBar changeScreen={changeScreen} currentScreen={currentScreen} />
        {currentScreen === "Home" && <Home />}
        {currentScreen === "Log" && <Log />}
        {currentScreen === "Workout" && <Workout />}
        {currentScreen === "Routines" && <Routines />}
        {currentScreen === "Stats" && <Stats />}
        {currentScreen === "Profile" && <Profile />}
        <NavBar changeScreen={changeScreen} currentScreen={currentScreen} />
      </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
