import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../context/AuthContext";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../utils/colors";

const screenWidth = Dimensions.get('window').width;

// Utility functions should be defined outside the component to avoid redefinitions on each render
const calculateMonths = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
};

const getDateRange = (timeFrame, totalWorkouts, userData) => {
  const now = new Date();
  let start, end, points;
  switch (timeFrame) {
    case '7 days':
      start = new Date(now.setDate(now.getDate() - 6)); // Last 7 days including today
      end = new Date();
      points = 7; // Basic choice, last 7 days
      break;
    case '30 days':
      start = new Date(now.setDate(now.getDate() - 29)); // Last 30 days including today
      end = new Date();
      points = 30; // Shows 30 points for maximum accuracy
      break;
    case '365 days':
      start = new Date(now.setFullYear(now.getFullYear() - 1, now.getMonth(), now.getDate() + 1)); // Last 365 days including today
      end = new Date();
      points = 12; // Monthly data points to simplify UI
      break;
    case 'ever':
      start = new Date(Math.min(...userData.workouts.map(workout => new Date(workout.date).getTime()))); // Gets first date in record
      end = new Date();
      points = calculateMonths(start, end);
      break;
  }
  return { start, end, points };
};

const getIndex = (date, startDate, allWorkouts, timeFrame) => {
  const oneDay = 1000 * 3600 * 24;
  let index;

  const startDay = Math.floor(startDate.getTime() / oneDay); // Start date in days
  const currentDay = Math.floor(date.getTime() / oneDay); // Current date in days
  const startMonth = startDate.getMonth() + startDate.getFullYear() * 12;
  const currentMonth = date.getMonth() + date.getFullYear() * 12;
  const totalMonths = currentMonth - startMonth;

  switch (timeFrame) {
    case 'day':
      index = currentDay - startDay;
      break;
    case 'month':
      index = currentMonth - startMonth;
      break;
    case 'year':
      index = date.getFullYear() - startDate.getFullYear();
      break;
    case 'ever':
      if (allWorkouts.length < 30) {
        index = currentDay - startDay; // Aggregate by day
      } else if (totalMonths > 16) {
        index = Math.floor((currentMonth - startMonth) / 3); // More than 16 months, aggregate by every 3 months
      } else {
        index = currentMonth - startMonth; // 30 or more workouts and 16 months or fewer, aggregate by month
      }
      break;
    default:
      index = 0;
  }

  return index;
};

const getLabel = (index, timeFrame, startDate, totalWorkouts) => {
  let label;
  const newDate = new Date(startDate);

  switch (timeFrame) {
    case '7 days':
    case '30 days':
      newDate.setDate(newDate.getDate() + index);
      label = `${newDate.getDate()}/${newDate.getMonth() + 1}`;
      break;
    case '365 days':
      newDate.setMonth(newDate.getMonth() + index);
      label = newDate.toLocaleString('default', { month: 'short' });
      break;
    case 'ever':
      if (totalWorkouts < 30) {
        newDate.setDate(newDate.getDate() + index);
        label = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
      } else if (totalWorkouts / 30 > 16) {
        const month = newDate.getMonth() + index * 3;
        newDate.setMonth(month);
        label = `Q${Math.floor(month / 3) + 1} ${newDate.getFullYear()}`;
      } else {
        newDate.setMonth(newDate.getMonth() + index);
        label = `${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
      }
      break;
    default:
      label = '';
  }

  return label;
};

export const StatsScreen = () => {
  const { userData } = useContext(AuthContext);
  const [selectedMetric, setSelectedMetric] = useState('reps');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('week');
  const [selectedSubject, setSelectedSubject] = useState('General');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('none');
  const [data, setData] = useState([]);

  useEffect(() => {
    const totalWorkouts = userData.workouts.length;
    const { start, end, points } = getDateRange(selectedTimeFrame, totalWorkouts, userData);
    const results = new Array(points).fill(0);

    userData.workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      if (workoutDate >= start && workoutDate <= end) {
        let index = getIndex(workoutDate, start, userData.workouts, selectedTimeFrame);

        // Handling 'time' as a metric for simply counting workouts
        if (selectedMetric === 'time') {
          results[index] += 1; // Each workout contributes a count of 1
        } else {
          workout.exercises.forEach(exercise => {
            if (selectedSubCategory === 'none' || exercise.name === selectedSubCategory) {
              if (selectedMetric === 'category') {
                results[index] += 1;
              } else if (selectedMetric === 'sets') {
                results[index] += exercise.sets.length;
              } else {
                exercise.sets.forEach(set => {
                  if (selectedMetric === 'reps') {
                    results[index] += parseInt(set.reps, 10);
                  } else if (selectedMetric === 'weight') {
                    results[index] += parseInt(set.weight, 10);
                  }
                });
              }
            }
          });
        }
      }
    });

    setData(results.map((total, idx) => ({
      x: getLabel(idx, selectedTimeFrame, start, totalWorkouts), // Pass totalWorkouts to getLabel
      y: total
    })));
  }, [selectedMetric, selectedTimeFrame, selectedSubCategory, selectedSubject, userData]);

  return (
    <ScreenContainer>
      <SafeAreaView>
        <View style={styles.chartContainer}>
          <VictoryChart width={screenWidth} height={320}>
            <VictoryLine
              data={data}
              style={{ data: { stroke: colors.darkGrey } }}
              interpolation="natural"
            />
            <VictoryAxis fixLabelOverlap={true} />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </View>
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={selectedMetric}
            onValueChange={(itemValue, itemIndex) => setSelectedMetric(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Repetitions" value="reps" />
            <Picker.Item label="Weight" value="weight" />
            <Picker.Item label="Sets" value="sets" />
            <Picker.Item label="Time" value="time" />
            <Picker.Item label="Category" value="category" />
          </Picker>
          <Picker
            selectedValue={selectedTimeFrame}
            onValueChange={(itemValue, itemIndex) => setSelectedTimeFrame(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Day" value="day" />
            <Picker.Item label="Week" value="week" />
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
            <Picker.Item label="All Time" value="ever" />
          </Picker>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="General" value="general" />
            <Picker.Item label="Workout" value="workout" />
            <Picker.Item label="Routine" value="routine" />
            <Picker.Item label="Exercise" value="exercise" />
          </Picker>
          <Picker
            selectedValue={selectedSubCategory}
            onValueChange={(itemValue, itemIndex) => setSelectedSubCategory(itemValue)}
            style={styles.picker}
          >
            {subCategories.map((name, index) => (
              <Picker.Item key={index} label={name} value={name} />
            ))}
          </Picker>
        </View>
      </SafeAreaView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginBottom: 20,
  },
  picker: {
    height: 30,
    width: 200,
    marginVertical: 5,
    backgroundColor: colors.primary,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
  }
});
