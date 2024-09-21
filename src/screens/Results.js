import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Results = ({navigation}) => {
  const route = useRoute();
    const {lineArray, lineArray2} = route.params;
  const [resultArr, setResultArr] = useState([
    ['-', '-'],
    ['-', '-'],
  ]);
//   const [lineArray, setLineArray] = useState([23, 25, 48, 43, 15]);
//   const [lineArray2, setLineArray2] = useState([25, 85, 42, 65, 25]);
  function condition(leftAvg) {
    if (leftAvg <= 25) return 'Normal';
    else if (leftAvg > 25 && leftAvg <= 40) return 'Mild';
    else if (leftAvg > 40 && leftAvg <= 55) return 'Moderate';
    else if (leftAvg > 55 && leftAvg <= 70) return 'Moderately Severe';
    else if (leftAvg > 70 && leftAvg <= 90) return 'Severe';
    else return 'Profound';
  }

  function result() {
    let leftsum = 0;
    let rightsum = 0;
    for (let i = 0; i < 5; i++) {
      leftsum += lineArray[i];
      rightsum += lineArray2[i];
    }

    setResultArr([
      [leftsum / 5, condition(leftsum / 5)],
      [rightsum / 5, condition(rightsum / 5)],
    ]);
  }

  useEffect(() => {
    result();
  }, []);
  const data = [
    {id: 1, name: 'Normal', email: '-10 to 25'},
    {id: 2, name: 'Mild', email: '26-40'},
    {id: 3, name: 'Moderate', email: '41-55'},
    {id: 4, name: 'Moderately Severe', email: '56-70'},
    {id: 5, name: 'Severe', email: '71-90'},
    {id: 6, name: 'Profound', email: '91+'},
  ];

  return (
    <>
      <StatusBar backgroundColor={'rgb(100 116 152);'} />
      <View className="bg-slate-500 py-1 h-full w-full">
        <View className="h-1/2 w-full">
          <Text className="text-center text-4xl font-bold m-6">Results</Text>
          <View className="flex flex-col justify-center items-center">
            <View className="flex flex-row h-10 items-center mx-auto">
              <View className="h-full w-8 bg-yellow-400 border-y justify-center">
                <Text className="text-lg font-bold text-center">Sr No.</Text>
              </View>
              <View className="h-full w-3/5 bg-pink-400  border-y justify-center">
                <Text className="text-lg font-bold text-center">
                  Hearing Range
                </Text>
              </View>
              <View className="h-full w-1/4 bg-blue-400  border-y justify-center">
                <Text className="text-lg font-bold text-center">dB HL</Text>
              </View>
            </View>
            {data.map(item => (
              <View className="flex flex-row h-10 items-center mx-auto">
                <View className="h-full w-8 bg-yellow-400 border-y justify-center">
                  <Text className="text-lg font-semibold text-center">
                    {item.id}
                  </Text>
                </View>
                <View className="h-full w-3/5 bg-pink-400  border-y justify-center">
                  <Text className="text-lg font-semibold text-center">
                    {item.name}
                  </Text>
                </View>
                <View className="h-full w-1/4 bg-blue-400  border-y justify-center">
                  <Text className="text-lg font-semibold text-center">
                    {item.email}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View className="h-1/2 w-full flex justify-center items-center">
          <View className="flex flex-row h-16 items-center justify-center mx-auto">
            <View className="h-full w-2/5 bg-pink-400  border-y justify-center">
              <Text className="text-lg font-bold text-center">
                Hearing Range
              </Text>
            </View>
            <View className="h-full w-2/5 bg-blue-400  border-y justify-center">
              <Text className="text-lg font-bold text-center">dB HL</Text>
            </View>
          </View>
          {resultArr.map(item => (
            <View className="flex flex-row h-16 items-center mx-auto">
              <View className="h-full w-2/5 bg-pink-400  border-y justify-center">
                <Text className="text-lg font-semibold text-center">
                  {item[0]}
                </Text>
              </View>
              <View className="h-full w-2/5 bg-blue-400  border-y justify-center">
                <Text className="text-lg font-semibold text-center">
                  {item[1]}
                </Text>
              </View>
            </View>
          ))}
          <Pressable
            className="w-4/5 h-16 rounded-xl my-5 mx-auto bg-orange-400 active:bg-orange-700 flex justify-center items-center"
            onPress={() => navigation.navigate('Welcome')}>
            <Text className="font-semibold text-3xl">Test Again!</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Results;
