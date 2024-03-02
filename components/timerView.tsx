import React, { useCallback } from 'react';
import { Text, View, Button, ScrollView} from 'react-native';
import Timer from './timer';
import ListView from './listView';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

function TimerView(){
    const [isActive, setIsActive] = React.useState(false);
    const [splitList, setSplitList] = React.useState<string[]>([]);
    const [currentTime, setCurrentTime] = React.useState('00:00.000');

    const handleUpdateTime = (time: string) => {
      setCurrentTime(time);
  }

    return (
      <StyledView className="flex-1 justify-start items-center px-4">
      <StyledView className="flex-row justify-center mt-8">
        <Timer started={isActive} callback={handleUpdateTime} />
      </StyledView>
      <StyledView className="flex-row justify-center w-full mt-4">
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
                  //console.log([...splitList, currentTime]);
                }}
        />
      </StyledView>
      <StyledScrollView className="max-h-90 w-full mt-4">
        <ListView list={splitList}/>
      </StyledScrollView>
    </StyledView>
      );
}

export default TimerView;

