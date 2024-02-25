import React, { useCallback } from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';
import Timer from './timer';
import TimerButton from './button';

function TimerView(){
    const [isActive, setIsActive] = React.useState(false);
    const [splitList, setSplitList] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState('');
    const handleUpdateTime = (time: string) => {
      setCurrentTime(time);
  }

    return (
        <View style={styles.container}>
          <Timer started={isActive}/>
          <Button 
                title={isActive ? "Stop" : "Start"}
                onPress={() => setIsActive(!isActive)}
          />
          <Button
                title="Split"
                onPress={() => {
                  console.log(splitList);
                  setSplitList(splitList.concat('splitPlaceHolder'))
                }
                callback={handleUpdateTime}
              }
          />
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
});