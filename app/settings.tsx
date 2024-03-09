import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import Slider from '@react-native-community/slider';


const StyledView = styled(View);
const StyledText = styled(Text);

export default function Settings(){
  function handleValueChange(value: number) {
    console.log(value);
  }
    return (
        <StyledView className="flex-1 justify-start items-center px-4 bg-black">
          <StyledText className='text-lg text-blue-500'>Settings</StyledText>
          <Card>
            <StyledText className="text-lg">Volume</StyledText>
            <Slider
              style={{width: 250, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#b30000"
              maximumTrackTintColor="#005ab3"
              thumbTintColor="#FFFFFF"
              onSlidingComplete={handleValueChange}
            />
          </Card>
          <Slider
            style={{width: 250, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#b30000"
            maximumTrackTintColor="#005ab3"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={handleValueChange}
          />
        </StyledView>
      );
}
