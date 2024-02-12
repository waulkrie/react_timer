import React from 'react';
import { Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import moment from 'moment';


type TimerProps = {
    started: boolean,
  };

function Timer({started}: TimerProps){
    const [currentTime, setCurrentTime] = React.useState('');

    React.useEffect(() => {
        console.log(`Timer start: ${started}`); // Check if start prop changes as expected
        let timerId = null;
    
        if (started) {
            const tick = () => {
                setCurrentTime(moment().format('HH:mm:ss'));
                console.log(currentTime); // See if currentTime updates
            };
            tick();
            timerId = setInterval(tick, 1000);
        }
    
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [started]);

    return <Text style={styles.timer}>{currentTime}</Text>;
};


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
