import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

type TimerProps = {
  started: boolean;
  time: string;
  callback: (time: string) => void;
};

// https://react.dev/reference/react/useRef
function Timer({ started, time, callback }: TimerProps) {
  // const [currentTime, setCurrentTime] = React.useState('00.000'); // lift this to parent component https://info340.github.io/interactive-react.html#lifting-up-state

  React.useEffect(() => {
    let timerId = null;
    let time = 0,
      startTime = 0;
    let sentinalStarted = false;

    if (started) {
      if (!sentinalStarted) {
        startTime = time = Date.now();
        sentinalStarted = true;
      }

      const tick = () => {
        time = Date.now();
        const diff: Date = new Date(time - startTime); // need whole new object?
        const isoString = diff.toISOString();
        let milli = isoString.slice(17, isoString.length - 1);
        if (diff.getMinutes() > 0) {
          milli = isoString.slice(14, isoString.length - 1);
        }
        // setCurrentTime(milli);
        callback(milli);
      };
      tick();
      timerId = setInterval(tick, 30);
    } else {
      time = 0;
      sentinalStarted = false;
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [started]);

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
