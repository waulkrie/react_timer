import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import TimerView from './components/timerView';

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
      // Convert Tailwind classes to StyleSheet
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000F',
    },
});
    
