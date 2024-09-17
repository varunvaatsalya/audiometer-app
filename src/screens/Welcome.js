import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

const Welcome = (props) => {
  return (
    <ScrollView>
      <View className="bg-slate-500">
        <Text className="text-3xl font-bold text-center my-4 text-orange-400">
          Welcome to Audiometer
        </Text>
        <Text className="text-4xl font-bold text-center my-2 text-gray-800">
          Instruction
        </Text>
        <View className="p-4 w-full text-yellow-500 border-t border-gray-900">
          <Text className='text-2xl text-slate-900 font-semibold my-2'>
            1. In order for a hearing test to provide reliable results, the
            testing environment must be quiet!
          </Text>

          <Text className='text-2xl text-slate-800 font-semibold my-2'>2. Click on start button to start the test.</Text>
          <Text className='text-2xl text-slate-900 font-semibold my-2'>3. If you can hear the beep sound click the audible button.</Text>
          <Text className='text-2xl text-slate-800 font-semibold my-2'>4. Keep repeating the 3rd process untill the beep sound is not audible.</Text>
          <Text className='text-2xl text-slate-900 font-semibold my-2'>5. If you cannot hear the beep sound click the inaudible button.</Text>
          <Text className='text-2xl text-slate-800 font-semibold my-2'>6. Then click the barely audible button.</Text>
          <Text className='text-2xl text-slate-900 font-semibold my-2'>7. Repeat the same process for both the ears at different frequencies.</Text>
          <Text className='text-2xl text-slate-800 font-semibold my-2'>8. A result section will display when the test is completed.</Text>
        <Pressable className='w-full h-16 rounded-xl my-4 bg-orange-400 active:bg-orange-700 flex justify-center items-center' onPress={()=>props.navigation.navigate("HomeScreen")}>
        <Text className='font-semibold text-3xl'>Start Test</Text>
        </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Welcome;
