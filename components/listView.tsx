import React from 'react';

import { Text, StyleSheet, View} from 'react-native';

type ListViewProps = {
    list: string[], 
    };

function ListView(props: ListViewProps){
    return (
        <View style={styles.container}>
            <ul>
            {props.list.map((item) => {
                <Text key={index}>{item}</Text>
            })}</ul>
          <Text style={styles.text}>ListView</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000F',
    },
    text: {
      // styles for text...
      color: '#FFFFFF',
      fontSize: 76,
      fontWeight: '200',
    },
});