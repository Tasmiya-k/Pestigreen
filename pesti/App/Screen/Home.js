import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import veg from "./../../assets/image 4.png";
import Searchbar from "../Components/Searchbar";
import { useNavigation } from "@react-navigation/native";
import weatherIcon from "./../../assets/weather_icon.png";
import mango from "./../../assets/mango.jpeg";
import orange from "./../../assets/orange.jpeg";
import lemon from "./../../assets/lemon.jpeg";
import corn from "./../../assets/corn.jpeg";
import tomato from "./../../assets/tomato.jpeg";
import apple from "./../../assets/apple.jpeg";
import cropsData from "../Data/crops.json";

const Home = () => {
  const navigation = useNavigation();
  function Weather() {
    navigation.navigate("Weather");
  }
  function handleBananaClick() {
    // Navigate to Crop screen with banana data
    console.log("Here");
    const bananaData = cropsData.crops.find(
      (crop) => crop.cropname === "Banana"
    );
    if (bananaData) {
      navigation.navigate("CropS", {
        cropData: bananaData,
        cropname: "Banana",
      });
    } else {
      console.log("Banana data not found");
    }
  }

  function handleTomatoClick() {
    // Navigate to Crop screen with banana data
    console.log("Here");
    const bananaData = cropsData.crops.find(
      (crop) => crop.cropname === "Apple"
    );
    if (bananaData) {
      navigation.navigate("CropS", {
        cropData: bananaData,
        cropname: "Apple",
      });
    } else {
      console.log("Apple data not found");
    }
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <View style={styles.buttonContainer}>
            <Button
              title="Get Weather Forecast"
              style={styles.Button}
              className="regbutton"
              onPress={Weather}
              color="#5EBB46"
            />
            <Image source={weatherIcon} style={styles.wimage} />
          </View>
          <Searchbar />

          <View style={styles.container2}>
            <View style={styles.column}>
              <TouchableOpacity onPress={handleBananaClick}>
                <Image source={veg} style={styles.image} />
              </TouchableOpacity>
              <Image source={corn} style={styles.image} />
              <Image source={orange} style={styles.image} />
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={handleTomatoClick}>
                <Image source={apple} style={styles.image} />
              </TouchableOpacity>
              <Image source={mango} style={styles.image} />
              <Image source={lemon} style={styles.image} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 60, // Adjust based on Footer height
  },
  image: {
    marginTop: 20, // Top margin for the image
    borderRadius: 50,
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20, // Adjust as per your requirement
  },
  Button: {
    width: 80,
    height: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  wimage: {
    width: 50,
    height: 35,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default Home;
