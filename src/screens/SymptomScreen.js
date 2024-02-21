// SymptomScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const SymptomScreen = () => {
  const [symptoms, setSymptoms] = useState([
    {
      id: "1",
      name: "Headache",
      description: "Mild headache",
      date: "2022-02-08",
    },
    {
      id: "2",
      name: "Fever",
      description: "Temperature: 100°F",
      date: "2022-02-08",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    description: "",
    date: "",
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addSymptom = () => {
    setSymptoms((prevSymptoms) => [
      ...prevSymptoms,
      { id: String(prevSymptoms.length + 1), ...newSymptom },
    ]);
    setNewSymptom({ name: "", description: "", date: "" });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Symptom Tracking</Text>
      <FlatList
        data={symptoms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.symptomItem}>
            <Text style={styles.symptomName}>{item.name}</Text>
            <Text style={styles.symptomDescription}>{item.description}</Text>
            <Text style={styles.symptomDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.buttonText}>Add Symptom</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Symptom</Text>
            <TextInput
              style={styles.input}
              placeholder="Symptom Name"
              value={newSymptom.name}
              onChangeText={(text) =>
                setNewSymptom({ ...newSymptom, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newSymptom.description}
              onChangeText={(text) =>
                setNewSymptom({ ...newSymptom, description: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newSymptom.date}
              onChangeText={(text) =>
                setNewSymptom({ ...newSymptom, date: text })
              }
            />
            <Button title="Add Symptom" onPress={addSymptom} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
  symptomItem: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  symptomName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  symptomDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  symptomDate: {
    fontSize: 14,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("screen").width - 100,
    height: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "white",
    color: "black",
  },
});

export default SymptomScreen;
