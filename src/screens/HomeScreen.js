import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import SvgComp from '../components/SvgComp';
import Chart from '../components/Chart';
import {addTrack, setUpPlayer} from '../../playBackService';
import {
  frequency250ListData,
  frequency500ListData,
  frequency800ListData,
  frequency1000ListData,
  frequency2000ListData,
} from '../audioAssetsData';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

const HomeScreen = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [lineArray, setLineArray] = useState(new Array(5).fill(0));
  const [lineArray2, setLineArray2] = useState(new Array(5).fill(0));
  const [rightEarTurn, setRightEarTurn] = useState(false);
  const [updateChart, setUpdateChart] = useState(false);

  const [freqIndex, setFreqIndex] = useState(0);
  const [decibel, setDecibel] = useState(90);

  const frequencyDataList = [
    frequency250ListData,
    frequency500ListData,
    frequency800ListData,
    frequency1000ListData,
    frequency2000ListData,
  ];
  const labels = ['250', '500', '800', '1k', '2k'];

  async function trackAdd() {
    await addTrack(frequencyDataList[freqIndex]);
    await TrackPlayer.play();
  }

  const setup = async () => {
    const isSetup = await setUpPlayer();
    if (isSetup) {
      trackAdd();
      setIsPlayerReady(isSetup);
    }
  };

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
  }, [decibel,freqIndex]);
  useEffect(() => {
    trackAdd();
  }, [freqIndex]);

  const updateLineArray = async () => {
    let newData;
    let trackobj = await TrackPlayer.getActiveTrack();
    if (rightEarTurn) newData = [...lineArray2];
    else newData = [...lineArray];
    newData[freqIndex] = Math.round(trackobj.decibel);
    if (rightEarTurn) setLineArray2(newData);
    else setLineArray(newData);
    setUpdateChart(prev => !prev);
  };

  function toggleGraph() {
    setShowGraph(!showGraph);
  }

  const skipToNext = async () => {
    if (decibel > -10 && decibel <= 90) setDecibel(decibel - 10);
    await TrackPlayer.skipToNext();
  };
  const skipToPrevious = async () => {
    if (decibel >= -10 && decibel < 90) setDecibel(decibel + 10);
    await TrackPlayer.skipToPrevious();
  };
  const togglePause = async () => {
    await TrackPlayer.pause();
  };
  const toggleBarelyAudible = async () => {
    setDecibel(90);
    if (
      (!rightEarTurn && freqIndex == 0) ||
      (rightEarTurn && freqIndex == lineArray2.length - 1)
    )
      toggleGraph();
    updateLineArray();
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    if (freqIndex == lineArray.length - 1) setRightEarTurn(!rightEarTurn);
    setFreqIndex((freqIndex + 1) % frequencyDataList.length);
  };

  // if (!isPlayerReady) {
  //   return (
  //     <SafeAreaView className="flex justify-center items-center">
  //       <ActivityIndicator size={25} />
  //       <Text>{isPlayerReady}</Text>
  //     </SafeAreaView>
  //   );
  // }
  return (
    <>
      <StatusBar backgroundColor={'rgb(100 116 152);'} />
      <View className="bg-slate-500 py-1">
        <View className="h-1/4 w-full">
          <View className="h-1/3 w-full justify-center">
            <Pressable
              onPress={togglePause}
              className={`${style.barelyAudibleBox} flex flex-row bg-orange-400`}>
              <Text className="font-bold text-4xl">
                {rightEarTurn ? 'Right' : 'Left'}
              </Text>
              <Text className="text-2xl ml-2">Ear</Text>
            </Pressable>
          </View>
          <View className="h-2/3 flex flex-row justify-center gap-3 items-start">
            <View className={`${style.audibleBtnBox} bg-orange-400`}>
              <Text className="text-xl font-medium mb-1">Decible</Text>
              <View className="flex flex-row items-end">
                <Text className="text-6xl font-bold pl-3">{decibel}</Text>
                <Text className="pb-3 text-lg">Db</Text>
              </View>
            </View>
            <View className={`${style.audibleBtnBox} bg-orange-400`}>
              <Text className="text-xl font-medium mb-2">Frequency</Text>
              <View className="flex flex-row items-end">
                <Text className="text-5xl font-bold">{labels[freqIndex]}</Text>
                <Text className="pb-2 text-lg">Hz</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="h-[45%] w-full flex justify-center items-center bg-red-4000">
          {showGraph ? (
            <Chart
              lineArray={lineArray}
              lineArray2={lineArray2}
              updateChart={updateChart}
            />
          ) : (
            <SvgComp />
          )}
        </View>
        <View className="h-[30%] w-full">
          <View className="h-2/3 flex flex-row justify-center gap-3 items-end">
            <Pressable className={style.audibleBtnBox} onPress={skipToNext}>
              <Text className={style.audible}>Audible</Text>
              <Text className={style.sign}>-</Text>
            </Pressable>
            <Pressable className={style.audibleBtnBox} onPress={skipToPrevious}>
              <Text className={style.audible}>Not Audible</Text>
              <Text className={style.sign}>+</Text>
            </Pressable>
          </View>
          <View className="h-1/3 w-full justify-end">
            <Pressable
              className={style.barelyAudibleBox}
              onPress={toggleBarelyAudible}>
              <Text className="font-semibold text-3xl">Barely Audible</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const style = {
  barelyAudibleBox:
    'h-4/5 mx-4 rounded-2xl items-center justify-center bg-slate-200 active:bg-slate-400',
  audibleBtnBox:
    'w-[43%] h-[90%] rounded-2xl bg-slate-200 items-center justify-center active:bg-slate-300',
  audible: 'text-2xl font-semibold mb-2',
  sign: 'text-5xl font-bold',
};
