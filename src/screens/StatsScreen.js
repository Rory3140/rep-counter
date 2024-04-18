import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, SafeAreaView, StyleSheet, Text} from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../context/AuthContext";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

const screenWidth = Dimensions.get('window').width;

export const StatsScreen = () => {
  //gets the userdata for use of course, most important piece
  const { userData } = useContext(AuthContext);
  //current picker choice for the metric to determine numbers for data
  const [selectedMetric, setSelectedMetric] = useState('reps'); // Default Y-axis selection
  //allows picker choice for time frame to represent x-axis
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('week'); // Default X-axis time frame
  // allows picker choice for subject, like workout or routine
  const [selectedSubject, setSelectedSubject] = useState('General'); // Default subject setting
  //gives categories dependent on subject for the picker map function
  const [subCategories, setSubCategories] = useState([]);
  //current picker choice for data fetch for exercises
  const [selectedSubCategory, setSelectedSubCategory] = useState('none'); // Default sub category
  const [data, setData] = useState([
    { x: "2023-01-01", y: 20 },
    { x: "2023-01-02", y: 45 },
    { x: "2023-01-03", y: 28 }
  ]); // Example data

  const fetchData = async () => {
  // Get the time range and the number of data points to initialize
  const { start, end, points } = getDateRange(selectedTimeFrame);
  const results = new Array(points).fill(0);

  userData.workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    if (workoutDate >= start && workoutDate <= end) {
      let index = getIndex(workoutDate, start, selectedTimeFrame);

      if (selectedMetric === time) {

      }

      workout.exercises.forEach(exercise => {
        if (selectedMetric === 'category') {
          //START HERE********************************************************
            results[index] += 1;
        } else if (selectedMetric === 'sets') {
            results[index]+= exercise.sets.length();
          }
        else {
          exercise.sets.forEach(set => {
          if (selectedMetric === 'reps') {
            results[index] += set.reps;
          } else if (selectedMetric === 'weight') {
            results[index] += set.weight;
          } 
        });
      }
      });
    }
  });

  setData(results.map((total, idx) => ({
    x: getLabel(idx, selectedTimeFrame, start),
    y: total
  })));
};

const getDateRange = (timeFrame) => {
  const now = new Date();
  let start, end, points;
  switch (timeFrame) {
    case '7 days':
      start = new Date(now.setDate(now.getDate() - 6)); // Last 7 days including today
      end = new Date();
      points = 7; //basic choice, last 7 days
      break;
    case '30 days':
      start = new Date(now.setDate(now.getDate() - 29)); // Last 30 days including today
      end = new Date();
      points = 30; //shows 30 points for mximum accuracy
      break;
    case '365 days':
      start = new Date(now.setFullYear(now.getFullYear() - 1, now.getMonth(), now.getDate() + 1)); // Last 365 days including today
      end = new Date();
      points = 12; // Monthly data points to simplify UI
      break;
    case 'ever':
      // gives all data
      start = new Date(Math.min(...userData.Workouts.map(workout => new Date(workout.date).getTime()))); //gets first date in record
      end = new Date();
      points = calculateMonths(start, end); 
      break;
  }
  return { start, end, points };
};

const getIndex = (date, startDate, timeFrame) => {
  const diffDays = Math.floor((date - startDate) / (1000 * 3600 * 24));
  switch (timeFrame) {
    case '7 days':
    case '30 days':
      return diffDays; // Direct mapping to array index
    case '365 days':
      return date.getMonth(); // Index by month for yearly data
    case 'ever':
      return diffDays / 30; // Rough approximation to monthly data
  }
};

const getLabel = (index, timeFrame, startDate) => {
  switch (timeFrame) {
    case '7 days':
    case '30 days':
      const date = new Date(startDate.getTime());
      date.setDate(date.getDate() + index);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    case '365 days':
      const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + index);
      return `${monthDate.toLocaleString('default', { month: 'short' })}`;
    case 'ever':
      const monthEver = new Date(startDate.getFullYear(), startDate.getMonth() + index);
      return `${monthEver.toLocaleString('default', { month: 'short' })} ${monthEver.getFullYear()}`;
  }
};

const calculateMonths = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
};


  useEffect(() => {
    fetchData();
  }, [selectedMetric, selectedTimeFrame, selectedSubCategory, selectedSubject]);

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
            <VictoryAxis
              fixLabelOverlap={true}  
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </View>
        <View style={styles.dropdownWrapper}>
          {/* Pickers for above representation */}
          <Picker
            selectedValue={selectedMetric}
            onValueChange={(itemValue, itemIndex) => setSelectedMetric(itemValue)}
            style={styles.picker}
          >
            {/* allows axis of importance, or what about an exercise is being  */}
            <Picker.Item label="Repetitions" value="reps" />
            <Picker.Item label="Weight" value="weight" />
            <Picker.Item label="Sets" value="sets"/>
            <Picker.Item label="Time" value="time"/>
            <Picker.Item label="Category" value="category"/>
          </Picker>

          {/* below is to pick the x axis, or the time range constraint */}
          <Picker
            selectedValue={selectedTimeFrame}
            onValueChange={(itemValue, itemIndex) => setSelectedTimeFrame(itemValue)}
            style={styles.picker}
          >
            {/* will allow you to pick the x axis, or time constraint */}
            <Picker.Item label="Day" value="day" />
            <Picker.Item label="Week" value="week" />
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
            <Picker.Item label="All Time" value="ever" />
          </Picker>
          </View>
          <View style={styles.dropdownWrapper}> 
            {/* below is to pick the whats being fetched, or the subject being represented*/}
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            {/* will grab all of the subcategories choice(reps/weight/etc*/}
            <Picker.Item label="General" value="general" />
            {/* will allow you to choose a specific workout (push, pull, etc)*/}
            <Picker.Item label="Workout" value="workout" />
            {/* will allow you to choose by routine name */}
            <Picker.Item label="Routine" value="routine" />
            {/* will allow you to choose individual workout names, like pushup, bench*/}
            <Picker.Item label="Exercise" value="exercise" />
          </Picker>
          {/* below allows you to pcik subcategories, like push from workout, or bench press from 
          exercises, will be mapped depending on subject*/}
          <Picker
            selectedValue={selectedSubCategory}
            onValueChange={(itemValue, itemIndex) => setSelectedSubCategory(itemValue)}
            style={styles.picker}
          >
            {/* will map functions from whats been grabbed due to other pickers from userData */}
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
