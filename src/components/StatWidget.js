import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { AuthContext } from "../context/AuthContext";
import { colors } from "../utils/colors";
import { differenceInCalendarDays } from 'date-fns';

function convertDate(input) {
  const [month, day, year] = input.split('/');
  return new Date(`${year}-${month}-${day}`);
  }


export const StatWidget = () => {
  const { userData } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get date 7 days ago

    // Filter workouts for the last 7 days
    //the filter thing requires a return of true or false to decide if it will be included
    //similar to a "WHERE" clause in SQL
    const workoutsLast7Days = userData.workouts.filter(workout => {
      //use our convert data function to correctly represent
      const workoutDate = convertDate(workout.date);
      //compare it to whatever data was 7 days ago
      const isWithin7Days = workoutDate >= sevenDaysAgo;
      //console.log(`Checking workout date: ${workoutDate.toISOString()} (within last 7 days: ${isWithin7Days})`);
      return isWithin7Days;
  });  
    //make an array to fill for the last 7 days, make it empty
    const workoutCounts = Array(7).fill(0);

    workoutsLast7Days.forEach(workout => {
      const workoutDate = convertDate(workout.date)
      //will allow a lack of math issues when crossing over month or year boundaries
      const daysAgo = differenceInCalendarDays(today, workoutDate);
      //days ago will be used as an iterator of sorts, as we want to fill 
      //all the days preceding our current with data
      if (daysAgo >= 0 && daysAgo < 7) { 
          workoutCounts[daysAgo]++;
      }
  });
  //adding the retried data to the set for reference
    const workoutData = workoutCounts.map((count, index) => ({ x: index + 1, y: count }));
    setData(workoutData);
  }, [userData]);

  //console.log(data);
  //console.log(data.length + " is the size of the data array");
  return (
    <View style={styles.container}>
      <VictoryChart width={250} height={160} 
      padding={{top: 30, left: 90, right: 20, bottom: 25}}>
        <VictoryLine
          data={data}
          style={{ data: { stroke: colors.primary } }}
          interpolation="linear"
        />

        <VictoryAxis fixLabelOverlap={true}/>
        <VictoryAxis domainPaddingX={10} 
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
    paddingLeft: 30,
    paddingRight: 70,
    paddingBottom: 18,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    colors: colors.primary,
    justifyContent: 'center',

  },
});

