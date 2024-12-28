import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const GRID_SIZE = 52; // 13x4 grid for 52 weeks per year

interface WeekProps {
  isPassed: boolean;
}

const Week: React.FC<WeekProps> = ({ isPassed }) => (
  <View style={[styles.week, isPassed ? styles.passedWeek : styles.remainingWeek]} />
);

const LifeWeeksCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<string>('');
  const [targetAge, setTargetAge] = useState<string>('');
  const [weeksData, setWeeksData] = useState<{ passedWeeks: number; remainingWeeks: number } | null>(null);

  const calculateWeeks = () => {
    const current = parseInt(currentAge);
    const target = parseInt(targetAge);
    
    if (isNaN(current) || isNaN(target) || current >= target) {
      alert('Please enter valid ages. Current age should be less than target age.');
      return;
    }

    const totalWeeks = target * 52;
    const passedWeeks = current * 52;
    const remainingWeeks = totalWeeks - passedWeeks;

    setWeeksData({ passedWeeks, remainingWeeks });
  };

  const renderWeeksGrid = () => {
    if (!weeksData) return null;

    const totalWeeks = weeksData.passedWeeks + weeksData.remainingWeeks;
    const weeks = [];

    for (let i = 0; i < totalWeeks; i += GRID_SIZE) {
      const rowWeeks = [];
      for (let j = 0; j < GRID_SIZE && i + j < totalWeeks; j++) {
        rowWeeks.push(
          <Week key={i + j} isPassed={i + j < weeksData.passedWeeks} />
        );
      }
      weeks.push(
        <View key={i} style={styles.row}>
          {rowWeeks}
        </View>
      );
    }

    return <View style={styles.grid}>{weeks}</View>;
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Life Weeks Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your current age"
        value={currentAge}
        onChangeText={setCurrentAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your target age"
        value={targetAge}
        onChangeText={setTargetAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={calculateWeeks}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      {weeksData && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Weeks passed: {weeksData.passedWeeks}</Text>
          <Text style={styles.resultText}>Weeks remaining: {weeksData.remainingWeeks}</Text>
        </View>
      )}
      {renderWeeksGrid()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  results: {
    marginTop: 20,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'column',
    //width: GRID_SIZE*(100/GRID_SIZE + 2),
    alignSelf:'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  week: {
    width: 270 / GRID_SIZE,
    aspectRatio: 1,
    margin: 1,
  },
  passedWeek: {
    backgroundColor: '#007AFF',
  },
  remainingWeek: {
    backgroundColor: '#E0E0E0',
  },
});

export default LifeWeeksCalculator;