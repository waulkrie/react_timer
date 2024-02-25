import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { styled } from 'nativewind';
import TimerView from './components/timerView';
import moment from 'moment';
import Timer from './components/timer';

const StyledSafeArea = styled(SafeAreaView);
const StyledText = styled(Text);

// https://docs.pmnd.rs/zustand/guides/updating-state


export default function App() {
  const [isActive, setIsActive] = React.useState(false);
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
    header: {
      width: '100%',
      backgroundColor: '#fff',
      // more styles...
    },
    timer: {
      // styles for timer...
      color: '#FFFFFF',
      fontSize: 76,
      fontWeight: '200',
    },
});
    
