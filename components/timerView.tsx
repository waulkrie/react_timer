import React, { useCallback } from 'react';
import { Text, View, Button, ScrollView} from 'react-native';
import { Link } from 'expo-router';
import Timer from './timer';
import ListView from './listView';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledButton = styled(Button);

function TimerView(){
    const [isActive, setIsActive] = React.useState(false);
    const [splitList, setSplitList] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState('00.000');

    const handleUpdateTime = (time: string) => {
      setCurrentTime(time);
  }

    return (
      <StyledView className="items-center justify-start flex-1 px-4 stretch">
      <StyledView className="flex-row justify-center mt-8">
        <Timer started={isActive} time={currentTime} callback={handleUpdateTime} />
      </StyledView>
      <StyledView className="flex-row justify-center w-full mt-4">
        <StyledButton title={isActive ? "Stop" : "Start"}
                onPress={() => {
                  setIsActive(!isActive);
                  if (!isActive) {
                    setSplitList([]); // clear splitList
                  }
                }}
        />
        <StyledButton className="bg-blue-500"
                title="Split"
                onPress={() => {
                  const newList = [...splitList, currentTime];
                  setSplitList(newList); // append new split time to splitList
                  console.log(newList);
                }}
        />
        <StyledButton title="Reset Splits"
                onPress={() => {
                  setSplitList([...[]]); // append new split time to splitList
                  setCurrentTime('00.000');
                  //console.log([...splitList, currentTime]);
                }}
        />
      </StyledView>
      <StyledScrollView className="w-full mt-4 max-h-90">
        <ListView list={splitList}/>
      </StyledScrollView>
      <StyledView className="flex-row justify-center py-7">
        <Link href="/settings" className="text-lg text-blue-500">Settings</Link>
      </StyledView>
    </StyledView>
      );
}

export default TimerView;

