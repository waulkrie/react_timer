import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewBase } from 'react-native';
import { styled } from 'nativewind';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/card';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Settings() {
  const [threshold, setThreshold] = useState<number>(-1);
  const [noiseFloor, setNoiseFloor] = useState<number>(-1);

  async function init() {
    console.log('Loading initial values');
    const _threshhold = await AsyncStorage.getItem('threshold');
    const _noiseFloor = await AsyncStorage.getItem('noiseFloor');
    _threshhold ? setThreshold(parseFloat(_threshhold)) : setThreshold(0.5);
    _noiseFloor ? setNoiseFloor(parseFloat(_noiseFloor)) : setNoiseFloor(0.5);
  }

  useEffect(() => {
    init();
  }, []);

  function handleThreshChange(value: number) {
    setThreshold(value);
  }
  function handleNoiseChange(value: number) {
    setNoiseFloor(value);
  }

  async function saveState(key: string, value: number) {
    try {
      await AsyncStorage.setItem(key, value.toString());
      console.log(`Saving ${key}: ${value}`);
    } catch (e) {
      console.log(`Error saving noise floor: ${e}`);
    }
  }

  if (threshold === -1 || noiseFloor === -1) return <StyledText>Loading...</StyledText>;

  return (
    <StyledView className='flex h-screen items-center justify-start bg-zinc-900'>
      <StyledText className='text-lg text-blue-500'>Settings</StyledText>
      <Card>
        <StyledView className='flex flex-row justify-between px-1'>
          <StyledText className='text-lg text-gray-500'>Threshold</StyledText>
          <StyledText className='text-lg text-blue-600'>{threshold}</StyledText>
        </StyledView>
        <Slider
          style={{ width: 333, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={threshold} // set this to the value from AsyncStorage
          minimumTrackTintColor='#b30000'
          maximumTrackTintColor='#005ab3'
          thumbTintColor='#a3a3a3'
          onValueChange={(value) => handleThreshChange(value)}
          onSlidingComplete={() => saveState('threshold', threshold)}
        />
      </Card>
      <Card className='flex justify-center'>
        <StyledView className='flex flex-row justify-between px-1'>
          <StyledText className='text-lg text-gray-500'>Noise Floor</StyledText>
          <StyledText className='text-lg text-blue-600'>{noiseFloor}</StyledText>
        </StyledView>
        <Slider
          style={{ width: 333, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={noiseFloor} // set this to the value from AsyncStorage
          minimumTrackTintColor='#b30000'
          maximumTrackTintColor='#005ab3'
          thumbTintColor='#a3a3a3'
          onValueChange={handleNoiseChange}
          onSlidingComplete={() => saveState('noiseFloor', noiseFloor)}
        />
      </Card>
    </StyledView>
  );
}
