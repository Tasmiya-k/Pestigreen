import React from 'react';
import { View } from 'react-native';
import Crop from './Crop';

const CropScreen = ({ route, cropname }) => {
  const { cropData } = route.params;

  return (
    <View>
      <Crop crop={cropData} cropname={cropname} />
    </View>
  );
};

export default CropScreen;
