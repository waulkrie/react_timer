import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Pressable);

type ButtonProps = {
  started: boolean;
  onStart: () => void;
  onSplit: () => void;
  onReset: () => void;
};

export default function ButtonView(props: ButtonProps) {
  return (
    <StyledView className='mt-4 flex-row justify-center'>
      <StyledButton
        className='rounded-md bg-blue-500 px-2'
        onPress={() => {
          props.onStart();
        }}
      >
        <StyledText className='text-lg text-white'>{props.started ? 'Stop' : 'Start'}</StyledText>
      </StyledButton>
      <StyledButton
        className='rounded-md bg-blue-500 px-2'
        onPress={() => {
          props.onSplit();
        }}
      >
        <StyledText className='text-lg text-white'>{'Split'}</StyledText>
      </StyledButton>
      <StyledButton
        className='rounded-md bg-blue-500 px-2'
        onPress={() => {
          props.onReset();
        }}
      >
        <StyledText className='text-lg text-white'>{'Reset Splits'}</StyledText>
      </StyledButton>
    </StyledView>
  );
}
