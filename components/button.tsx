import React from 'react';
import { Text, StyleSheet, Button} from 'react-native';
import { styled } from 'nativewind';

type ButtonProps = {
    title: string,
    onPress: () => void,
  };

function TimerButton({ title }: ButtonProps) {
    const [isActive, setIsActive] = React.useState(false);
    

    return <Button title={title}> 
            </Button>;
}

const styles = StyleSheet.create({
    button: {
        // styles for button...
        color: '#FFFFFF',
        fontSize: 76,
        fontWeight: '200',
      },
      // More styles...
  });

export default TimerButton;
