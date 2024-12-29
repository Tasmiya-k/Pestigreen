import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import profile1 from "./../../assets/prof_2.png";
import profile2 from "./../../assets/prof_3.png";
import profile from "./../../assets/profile.png";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileSection}>
        <Image source={profile} style={styles.profileImage} />
        <Text style={styles.profileText}>Tasmiya Khan</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={profile1} style={styles.infoIcon} />
        <Text style={styles.infoText}>Grow smart together!</Text>
      </View>
      <View style={styles.profileSection}>
        <Image source={profile2} style={styles.infoIcon} />
        <Text style={styles.infoText}>Give Feedback</Text>
      </View>

      <View style={styles.bookingSection}>
        <Text style={styles.header}>Your Bookings</Text>
        {/* Example of a booking card */}
        <View style={styles.bookingCard}>
          <Text>Date Booked: January 1, 2024</Text>
          <Text>Pest Control Service: XYZ Pest Control</Text>
          <Text>Price: $50</Text>
          <Text>Feedback: Excellent service!</Text>
          {/* Add rating component here */}
        </View>
        {/* Add more booking cards as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    fontSize: 18,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  bookingSection: {
    marginTop: 20,
  },
  bookingCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Profile;
