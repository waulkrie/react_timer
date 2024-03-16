import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { styled } from 'nativewind';
import * as nativewind from 'nativewind'

const StyledView = nativewind.styled(View);

// https://www.nativewind.dev/guides/custom-components
type CardProps = {
    children?: React.ReactNode,
    className?: string
    
}

export default function Card(props: CardProps){
    return (
        <StyledView className="my-3 rounded-md shadow-lg bg-zinc-800">
          {props.children}
        </StyledView>
      );
}
