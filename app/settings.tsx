import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

function Settings(){
    return (
        <StyledView>
          <StyledText>Settings</StyledText>
        </StyledView>
      );
}

export default Settings;