import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

const screenWidth = Dimensions.get('window').width;

export const StatsScreen = () => {
  const [selectedYAxis, setSelectedYAxis] = useState('reps'); // Default Y-axis selection
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('week'); // Default X-axis time frame
  const [data, setData] = useState(null);

  // just some filler data for testing
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'], // This will change based on the timeframe
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50], // Tthis will be changed to use the fetch below
      },
    ],
  };
  //just holds the configuration settings for the chart, will change depending on some constraint to be decided.
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    strokeWidth: 1,
  };

  // function to fetch data from Firestore
  const fetchData = async () => {
    // Firestore fetch logic will go here
    // setData with the response received
  };

  useEffect(() => {
    fetchData();
  }, [selectedYAxis, selectedTimeFrame]);

  return (
    <ScreenContainer>
      <SafeAreaView>
          <View style={styles.lineChartStyle}>
          {/* below is the line chart being represented. will accept everything except "bezier" from somewhere else*/}
          <LineChart
            data={chartData}
            width={screenWidth}
            height={320}
            chartConfig={chartConfig}
            bezier
          /> 
          </View>
          <View style={styles.dropdownWrapper}>
          {/* below is to pick the y axis, or the object tested over time*/}
          <Picker
            selectedValue={selectedYAxis}
            onValueChange={(itemValue, itemIndex) => setSelectedYAxis(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Repetitions" value="reps" />
            <Picker.Item label="Weight" value="weight" />
            
          </Picker>

          {/* below is to pick the x axis, or the time range constraint */}
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
          </View>
      </SafeAreaView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: 200,
    marginVertical: 5,
    backgroundColor: colors.primary,
  },
  dropdownWrapper: {
    flex: .3,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  lineChartStyle: {
    flexDirection: 'column',
  }
});
