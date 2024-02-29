import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { styled, NativeWindStyleSheet } from 'nativewind';
import TimerView from '../components/timerView';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const StyledText = styled(Text);

// https://docs.pmnd.rs/zustand/guides/updating-state


export default function App() {
  console.log(`App started...`);
    return (
        <View style={styles.container}>
          <TimerView />
        </View>
      );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'stretch',
    backgroundColor: '#000F',
    paddingTop: 20,
  },
});