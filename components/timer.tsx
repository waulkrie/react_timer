import React from 'react';
import { Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';


type TimerProps = {
    started: boolean,
  };

function Timer({started}: TimerProps){
    const [currentTime, setCurrentTime] = React.useState('');

    React.useEffect(() => {
        console.log(`Timer start: ${started}`); // Check if start prop changes as expected
        let timerId = null;
        let time = 0, startTime = 0;
        let sentinalStarted = false;
    
        if (started) {
            if (!sentinalStarted) {
                startTime = time = Date.now();
                sentinalStarted = true;
            }

            const tick = () => {
                time = Date.now();
                let diff:Date = new Date(time - startTime);
                const isoString = diff.toISOString();
                let milli = isoString.slice(17, isoString.length - 1);
                if (diff.getMinutes() > 0) {
                    milli = isoString.slice(14, isoString.length - 1);
                }
                setCurrentTime(milli);
            };
            tick();
            timerId = setInterval(tick, 10);
        } else {
            time = 0;
            sentinalStarted = false;
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
