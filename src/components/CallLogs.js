import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CallLogs from 'react-native-call-log';

const CallLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const requestCallLogsPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Call Log Permission',
              message: 'This app needs access to your call logs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            fetchCallLogs();
          } else {
            console.log('Call Log permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        fetchCallLogs();
      }
    };

    requestCallLogsPermissions();
  }, []);

  const fetchCallLogs = async () => {
    try {
      const logs = await CallLogs.loadAll();
      setLogs(logs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={logs}
          keyExtractor={item => item.timestamp.toString()}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <Text>Number: {item.phoneNumber}</Text>
              <Text>Type: {item.type}</Text>
              <Text>
                Date: {new Date(parseInt(item.timestamp)).toLocaleString()}
              </Text>
              <Text>Duration: {item.duration} seconds</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default CallLog;
