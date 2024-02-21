import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MedicationScreen from "../screens/MedicationScreen";
import SymptomScreen from "../screens/SymptomScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Medication") {
          iconName = focused ? "medkit" : "medkit-outline";
        } else if (route.name === "Symptom") {
          iconName = focused ? "pulse" : "pulse-outline";
        } else if (route.name === "Resources") {
          iconName = focused ? "book" : "book-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#3498db",
      inactiveTintColor: "gray",
      tabBarStyle: {
        display: "flex",
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Medication"
      component={MedicationScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Symptom"
      component={SymptomScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Resources"
      component={ResourcesScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
