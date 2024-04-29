import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { AuthContext } from "../context/AuthContext";
import { colors } from "../utils/colors";

export const StatWidget = () => {
  const { userData } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get date 7 days ago

    // Filter workouts for the last 7 days
    const workoutsLast7Days = 
          userData.workouts.filter(
              workout => new Date(workout.date) >= sevenDaysAgo);

    const workoutCounts = Array(7).fill(0);

    workoutsLast7Days.forEach(workout => {
      const workoutDate = new Date(workout.date);
      const daysAgo = Math.abs(today.getDate() - workoutDate.getDate());
      workoutCounts[daysAgo]++;
    });

    const workoutData = workoutCounts.map((count, index) => ({ x: index + 1, y: count }));
    setData(workoutData);
  }, [userData]);

  console.log(data)
  return (
    <View style={styles.container}>
      <VictoryChart width={250} height={160} 
      padding={{top: 30, left: 90, right: 20, bottom: 25}}>
        <VictoryLine
          data={data}
          style={{ data: { stroke: colors.primary } }}
          interpolation="natural"

        />
        <VictoryAxis fixLabelOverlap={true}/>
        <VictoryAxis domainPaddingX={10} s
                    dependentAxis 
                    fixLabelOverlap={true} 
                    tickFormat={(tick) => Number(tick).toString()}/>
      </VictoryChart>
      <Text style={styles.title}>Workouts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite,
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingBottom: 18,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    colors: colors.primary

  },
});

