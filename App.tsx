import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import Timer from './components/timer';
import TimerButton from './components/button';
import moment from 'moment';

const StyledSafeArea = styled(SafeAreaView);
const StyledText = styled(Text);

// https://docs.pmnd.rs/zustand/guides/updating-state
const DATA = {
  timer: 1234567,
  laps: [ 12345, 23456, 34567, 98765],
}

export default function App() {
  const [isActive, setIsActive] = React.useState(false);

    return (
        <View style={styles.container}>
          <Timer />
          <TimerButton title="Start" />
        </View>
      );
};
    

// Styles
  const styles = StyleSheet.create({
    container: {
      // Convert Tailwind classes to StyleSheet
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000F',
    },
    header: {
      width: '100%',
      backgroundColor: '#fff',
      // more styles...
    },
    timer: {
      // styles for timer...
      color: '#FFFFFF',
      fontSize: 76,
      fontWeight: '200',
    },
});
    
