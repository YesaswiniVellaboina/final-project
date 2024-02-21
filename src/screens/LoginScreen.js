import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword, firebaseAuth } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          navigation.replace("AppTabs");
        }
      } catch (error) {
        console.error("Authentication Check Error:", error.message);
      }
    };

    checkAuthentication();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((res) => {
          handleLogicSuccess(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error==", error);
          Alert.alert("error: " + error.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleLogicSuccess = async (response) => {
    console.log("response", response);
    try {
      await AsyncStorage.setItem("userToken", response._tokenResponse.idToken);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));
      Alert.alert("Login Successful");
      setTimeout(() => {
        setIsLoading(false);
        navigation.replace("AppTabs");
      }, 100);
    } catch (e) {}
  };

  const navigateToSignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
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
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "60%",
    paddingHorizontal: 20,
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

export default LoginScreen;
