import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, ScrollView } from "react-native";
import Card from "../Components/Card";
import { useNavigation } from "@react-navigation/native";

const Community = () => {
  const [queries, setQueries] = useState([]);

  const navigation = useNavigation();

  // Assuming you have a function to fetch queries from your database
  const fetchQueries = async () => {
    try {
      const response = await fetch("http://192.168.169.107:1337/userapi/queries");
      if (!response.ok) {
        throw new Error("Failed to fetch queries");
      }
      const data = await response.json();
      return data.queries; // Assuming queries are returned as an array
    } catch (error) {
      console.error("Error fetching queries:", error);
      return [];
    }
  };

  function gotoAsk() {
    navigation.navigate("AskHere");
  }

  useEffect(() => {
    const loadQueries = async () => {
      const fetchedQueries = await fetchQueries();
      setQueries(fetchedQueries);
    };

    loadQueries();
  }, []);

  return (
    <View>
      <ScrollView>
      <FlatList
        data={queries}
        renderItem={({ item }) => (
          <Card
            query={item.query} // Assuming `item.query` is a string representing the query text
            description={item.description} // Assuming `item.description` is a string representing the description
            image={item.image} // Assuming `item.image` is a string representing the image URI
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Ask a query" onPress={gotoAsk} />
      </ScrollView>
    </View>
  );
};

export default Community;
