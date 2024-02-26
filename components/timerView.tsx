import React, { useCallback } from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';
import Timer from './timer';
import ListView from './listView';

function TimerView(){
    const [isActive, setIsActive] = React.useState(false);
    const [splitList, setSplitList] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState('');

    const handleUpdateTime = (time: string) => {
      setCurrentTime(time);
  }

    return (
        <View style={styles.container}>
          <Timer started={isActive}
                  callback={handleUpdateTime}
          />
          <View style={styles.buttons}>
          <Button title={isActive ? "Stop" : "Start"}
                  onPress={() => setIsActive(!isActive)}
          />
          <Button title="Split"
                  onPress={() => {
                    setSplitList([...splitList, currentTime]); // append new split time to splitList
                    console.log([...splitList, currentTime]);
                  }}
          />
          <Button title="Reset Splits"
                  onPress={() => {
                    setSplitList([...[]]); // append new split time to splitList
                    //console.log([...splitList, currentTime]);
                  }}
          />
          </View>
          <View>
            <ListView list={splitList}/>
          </View>
        </View>
      );
}

export default TimerView;

// Styles
const styles = StyleSheet.create({
    container: {
      // Convert Tailwind classes to StyleSheet
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000F',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
}); 

