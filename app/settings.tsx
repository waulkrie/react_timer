import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import { Card, CardHeader } from '../components/ui/card';
import { Button } from '~/components/ui/button';



// const StyledView = styled(View);
// const StyledText = styled(Text);
const initValue = 0.5;

export default function Settings(){
  const [threshold, setThreshold] = React.useState(0.5);
  const [noiseFloor, setNoiseFloor] = React.useState(0.5);

  // rerender on slider value change
  React.useEffect(() => {
    // console.log(`Threshold: ${threshold}`);
  }, [threshold, noiseFloor]);


  function handleThreshChange(value: number) {
    setThreshold(value);
  }
  function handleNoiseChange(value: number) {
    setNoiseFloor(value);
  }

    return (
        <View className="flex-1 justify-start items-center px-4 bg-black">
          <Text className='text-lg text-blue-500'>Settings</Text>
          <Card className='w-full max-w-sm p-6 rounded-2xl'>
            <CardHeader className='items-center'>
              <Text className='text-blue-500 text-xl font-semibold'>Threshold</Text>
              <Text className='text-blue-500 text-l font-semibold'>{threshold}</Text>
            </CardHeader>
            <Slider
              style={{width: 330, height: 40}}
              value={initValue}
              disabled={false}
              minimumValue={0}
              maximumValue={1}
              step={0.001}
              minimumTrackTintColor="#b30000"
              maximumTrackTintColor="#005ab3"
              thumbTintColor="#FFFFFF"
              onValueChange={handleThreshChange}
              // onSlidingComplete={handleThreshChange}
            />
          </Card>
          <Card className='w-full max-w-sm p-6 rounded-2xl'>
            <CardHeader className='items-center'>
              <Text className='text-blue-500 text-xl font-semibold'>Noise Floor</Text>
              <Text className='text-blue-500 text-l font-semibold'>{noiseFloor}</Text>
            </CardHeader>
            <Slider
              style={{width: 330, height: 40}}
              value={initValue}
              disabled={true}
              minimumValue={0}
              maximumValue={1}
              step={0.001}
              minimumTrackTintColor="#b30000"
              maximumTrackTintColor="#005ab3"
              thumbTintColor="#FFFFFF"
              onValueChange={handleNoiseChange}
              // onSlidingComplete={handleNoiseChange}
            />
          </Card>
          <Button variant='outline'
                  className='shadow shadow-foreground/5'
                  onPress={() => {console.log(`Open Calibrate modal...`)}}
          >
            <Text className='text-blue-500'>Calibrate</Text>
          </Button>
        </View>
      );
}
