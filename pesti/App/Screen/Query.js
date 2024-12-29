import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const QueryScreen = () => {
  const [queries, setQueries] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [image, setImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  };

  const handleAddQuery = () => {
    if (queryText) {
      const newQuery = { text: queryText, image: image };
      setQueries([...queries, newQuery]);
      setQueryText('');
      setImage(null);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Community Queries</Text>
      
      {/* Display existing queries */}
      <FlatList
        data={queries}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.text}</Text>
            {item.image && <Image source={item.image} style={{ width: 200, height: 200, marginTop: 10 }} />}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Input field for new query */}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter your query"
        value={queryText}
        onChangeText={(text) => setQueryText(text)}
      />

      {/* Button to choose image */}
      <Button title="Choose Image" onPress={handleChoosePhoto} />

      {/* Button to submit query */}
      <Button title="Ask a Query" onPress={handleAddQuery} />
    </View>
  );
};

export default QueryScreen;
