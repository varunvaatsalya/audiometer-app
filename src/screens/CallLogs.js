import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CallLogs from 'react-native-call-log';
import { SafeAreaView } from 'react-native-safe-area-context';

const CallLog = () => {
  const [logs, setLogs] = useState([]);
  const [photos, setPhotos] = useState([]);

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

    const requestGalleryPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'This app needs access to your storage to access photos',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
          } else {
            console.log('Storage permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestCallLogsPermissions();
    requestGalleryPermissions();
  }, []);

  const fetchCallLogs = async () => {
    try {
      const logs = await CallLogs.loadAll();
      setLogs(logs);
    } catch (err) {
      console.log(err);
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0, // 0 means infinite
    };

    launchImageLibrary(options, (response) => {
      if (response.assets) {
        setPhotos(response.assets);
      }
    });
  };

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>Number: {item.phoneNumber}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Date: {new Date(parseInt(item.timestamp)).toLocaleString()}</Text>
            <Text>Duration: {item.duration} seconds</Text>
          </View>
        )}
      />
    </View>
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Gallery" onPress={openGallery} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />
        )}
        numColumns={3}
      />
    </SafeAreaView>
    </>
  );
};

export default CallLog;
