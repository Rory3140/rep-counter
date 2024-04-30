import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../context/AuthContext";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

const screenWidth = Dimensions.get('window').width;

const calculateMonths = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
};

function convertDate(input) {
  const [month, day, year] = input.split('/');
  return new Date(`${year}-${month}-${day}`);
  }

const getDateRange = (timeFrame, userData) => {
  const now = new Date();
  let start, end, points;
  switch (timeFrame) {
    case 'week':
      start = new Date(now.setDate(now.getDate() - 6)); // Last 7 days including today
      end = new Date();
      points = 7; // Basic choice, last 7 days
      break;
    case 'month':
      start = new Date(now.setDate(now.getDate() - 29)); // Last 30 days including today
      end = new Date();
      points = 30; // Shows 30 points for maximum accuracy
      break;
    case 'year':
      start = new Date(now.setFullYear(now.getFullYear() - 1, now.getMonth(), now.getDate() + 1)); // Last 365 days including today
      end = new Date();
      points = 12; // Monthly data points to simplify UI
      break;
    case 'ever':
      start = new Date(Math.min(...userData.workouts.map(workout => convertDate(workout.date).getTime()))); // Gets first date in record
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
    case 'week':
    case 'month':
      newDate.setDate(newDate.getDate() + index);
      label = `${newDate.getMonth() + 1}/${newDate.getDate()}`;
      break;
    case 'year':
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
    let newSubCategories = [];
    if (selectedSubject == 'workout') {
      // Extract workout names if that's the selected subject.
      newSubCategories = [...new Set(userData.workouts.map(workout => workout.workoutName))];
    } else if (selectedSubject == 'routine') {
      // Assuming routines are structured similarly within userData
      newSubCategories = [...new Set(userData.routines.map(routine => routine.name))];
    } else if (selectedSubject == 'exercise') {
      // Extracting unique exercise names from all workouts
      newSubCategories = [...new Set(userData.workouts.flatMap(workout => workout.exercises.map(exercise => exercise.exerciseName)))];
    } else if (selectedSubject == 'general') {
      newSubCategories = [0];
        }
    setSubCategories(newSubCategories);
    // Reset the selected subcategory when the subject changes
    setSelectedSubCategory(newSubCategories.length > 0 ? newSubCategories[0] : 'none');
  }, [selectedSubject, userData]);

  useEffect(() => {
    const totalWorkouts = userData.workouts.length;
    console.log("totalWorkout size: " + totalWorkouts);
    const { start, end, points } = getDateRange(selectedTimeFrame, userData);
    console.log("start: " + start + ", end: " + end);
    console.log("points: " + points)
    const results = new Array(points).fill(0);
    //top level, grab from the userData, and get workouts
    userData.workouts.forEach(workout => {
      const workoutDate = convertDate(workout.date)
      if (workoutDate >= start && workoutDate <= end) {
        let index = getIndex(workoutDate, start, userData.workouts, selectedTimeFrame);
        //
        workout.exercises.forEach(exercise => {
          if (selectedSubCategory == 'none' || exercise.exerciseName == selectedSubCategory) {
            if (selectedMetric == 'sets') {
              results[index] += exercise.sets.length;
            } else {
              exercise.sets.forEach(set => {
                if (selectedMetric == 'reps') {
                  results[index] += parseInt(set.reps, 10);
                } else if (selectedMetric == 'weight') {
                  results[index] += parseInt(set.weight, 10);
                } else if (selectedMetric == 'time') {
                  results[index] += 1;
                }
              });
            }
          }
        });
      }
    });

    console.log("results is " + results.length);
    setData(results.map((total, idx) => ({
      x: getLabel(idx, selectedTimeFrame, start, totalWorkouts),
      y: total
    })));
    
  }, [selectedMetric, selectedTimeFrame, selectedSubCategory, userData]);

  return (
    <ScreenContainer>
      <SafeAreaView style = {{backgroundColor: colors.darkGrey}}>
        <View style={styles.chartContainer}>
          <VictoryChart width={screenWidth - 20} height={340}>
            <VictoryLine
              data={data}
              style={{ data: { stroke: colors.primary},
                      labels: { fill: colors.offWhite} }}
              interpolation="linear"
            />
            <VictoryAxis fixLabelOverlap={true} />
            <VictoryAxis dependentAxis 
            fixLabelOverlap={true} 
            tickFormat={(tick) => Number(tick).toString()}/>
          </VictoryChart>
        </View>
        <View >
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

          </Picker>
          <Picker
            selectedValue={selectedTimeFrame}
            onValueChange={(itemValue, itemIndex) => setSelectedTimeFrame(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Week" value="week" />
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
            <Picker.Item label="All Time" value="ever" />
          </Picker>
          </View>
          <View style={styles.dropdownWrapper}>
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
            onValueChange={(itemValue) => setSelectedSubCategory(itemValue)}
            style={styles.picker}
          >
            {subCategories.map((name, index) => (
              <Picker.Item key={index} label={name} value={name} />
            ))}
          </Picker>
          </View>
        </View>
      </SafeAreaView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 60,
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    borderRadius: 13,
  },
  picker: {
    height: 30,
    width: 200,
    textAlign: 'center',
    backgroundColor: colors.primary,
    color: colors.offWhite,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
