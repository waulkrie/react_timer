import React from 'react';
import { Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import moment from 'moment';


type TimerProps = {
    interval: number,
  };

function Timer(){
    const [currentTime, setCurrentTime] = React.useState('');
    React.useEffect(() => {
        const tick = () => {
            setCurrentTime(moment().format('HH:mm:ss'));
        };
        tick();
        const timerId = setInterval(tick, 1000);

        return () => { clearInterval(timerId); }
    }, []);

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
