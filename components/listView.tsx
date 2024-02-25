import React from 'react';

import { Text, StyleSheet, View} from 'react-native';

type ListViewProps = {
    list: string[], 
    };

function ListView(props: ListViewProps){
  React.useEffect(() => {

  }, [props.list]);


    return (
        <View style={styles.container}>
          <Text style={styles.text}>Splits</Text>
            {props.list.map((item, index) => {
                return <Text style={styles.text}
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
    },
    text: {
      // styles for text...
      color: '#FFFFFFFF',
      fontSize: 24,
      fontWeight: '200',
    },
});

export default ListView;