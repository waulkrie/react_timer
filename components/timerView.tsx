import React, { useCallback } from 'react';
import { Text, View, Button, ScrollView} from 'react-native';
import { Link } from 'expo-router';
import Timer from './timer';
import ListView from './listView';
// import { styled } from 'nativewind';

// const StyledView = styled(View);
// const StyledScrollView = styled(ScrollView);
// const StyledButton = styled(Button);

function TimerView(){
    const [isActive, setIsActive] = React.useState(false);
    const [splitList, setSplitList] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState('00.000');

    const handleUpdateTime = (time: string) => {
      setCurrentTime(time);
  }

    return (
      <View className="flex-1 justify-start stretch items-center px-4 bg-black">
      <View className="flex-row justify-center mt-8">
        <Timer started={isActive} time={currentTime} callback={handleUpdateTime} />
      </View>
      <View className="flex-row justify-center w-full mt-4">
        <Button title={isActive ? "Stop" : "Start"}
                onPress={() => {
                  setIsActive(!isActive);
                  if (!isActive) {
                    setSplitList([]); // clear splitList
                  }
                }}
        />
        <Button title="Split"
                onPress={() => {
                  const newList = [...splitList, currentTime];
                  setSplitList(newList); // append new split time to splitList
                  console.log(newList);
                }}
        />
        <Button title="Reset Splits"
                onPress={() => {
                  setSplitList([...[]]); // append new split time to splitList
                  setCurrentTime('00.000');
                  //console.log([...splitList, currentTime]);
                }}
        />
      </View>
      <ScrollView className="max-h-90 w-full mt-4">
        <ListView list={splitList}/>
      </ScrollView>
      <View className="flex-row justify-center py-7">
        <Link href="/settings" className="text-blue-500 text-lg">Settings</Link>
        <Link href="/profile" className="text-blue-500 text-lg px-7">Profile</Link>
      </View>
    </View>
      );
}

export default TimerView;

