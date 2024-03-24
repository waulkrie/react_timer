import React, { useEffect } from 'react';
import { Audio } from 'expo-av';
import { View, Text, ScrollView } from 'react-native';
import { styled, NativeWindStyleSheet, useColorScheme } from 'nativewind';
import { Recording } from 'expo-av/build/Audio';
import { useStopwatch } from 'react-use-precision-timer';
import pino from 'pino';
import { TimerRenderer } from '../../components/timerRenderer';
import ListView from '../../components/listView';
import Accordion from '../../components/accordian';
import ButtonView from '../../components/buttonView';
const logger = pino();

NativeWindStyleSheet.setOutput({
  // web: 'css',
  default: 'native',
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

// https://jotai.org/docs/introduction
export default function App() {
  const [isActive, setIsActive] = React.useState(false);
  const [splitList, setSplitList] = React.useState<string[]>([]);
  const [recording, setRecording] = React.useState<Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioMetering, setAudioMetering] = React.useState<number[]>([]);
  const [meterTime, setMeterTime] = React.useState<string[]>([]);
  const stopwatch = useStopwatch(); // https://github.com/justinmahar/react-use-precision-timer

  function getCurrentTime() {
    return (stopwatch.getElapsedRunningTime() / 1000).toFixed(3);
  }

  function addSplit() {
    const time = getCurrentTime();
    logger.info('list:', splitList, 'time:', time);
    const newList = [...splitList, time];
    setSplitList(newList); // append new split time to splitList
    console.log(newList);
  }

  async function startRecording() {
    try {
      setAudioMetering([]);
      console.log('Starting recording..');

      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.LowQualityMonoAudio,
        undefined, // onRecordingStatusUpdate
        10,
      );
      setRecording(recording);

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.metering) {
          // console.log(Date.now(), ',', status.metering);
          logger.info(Date.now(), ',', status.metering);
          // if (status.metering > -50) addSplit(getCurrentTime()); // add split if metering is greater than -10

          setAudioMetering((curVal) => [...curVal, status.metering || -160]);
          setMeterTime((val) => [...val, Date.now().toString()]);
        }
      });
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri); ///TODO: USE FILESYSTEM TO DELETE THIS FILE
    if (uri) {
      // delete the file
    }
  }

  // y = mx + b
  // m = (y2 - y1) / (x2 - x1)
  // m = (lastMetering - metering) / (lastTime - currentTime)
  // this useEffect will be scheduled to run when audioMetering changes (not acutally ran)
  // therefore we should store time when the metering was taken
  useEffect(() => {
    if (audioMetering.length < 2) return;
    const lastMetering = audioMetering[audioMetering.length - 2];
    const metering = audioMetering[audioMetering.length - 1];
    const lastMeterTime = meterTime[meterTime.length - 2];
    const currentTime = meterTime[meterTime.length - 1];
    const m = (lastMetering - metering) / (parseInt(lastMeterTime) - parseInt(currentTime));
    logger.info(
      'm:',
      m,
      'lastMetering:',
      lastMetering,
      'metering:',
      metering,
      'timeDelta:',
      parseInt(lastMeterTime) - parseInt(currentTime),
    );
    // check if we are going from a high metering to a low metering - we dont want that
    // make sure metering slope is greater than 2.0
    if (lastMetering < -20 && m > 2.0) {
      logger.info('WE DID IT JINKINS!');
      addSplit(); // pass in the Date.now() in meterTime[] that was stored to addSplit
    }
  }, [audioMetering]);

  function onStartPress() {
    setIsActive(!isActive);
    if (isActive === false) {
      startRecording();
      stopwatch.start();
    } else {
      stopRecording(); ///TODO: MOVE THIS TO PROGRAMATICALLY STOP BASED ON NUMBER OF SPLITS
      console.log('stopwatch:', stopwatch.getElapsedStartedTime());
      stopwatch.stop();
      // setSplitList([]); // clear splitList
    }
  }
  function onSplitPress() {
    const newList = [...splitList, getCurrentTime()];
    setSplitList(newList); // append new split time to splitList
    console.log(newList);
  }

  function onResetPress() {
    setSplitList([...[]]);
    //console.log([...splitList, currentTime]);
  }

  return (
    <StyledView className='h-screen bg-zinc-900 antialiased'>
      <StyledView className='stretch flex-1 items-center justify-start px-4'>
        <StyledView className='mt-8 flex-row justify-center'>
          <TimerRenderer timer={stopwatch} />
        </StyledView>
        <ButtonView started={isActive} onStart={onStartPress} onSplit={onSplitPress} onReset={onResetPress} />
        {/* <Accordion sections={(Title: 'Title', content: 'hello world')} /> */}
        <StyledScrollView className='max-h-90 mt-4 w-full'>
          <ListView list={splitList} />
        </StyledScrollView>
      </StyledView>
    </StyledView>
  );
}
