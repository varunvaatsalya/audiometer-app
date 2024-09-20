import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, Pressable, PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';
import DeviceInfo from 'react-native-device-info';

const Welcome = ({navigation}) => {
  const [logs, setLogs] = useState();
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    model: '',
    systemVersion: '',
    manufacturer: '',
    uniqueId: '',
  });
  
  useEffect(() => {
    // const requestCallLogsPermissions = async () => {
    //   if (Platform.OS === 'android') {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    //         {
    //           title: 'Call Log Permission',
    //           message: 'This app needs access to your call logs',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         fetchCallLogs();
    //       } else {
    //         console.log('Call Log permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   } else {
    //     fetchCallLogs();
    //   }
    // };
    // const getDeviceInfo = async () => {
    //   const deviceId = DeviceInfo.getDeviceId();
    //   const model = DeviceInfo.getModel();
    //   const systemVersion = DeviceInfo.getSystemVersion();
    //   const manufacturer = await DeviceInfo.getManufacturer();
    //   const uniqueId = DeviceInfo.getUniqueId();

    //   setDeviceInfo({
    //     deviceId,
    //     model,
    //     systemVersion,
    //     manufacturer,
    //     uniqueId,
    //   });
    // };

    const fetchData = async () => {
      try {
        const response = await fetch('https://varunvaatsalya.vercel.app/api/users');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const jsonResponse = await response.json();
        console.warn(jsonResponse.name); // Setting the fetched data
      } catch (err) {
        console.warn(err.message); // Handling any errors
      }
    };

    fetchData();

    // get();
    // getDeviceInfo();
    // requestCallLogsPermissions();
  }, []);

  


  // const fetchCallLogs = async () => {
  //   try {
  //     const log = await CallLogs.loadAll();
  //     setLogs(JSON.stringify(log));
  //     console.warn((log.length))
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  
  
  const Instruction = [
    '1. In order for a hearing test to provide reliable results, the testing environment must be quiet!',
    '2. Click on start button to start the test.',
    '3. If you can hear the beep sound click the audible button.',
    '4. Keep repeating the 3rd process untill the beep sound is not audible.',
    '5. If you cannot hear the beep sound click the inaudible button.',
    '6. Then click the barely audible button.',
    '7. Repeat the same process for both the ears at different frequencies.',
    '8. A result section will display when the test is completed.',
  ];
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
          <View>
            {Instruction.map((item, index) => (
              <Text
                className={`text-2xl font-semibold my-2 ${
                  index % 2 === 0 ? 'text-slate-900' : 'text-slate-800'
                }`}>
                {item}
              </Text>
            ))}
          </View>

          <Pressable
            className="w-full h-16 rounded-xl my-4 bg-orange-400 active:bg-orange-700 flex justify-center items-center"
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text className="font-semibold text-3xl">Start Test</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text>{logs}</Text>
      </View>
    </ScrollView>
  );
};

export default Welcome;
