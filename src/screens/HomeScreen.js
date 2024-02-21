// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const userInfo = {
    name: "John Doe",
    age: 30,
    gender: "Male",
  };

  const handleEmergencyCall = () => {
    const emergencyNumber = "123";
    Linking.openURL(`tel:${emergencyNumber}`);
  };

  const handleLogout = async () => {
    // Clear AsyncStorage data
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("AsyncStorage Clear Error:", error.message);
    }

    // Navigate to the Auth screen
    navigation.dispatch(
      CommonActions.navigate({
        name: "Auth",
        params: {
          screen: "Login",
        },
      })
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Health Dashboard</Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfo}>
          Name: {userInfo.name} | Age: {userInfo.age} | Gender:{" "}
          {userInfo.gender}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergencyCall}
      >
        <Text style={styles.buttonText}>Emergency Call</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfoContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default HomeScreen;
