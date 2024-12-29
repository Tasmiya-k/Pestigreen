import React from 'react';
import { View, Text, Image } from 'react-native';

const Crop = ({ crop, cropname }) => {
  return (
    <View>
      <Text style={{fontSize: 10}}>{cropname}</Text>
      {crop.stages.map((stage, index) => (
        <View key={index}>
          <Text>{stage.stage_name}</Text>
          <Text>{stage.stage_description}</Text>
          <Image source={{ uri: stage.stage_image }} style={{ width: 100, height: 100 }} />
        </View>
      ))}
    </View>
  );
};

export default Crop;
