import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styled, NativeWindStyleSheet, useColorScheme } from 'nativewind';
import TimerView from '../../components/timerView';

NativeWindStyleSheet.setOutput({
  // web: 'css',
  default: 'native',
});

const StyledView = styled(View);

// https://docs.pmnd.rs/zustand/guides/updating-state

export default function App() {
  console.log(`App started...`);
  return (
    <StyledView className='h-screen bg-zinc-900 antialiased'>
      <TimerView />
    </StyledView>
  );
}
