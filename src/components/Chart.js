import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const Chart = props => {
  // const [lineArray, setLineArray] = useState(new Array(5).fill(0));
  // const [lineArray2, setLineArray2] = useState(new Array(5).fill(0));
  // const [updateToggle, setUpdateToggle] = useState(false);

  // const updateData = (index, value) => {
  //   const newData = [...lineArray];
  //   newData[index] = Math.round(value);
  //   setLineArray(newData);
  //   setUpdateToggle(prev => !prev);
  // };
  // const updateData2 = (index, value) => {
  //   const newData = [...lineArray2];
  //   newData[index] = Math.round(value);
  //   setLineArray2(newData);
  //   setUpdateToggle(prev => !prev);
  // };
  const labels = ['250Hz', '500Hz', '800Hz', '1kHz', '2kHz'];

  const lineData = props.lineArray.map((value, index) => ({
    value: value,
    label: labels[index],
  }));

  const lineData2 = props.lineArray2.map((value, index) => ({
    value: value,
    label: labels[index],
  }));

  const dataSet = [
    {
      data: lineData,
      color: 'skyblue',
      dataPointsColor: 'blue',
      textColor: 'blue',
      startFillColor: 'skyblue',
    },
    {
      data: lineData2,
      color: 'orange',
      dataPointsColor: 'red',
      textColor: 'orange',
      startFillColor: 'orange',
    },
  ];
  return (
    <>
      {/* <View
        style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
        <Button
          title="Update 250Hz"
          onPress={() => updateData(0, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 500Hz"
          onPress={() => updateData(1, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 800Hz"
          onPress={() => updateData(2, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 1000Hz"
          onPress={() => updateData(3, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 2000Hz"
          onPress={() => updateData(4, Math.random() * 110 - 10)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
        <Button
          title="Update 250Hz"
          onPress={() => updateData2(0, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 500Hz"
          onPress={() => updateData2(1, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 800Hz"
          onPress={() => updateData2(2, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 1000Hz"
          onPress={() => updateData2(3, Math.random() * 110 - 10)}
        />
        <Button
          title="Update 2000Hz"
          onPress={() => updateData2(4, Math.random() * 110 - 10)}
        />
      </View> */}
      <LineChart
        key={props.updateChart}
        areaChart
        dataSet={dataSet}
        curved
        showValuesAsDataPointsText
        showVerticalLines
        spacing={80}
        initialSpacing={20}
        dataPointsHeight={6}
        animateOnDataChange={true}
        focusEnabled={true}
        isAnimated
        maxValue={100}
        scrollAnimation
        animateTogether
        noOfSections={5}
        noOfSectionsBelowXAxis={1}
        yAxisLabelSuffix=" Db"
        yAxisLabelWidth={50}
        verticalLinesColor={'gray'}
        rulesColor={'gray'}
        dataPointsWidth={6}
        startOpacity={0.8}
        endOpacity={0.3}
        adjustToWidth={true}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={15}
      />
    </>
  );
};

export default Chart;
