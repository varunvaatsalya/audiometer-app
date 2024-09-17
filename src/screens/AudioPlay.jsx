import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet, Pressable, Image} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import {addTrack, setUpPlayer} from '../../playBackService';
import {
  frequency250ListData,
  frequency500ListData,
  frequency800ListData,
  frequency1000ListData,
  frequency2000ListData,
} from '../audioAssetsData';

const AudioPlay = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playBackState = usePlaybackState();
  const [freqIndex, setFreqIndex] = useState(0);
  
  const frequencyDataList = [
    frequency250ListData,
    frequency500ListData,
    frequency800ListData,
    frequency1000ListData,
    frequency2000ListData,
  ];
  useEffect(() => {
  const setup = async () => {
    const isSetup = await setUpPlayer();
    if (isSetup) {
      await addTrack(frequencyDataList[freqIndex]);
      setIsPlayerReady(isSetup);
      console.warn(isSetup);
    }
  };

  
    setup();
  }, [freqIndex]);

  const handleAudible = async () => {
    await TrackPlayer.skipToNext();
  };

  const handleNotAudible = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const handleStop = async () => {
    await TrackPlayer.pause();
  };

  async function handleBarelyAudible(){
    console.warn(State.Ready,1);
    await TrackPlayer.play();
    console.warn(State.play,2);
  };

  return (
    <View style={styles.container}>
      <Text>{isPlayerReady}</Text>
      <Pressable
        className="h-12 w-20 bg-red-400 rounded-lg"
        onPress={handleStop}>
        <Text>stop</Text>
      </Pressable>
      <Pressable
        className="h-12 w-20 bg-red-400 rounded-lg"
        onPress={handleAudible}>
        <Text>Audible</Text>
      </Pressable>
      <Pressable
        className="h-12 w-20 bg-red-400 rounded-lg"
        onPress={handleNotAudible}>
        <Text>NotAudible</Text>
      </Pressable>
      <Pressable
        className="h-12 w-20 bg-red-400 rounded-lg"
        onPress={handleBarelyAudible}>
        <Text>BarelyAudible</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AudioPlay;
