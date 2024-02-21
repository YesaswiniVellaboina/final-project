import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

const ResourcesScreen = ({ navigation }) => {
  const resources = [
    {
      id: "1",
      title: "Understanding Diabetes",
      url: "https://www.diabetes.org/",
    },
    {
      id: "2",
      title: "Asthma Management Guide",
      url: "https://www.asthma.org/",
    },
    { id: "3", title: "Heart Health Tips", url: "https://www.heart.org/" },
    {
      id: "4",
      title: "Cancer Prevention Strategies",
      url: "https://www.cancer.org/",
    },
    {
      id: "5",
      title: "Mental Health Awareness",
      url: "https://www.mentalhealth.gov/",
    },
    {
      id: "6",
      title: "Arthritis Foundation",
      url: "https://www.arthritis.org/",
    },
    { id: "7", title: "Alzheimer’s Association", url: "https://www.alz.org/" },
    {
      id: "8",
      title: "Healthy Pregnancy Resources",
      url: "https://www.marchofdimes.org/",
    },
    {
      id: "9",
      title: "CDC Vaccination Information",
      url: "https://www.cdc.gov/vaccines/",
    },
    {
      id: "10",
      title: "Nutrition and Diet Tips",
      url: "https://www.eatwellguide.org/",
    },
    // Add more resources as needed
  ];

  const [selectedUrl, setSelectedUrl] = useState(null);

  const openResource = (url) => {
    setSelectedUrl(url);
  };

  const handleBackPress = () => {
    setSelectedUrl(null);
  };

  const renderResourceItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.resourceContainer}
        onPress={() => openResource(item.url)}
      >
        <Text style={styles.resourceTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderBackButton = () => (
    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
      <Ionicons name="arrow-back" size={30} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedUrl ? (
        <React.Fragment>
          {renderBackButton()}
          <WebView source={{ uri: selectedUrl }} style={styles.webView} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text style={styles.heading}>Educational Resources</Text>
          <FlatList
            data={resources}
            keyExtractor={(item) => item.id}
            renderItem={renderResourceItem}
          />
        </React.Fragment>
      )}
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resourceContainer: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "95%",
  },
  resourceTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  webView: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default ResourcesScreen;
