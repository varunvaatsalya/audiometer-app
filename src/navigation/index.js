import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import CallLog from '../screens/CallLogs';
import Welcome from '../screens/Welcome';
import Chart from '../components/Chart';
import AudioPlay from '../screens/AudioPlay';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:true, headerShadowVisible:true, headerShadowVisible:true, headerStyle:{backgroundColor:"rgb(100 116 152);"}}}/>
            <Stack.Screen name='CallLog' component={CallLog}/>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Chart' component={Chart}/>
            <Stack.Screen name='AudioPlay' component={AudioPlay}/>
        </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default AppNavigation