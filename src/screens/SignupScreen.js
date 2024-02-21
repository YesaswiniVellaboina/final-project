import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  firebaseAuth,
} from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSignup = async () => {
    try {
      // Basic validation
      if (!fullName || !email || !password) {
        Alert.alert("Validation Error", "Please fill in all required fields.");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Validation Error", "Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        Alert.alert(
          "Validation Error",
          "Password must be at least 6 characters."
        );
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then((response) => {
          handleScucces(response);
        })
        .catch((error) => {
          Alert.alert("error: " + error.code);
          console.log(error);
        });

      //   const user = userCredential.user;

      //   await user.updateProfile({
      //     displayName: fullName,
      //   });

      navigation.replace("HomeScreen");
    } catch (error) {
      console.error("Signup Error:", error.message);
      Alert.alert("Signup Error", error.message);
    }
  };

  const handleScucces = async (response) => {
    try {
      Alert.alert("Success: " + response.user.email + " has been created");
      await AsyncStorage.setItem(
        "userToken",
        JSON.stringify(response._tokenResponse.idToken),
        (err, result) => {
          console.log("I am logged In");
        }
      );
      await AsyncStorage.setItem(
        "UserData",
        JSON.stringify(response.user),
        (err, result) => {
          console.log("I am logged In");
        }
      );
      setTimeout(() => {
        navigation.replace("AppTabs");
      }, 200);
    } catch (e) {
      // saving error
    }
  };
  const handleLogin = () => {
    navigation.replace("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#ffa500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignupScreen;
