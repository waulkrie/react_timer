import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

type TimerProps = {
  time: string;
};

// https://react.dev/reference/react/useRef
function Timer({ time }: TimerProps) {
  // const [currentTime, setCurrentTime] = React.useState('00.000'); // lift this to parent component https://info340.github.io/interactive-react.html#lifting-up-state

  React.useEffect(() => {}, [time]);

  return <Text style={styles.timer}>{time}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    // styles for timer...
    color: '#FFFFFF',
    fontSize: 76,
    fontWeight: '200',
  },
  // More styles...
});

export default Timer;
