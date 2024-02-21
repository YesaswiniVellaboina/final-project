// MedicationScreen.js
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

const MedicationScreen = () => {
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Aspirin",
      disease: "Headache",
      timing: "Morning",
      dose: "1 tablet",
    },
    {
      id: "2",
      name: "Ibuprofen",
      disease: "Fever",
      timing: "Afternoon",
      dose: "1 tablet",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    disease: "",
    timing: "",
    dose: "",
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addMedication = () => {
    setMedications((prevMedications) => [
      ...prevMedications,
      { id: String(prevMedications.length + 1), ...newMedication },
    ]);
    setNewMedication({ name: "", disease: "", timing: "", dose: "" });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Medication Reminders</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.medicationDetails}>
              <Text style={styles.boldText}>For: </Text>
              {item.disease}
            </Text>
            <Text style={styles.medicationDetails}>
              <Text style={styles.boldText}>Timing: </Text>
              {item.timing}
            </Text>
            <Text style={styles.medicationDetails}>
              <Text style={styles.boldText}>Dose: </Text>
              {item.dose}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Medication</Text>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={newMedication.name}
              onChangeText={(text) =>
                setNewMedication({ ...newMedication, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="For which disease"
              value={newMedication.disease}
              onChangeText={(text) =>
                setNewMedication({ ...newMedication, disease: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Timing"
              value={newMedication.timing}
              onChangeText={(text) =>
                setNewMedication({ ...newMedication, timing: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Dose"
              value={newMedication.dose}
              onChangeText={(text) =>
                setNewMedication({ ...newMedication, dose: text })
              }
            />
            <Button title="Add Medication" onPress={addMedication} />
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
  medicationItem: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  medicationName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
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

export default MedicationScreen;
