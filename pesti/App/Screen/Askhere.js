import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const AskHere = () => {
  const [image, setImage] = useState(null);
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();
  const handleChoosePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("Picker result:", pickerResult);
      if (!pickerResult.canceled) {
        setImage(pickerResult); // Update the image state with the result object
      }
    } catch (error) {
      console.error("Error choosing photo:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting query:", { query, description, image });
      const response = await fetch(
        "http://192.168.169.107:1337/userapi/savequery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            description: description,
            image: image.assets, // Assuming image is an object with a uri property
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit query");
      }

      const data = await response.json();
      console.log("Query submitted successfully:", data);
      // Handle success or show a confirmation message to the user
      navigation.navigate("Community");
    } catch (error) {
      console.error("Error submitting query:", error);
      // Handle error or show an error message to the user
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter your query/question"
        value={query}
        onChangeText={setQuery}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Description of the problem"
        value={description}
        onChangeText={setDescription}
        style={{
          height: 100,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        multiline
      />
      <Button title="Choose Image" onPress={handleChoosePhoto} />
      <Button title="Send" onPress={handleSubmit} />
    </View>
  );
};

export default AskHere;
