import React from 'react';

import { Text, StyleSheet, View} from 'react-native';

type ListViewProps = {
    list: string[], 
    };

function ListView(props: ListViewProps){


    return (
        <View style={styles.container}>
          <Text style={styles.text}>Splits</Text>
          <div/>
            {props.list.map((item, index) => {
                return <Text style={styles.item}
                 key={index}>{item}</Text>
            })}
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000F',
      padding: 50,
    },
    text: {
      // styles for text...
      color: '#FFFFFFFF',
      fontSize: 24,
      fontWeight: '200',
    },
    item: {
      // styles for item...
      color: '#FFFFFFFF',
      fontSize: 24,
      fontWeight: '200',
      padding: 3,
    },
});

export default ListView;